"use client"

import axios from 'axios'
import React, { useState } from 'react' 
import {  useForm } from 'react-hook-form'
import { HiPaperAirplane } from 'react-icons/hi'
import { HiPhoto } from 'react-icons/hi2'
import {CldUploadButton} from "next-cloudinary"

import useConversations from '@/backend/hook/useConversations'
import { Input } from '@/components/ui/input'
import {Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import Loader from '@/frontend/constant/Loader'
import { useRouter } from 'next/navigation'


export const NewMessageForm = () => {
  const {conversationId} = useConversations()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const form = useForm({
    defaultValues:{
      message:""
    }
  })

  const onSubmit = (data: any) =>{
    axios.post("/api/messages", {
      ...data, conversationId
    })
  }

  const handleUpload = (result: any) =>{
    setLoading(true)
    try {
      axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId
    })
    .then(()=>{
      setLoading(false)
      router.refresh()
    })
    } catch (error) {
      console.log(error)
    }
    
  }
  if(loading){
    return <Loader />
  }
  return(
    <div className="py-4 px-4  border-t flex items-center gap-2 justify-end lg:gap-4 w-full">
        <CldUploadButton options={{maxFiles: 1}} onSuccess={handleUpload} uploadPreset="fnhetpjm">
          <HiPhoto size={30} className='text-sky-500/75'/> 
        </CldUploadButton>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex items-center gap-2 lg:gap-4 w-[50vw]'> 
          <FormField 
            control={form.control}
            name="message"
            render={({field})=> (
              <FormItem>
                <FormControl>
                  <Input {...field} type="text" required placeholder="write a message"/>
                </FormControl>
              </FormItem>
            )}
          />
          <button type="submit" className='rounded-full p-2 bg-sky-500/75 cursor-pointer hover:bg-sky-500 transition'>
            <HiPaperAirplane />
          </button>
        </form>
      </Form>
    </div>
  )
}
