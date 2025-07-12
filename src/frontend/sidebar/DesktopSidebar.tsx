
"use client"

import React, { useEffect, useState } from 'react' 
// import { useUser } from '@clerk/nextjs'
// import { UserResource } from "@clerk/types";

import useRoutes from '@/backend/hook/useRoutes'
import { Avatar } from '@/frontend/constant/Avatar'
import { DesktopItem } from './DesktopItem'
import { SettingModal } from './SettingModal'
import { User } from '@/generated/prisma'

interface DesktopSidebarProps {
  curUser : User
}
export const DesktopSidebar = ({curUser}: DesktopSidebarProps) => {
    const routes = useRoutes()
    const [isOpen, setIsOpen] = useState(false)

    return(
    <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:w-[5em] xl:px-6 lg:overflow-y-auto bg-gradient-to-b from-white/25 to-blue-100/50 lg:border-r-[1px] border-white/75 lg:pb-4 lg:flex lg:flex-col justify-between">
        <SettingModal 
            isOpen={isOpen}
            curUser = {curUser}
            onClose = {()=> setIsOpen(false)}
        />
        
            <nav className='mt-4 '>
                <ul role='list' className='w-full flex flex-col items-center space-y-3'>
                    {routes.map((item:any)=>{
                        return(
                            <DesktopItem 
                                key={item.label}
                                href ={item.href}
                                label={item.label}
                                icon = {item.icon}
                                active = {item.active}
                                onClick={item.onClick}
                            />
                        )
                    })}
                </ul>
            </nav>
        

            <nav className='w-full justify-center items-center z-40 absolute bottom-25 hidden lg:flex  lg:left-[calc(2.5em_-_50%)] '>
                <div onClick={()=> setIsOpen(true)} className='cursor-pointer hover:opacity-75 transition flex lg:flex-col flex-row items-center justify-center lg:gap-1 gap-3'>
                    <h6 className='text-blue-400 font-semibold'>{curUser.name?.split(" ")[0]}</h6>
                    <Avatar user = {curUser}/>
                </div>
            </nav>
    </div>
  )
}
