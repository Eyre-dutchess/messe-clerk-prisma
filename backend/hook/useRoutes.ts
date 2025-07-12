import { usePathname } from 'next/navigation'
import React, { useMemo } from 'react'
import { HiChat, HiUsers } from 'react-icons/hi';
import { HiArrowLeftOnRectangle } from 'react-icons/hi2';

import useConversations from './useConversations';


const useRoutes = () => {
    const pathName = usePathname();
    const {conversationId} = useConversations()
    

    const routes = useMemo(()=>[
        {
            label:"Chat",
            href:"/conversations",
            icon: HiChat,
            active: pathName === "/conversations" || !!conversationId
        },
        {
            label:"Users",
            href:"/users",
            icon: HiUsers,
            active: pathName === "/users"
        },
        {
            label:"Logout",
            href:"#",
            icon: HiArrowLeftOnRectangle}
    ], [pathName, conversationId]);
    return routes
}

export default useRoutes