"use client"

import Link from 'next/link'
import React from 'react' 
import clsx from 'clsx'
import { SignOutButton } from '@clerk/nextjs'
import { HiArrowLeftOnRectangle } from 'react-icons/hi2'

import { Button } from '@/components/ui/button'

interface MobileItemProps {
  href: string
  icon: any
  onClick?: () => void
  active?: boolean
  label: string
}

export const MobileItem = ({label, href, icon: Icon, active, onClick }: MobileItemProps) => {
  const handleClick = () =>{
    if(onClick){
      return onClick()
    }
  }

  if(label === "Logout"){
    return (
      <SignOutButton >
        <Button variant="link" className="w-[30vw]  p-0 h-full shrink-0 font-semibold text-gray-800/75  hover:text-gray-800 hover:bg-gray-100/25">
          <HiArrowLeftOnRectangle />
        </Button>
      </SignOutButton>
    )
  }
  return(
      <Link onClick={handleClick} href={href}
        className={clsx(`w-full group border-r flex justify-center gap-x-3 p-3 text-sm leading-6 font-semibold text-gray-800/50  hover:text-gray-800/50 hover:bg-gray-100/25`, 
          active && "bg-blue-200/75 text-gray-800/75"
        )}
      >
        <Icon className="h-6 w-6 shrink-0" />
      </Link> 
  )
}
