"use client"

import { Button } from '@/components/ui/button'
import { redirect, useRouter } from 'next/navigation'
import React from 'react' 

interface EmptyStateProps {
  title?: string
}

export const EmptyState = ({title}: EmptyStateProps) => {

  return(
    <div className='w-full h-full fixed z-0 top-0 left-0 bg-white flex flex-col gap-4 items-center justify-center '>
        <h6>{title}</h6>
        <Button onClick={()=> redirect("/sign-in")}>go back</Button>
    </div>
  )
}