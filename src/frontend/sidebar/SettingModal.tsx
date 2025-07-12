"use client";

import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react' 
import { CldUploadButton } from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { Modal } from '@/frontend/constant/Modal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { User } from '@/generated/prisma';

interface SettingModalProps {
  isOpen: boolean
  onClose: ()=> void
  curUser : User
}


export const SettingModal = ({isOpen, onClose, curUser}: SettingModalProps) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  const {register, handleSubmit, setValue, watch, formState:{errors}} = useForm<FieldValues>({
    defaultValues:{
        name: curUser?.name ,
        image: curUser?.image
    }
  })
  const image = watch("image");

  const handleUpload = (result: any) =>{
    setValue("image", result?.info?.secure_url, {
        shouldValidate: true
    })
  }

  const onSubmit: SubmitHandler<FieldValues> = (data)=>{
    setLoading(true);

    axios.post('/api/settings', data)
    .then(()=>{
        router.refresh()
        onClose()
    })
    .catch(()=>{
        console.error("can't set it up")
    })
  }
  return(
    <Modal isOpen={isOpen} onClose={onClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="leading-7 font-semibold text-gray-900/75">
                        Profile
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Edit your public information</p>
                    <div className="mt-10 flex flex-col gap-y-8">
                        <Input  required  id="name" name="name" disabled={loading}/>
                        <div>
                            <label htmlFor="" className='block text-sm font-medium leading-6 text-gray-900/75'>Photo</label>
                            <div>
                                <Image width="48" height="48" className='rounded-full' alt="avatar"
                                    src={image || curUser?.image || "/images/profile.png"}
                                />
                                <CldUploadButton
                                    options={{maxFiles: 1}} onSuccess={handleUpload} uploadPreset='fnhetpjm'
                                >
                                    <Button disabled={loading} variant="secondary" type="button">Change</Button>
                                </CldUploadButton>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-6 flex items-center justify-end gap-x-6'>
                    <Button disabled={loading} variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button disabled={loading} type="submit">Save</Button>
                </div>
            </div>
        </form>
    </Modal>
  )
}

