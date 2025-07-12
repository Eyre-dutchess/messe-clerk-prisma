"use server"
import React from 'react'

import { getConversationById } from '@/backend/actions/getConversationById'
import { getMessages } from '@/backend/actions/getMessages'
import { EmptyState } from '@/frontend/constant/EmptyState'
import { Header } from '@/frontend/conversation/singleConversation/Header'
import { Body } from '@/frontend/conversation/singleConversation/Body'
import { NewMessageForm } from '@/frontend/conversation/singleConversation/NewMessageForm'

interface IParams {
  conversationId: string
}

const ConversationSinglePage = async ({params}:{params:Promise<IParams>}) =>{

    const conversation = await getConversationById(params)
    const messages = await getMessages(params)

    if(!conversation){
    return(
        <div className="lg:pl-80 h-full">
            <div className="h-full flex flex-col">
                <EmptyState title="no conversation yet!" />
            </div>
        </div>
  )}

  return(
    <div className="lg:pl-80 min-h-[90vh]">
        <div className="h-full flex flex-col">
            <Header conversation={conversation}/>
            <Body initialMessages={messages}/>
            <NewMessageForm />
        </div>
    </div>
  )
}

export default ConversationSinglePage;