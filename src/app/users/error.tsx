"use client"

import BgLinear from '@/frontend/constant/BgLinear'
import Link from 'next/link'
import React from 'react'

export default function ErrorPage() {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
        <BgLinear />
        <p className='text-3xl w-max'>something went wrong</p>
        <Link href={"/"}>go back</Link>
    </div>
  )
}

