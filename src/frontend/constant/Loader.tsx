"use client";

import React from 'react'
import {PacmanLoader} from "react-spinners";

export default function Loader() {
  return (
    <div className='fixed top-0 left-0 z-50 w-screen h-screen bg-white/85 flex items-center justify-center text-9xl '>
        <PacmanLoader color='orange' />
    </div>
  )
}
