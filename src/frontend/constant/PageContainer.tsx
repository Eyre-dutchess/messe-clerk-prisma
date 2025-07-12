"use client"

import React from 'react' 
interface PageContainerProps {
  children: React.ReactNode
}

export const PageContainer = ({children}: PageContainerProps) => {
  return(
    <div className="z-40 relative flex items-center justify-center min-h-screen">{children}</div>  
  )
}
