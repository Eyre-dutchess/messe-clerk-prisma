"use client"

import React from 'react' 
import { User } from '@/generated/prisma'
import Image from 'next/image'
interface AvatarGroupProps {
  users: User[]
}

export const AvatarGroup = ({users=[]}: AvatarGroupProps) => {
  const slicedUsers = users.slice(0, 3)
  const positionMap = {
    0:"top-0 left-[12px]",
    1:"bottom-0",
    2:"bottom-0 right-0"
  }
  return(
    <div className='relative h-11 w-11'>
      {slicedUsers.map((user, index)=>{
        return (
          <div key={index} className={`absolute inline-block rounded-full overflow-hidden h-[21px] w-[21px]
            ${positionMap[index as keyof typeof positionMap]}
            `}>
              <Image 
                alt="avatar"
                fill
                src={user?.image || "/images/profile.png"}
              />
            </div>
        )
      })}
    </div>
  )
}
