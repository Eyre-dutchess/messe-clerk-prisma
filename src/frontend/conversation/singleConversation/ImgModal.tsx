"use client"

import { Modal } from '@/frontend/constant/Modal'
import Image from 'next/image'
import React from 'react' 
interface ImgModalProps {
  isOpen?: boolean
  onClose: () => void
  src?: string | null
}

export const ImgModal = ({isOpen, onClose, src}: ImgModalProps) => {
  
  if(!src){
    return null
  }
  return(
    <Modal isOpen={isOpen} onClose={onClose}>
        <div className='w-80 h-80'>
            <Image alt="image" className='object-cover' fill src={src}/>
        </div>
    </Modal>
  )
}
