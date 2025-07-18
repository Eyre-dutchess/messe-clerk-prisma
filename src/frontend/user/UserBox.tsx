"use client"

import React, { useCallback, useState } from 'react' 
import { useRouter } from 'next/navigation'
import axios from 'axios'

import LoadingModal from '@/frontend/constant/Loader'
import { Avatar } from '@/frontend/constant/Avatar'
import { User } from '@/generated/prisma'

interface UserBoxProps {
  data: User
}

export const UserBox = ({data}: UserBoxProps) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleClick = useCallback(()=>{
    setLoading(true)

    axios.post("/api/conversations", {
      userId: data.id
    })
    .then((data)=>{
      router.push(`/conversations/${data.data.id}`)
    })
    .finally(()=> {
      setLoading(false)
    })
  }, [data, router])
  return(
    <div>
      {loading && (
        <LoadingModal />
      )}
      <div onClick={handleClick} className='w-full shadow-lg relative flex items-center space-x-3 bg-blue-100/25 p-3 mb-2 hover:bg-blue-200/75 rounded-lg transition cursor-pointer'>
        <Avatar user = {data}/>
        <div className='min-w-0 flex-1'>
          <div className='focus:outline-none'>
            <div className='flex justify-between items-center mb-1'>
              <h6 className='text-sm font-medium text-gray-900/75'>{data.name?.split(" ")[0]}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
