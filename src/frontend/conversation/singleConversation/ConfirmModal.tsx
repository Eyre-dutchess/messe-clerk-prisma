"use client"

import React, { useCallback, useState } from 'react' 
import axios from 'axios'
import { useRouter } from 'next/navigation'
import {FiAlertTriangle} from "react-icons/fi"

import { Modal } from '@/frontend/constant/Modal'
import useConversations from '@/backend/hook/useConversations'
import { Button } from '@/components/ui/button'


interface ConfirmModalProps {
  isOpen: boolean
  onClose: ()=> void
}

export const ConfirmModal = ({isOpen, onClose}: ConfirmModalProps) => {
  const router = useRouter()
  const {conversationId} = useConversations()
  const [loading, setLoading] = useState(false)

  const onDelete = useCallback(()=>{
    setLoading(true)
    axios.delete(`/api/conversations/${conversationId}`)
    .then(()=>{
      onClose()
      router.push("/conversations")
      router.refresh()
    })
    .catch(()=>{
     console.error("can't delete conversation")
    })
    .finally(()=>{
      setLoading(false)
    })
  }, [conversationId, router, onClose])
  return(
    <Modal 
      isOpen={isOpen}
      onClose={onClose}>
        <div className="sm:flex sm:items-start">
          <div className="flex mx-auto h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <FiAlertTriangle className='h-6 w-6 text-red-600'/>
          </div>
          <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
            <h3 className="text-gray-900/75 font-semibold leading-6">
              Delete Conversation
            </h3>
            <div className='mt-2'>
              <p className='text-sm text-gray-500'>Are you sure you want to delete this conversation? </p>
            </div>
          </div>
        </div>
        <div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-4'>
          <Button disabled={loading} variant="destructive" onClick={onDelete}>Delete</Button>
          <Button disabled={loading} variant="secondary" onClick={onClose}>Cancel</Button>
        </div>
    </Modal>
  )
}
