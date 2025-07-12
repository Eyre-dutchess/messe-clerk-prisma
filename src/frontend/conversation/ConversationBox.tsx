"use client"

import React, { useCallback, useMemo } from 'react' 
import {format} from "date-fns"
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'

import { FullConversationType } from '@/backend/types/index'
import useOtherUser from '@/backend/hook/useOtherUser'
import { Avatar } from '@/frontend/constant/Avatar'
import { AvatarGroup } from '@/frontend/constant/AvatarGroup'
interface ConversationBoxProps {
  data:FullConversationType
  selected: boolean
}

export const ConversationBox = ({data, selected}: ConversationBoxProps) => {
  const otherUser = useOtherUser(data)!
  const {userId} = useAuth()
  const router = useRouter()

  const handleClick = useCallback(()=>{
    router.push(`/conversations/${data.id}`)
  }, [data.id, router])

  const lastMessage = useMemo(()=>{
    const messages = data.messages || []
    return messages[messages.length - 1]
  }, [data.messages])

  const userClerk = useMemo(()=>{
    return userId
  }, [userId])

  const hasSeen = useMemo(()=>{
    if(!lastMessage){
      return false;
    }
    const seenArr = lastMessage.seen || [];

    if(!userClerk){
      return false
    }
    return seenArr
    .filter((user)=> user.clerkId === userClerk).length !==0
  }, [userClerk, lastMessage])

  const lastMessageText = useMemo(()=>{
      if(lastMessage?.image){
        return "sent an image"
      }
      if(lastMessage?.body){
        return lastMessage.body
      }
      return "started a conversation"
  }, [lastMessage])
  return(
    <div onClick={handleClick} className={clsx("w-full shadow-lg relative  flex items-center space-x-3 hover:bg-neutral-100/75 rounded-lg mb-2 pl-4 py-4 transition cursor-pointer", 
      selected?"bg-neutral-100":"bg-white/50"
    )}>
      {data.isGroup ? (
        <AvatarGroup users={data.users}/>
      ):(
        <Avatar user={otherUser}/>
      )}
        <div className="min-w-0 flex-1 ">
          <div className="focus:outline-none">
            <div className="flex justify-between items-center mb-1">
              <p className='text-md font-medium text-blue-900'>{data.name?.split(" ")[0] || otherUser.name?.split(" ")[0]}</p>
              {lastMessage?.createdAt && (
                <p className='text-xs font-light pr-6 text-blue-900/50'>{format(new Date(lastMessage.createdAt), "p")}</p>
              )}
            </div>
            <p className={clsx(`truncate text-sm`, hasSeen?"text-blue-900/50":"text-blue-400 font-medium")}
            >{lastMessageText}</p>
          </div>
        </div>
    </div>
  )
}
