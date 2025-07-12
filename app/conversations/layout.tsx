import React from 'react' 
import { ConversationList } from '@/frontend/conversation/ConversationList'
import getConversations from '@/backend/actions/getConversations'
import getUsers from '@/backend/actions/getUsers'
import { Sidebar } from '@/frontend/sidebar/Sidebar'


export default async function ConversationLayout({children}:{children: React.ReactNode}){
    const conversations = await getConversations()
    const users = await getUsers()
  return(
    <Sidebar>
        <div className='h-full'>
            <ConversationList 
                initialItems = {conversations}
                users = {users}
            />
            {children}
        </div>
    </Sidebar>
  )
}
