"use client"
import BgLinear from '@/frontend/constant/BgLinear'
import { EmptyState } from '@/frontend/constant/EmptyState'
import Link from 'next/link'
import React from 'react'

export default function ErrorPage() {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
        <BgLinear />
        <p className='text-3xl w-max'>something went wrong</p>
        <Link href={"/users"}>back</Link>
    </div>
  )
}

