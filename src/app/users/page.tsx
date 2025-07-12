import React from 'react'
import Link from 'next/link'
import { UserList } from '@/frontend/user/UserList'
import getUsers from '@/backend/actions/getUsers'
import { getCurrentUser } from '@/backend/actions/getCurrentUser'
import { HiExternalLink } from 'react-icons/hi'

export default async function page() {
  const users = await getUsers()
  const curUser = await getCurrentUser()

  if(!curUser){
    return (
      <Link href={"/sign-in"}>
        <p className='text-xl text-white fixed top-50 left-50 z-50'>
          <HiExternalLink />
          back to log into your account first</p></Link>
    )
  }
  return (
      <div className='h-full'>
        <UserList items={users}/>
      </div>
    
  )
}
