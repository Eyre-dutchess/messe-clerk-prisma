
"use client"
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/frontend/constant/EmptyState'
import { useRouter } from 'next/navigation'
import React from 'react' 
interface errorProps {
  err: string
}

export const error = ({err}: errorProps) => {
    const router = useRouter()
    return(
      <div className='h-[100vh] w-full gap-10 fixed z-50 flex-col flex items-center justify-center'>
        <p className='text-5xl text-red-400 '>cant log into the page</p>
        <Button onClick={()=> router.push('/')}>back</Button>
      </div>
    )
}
export default error
