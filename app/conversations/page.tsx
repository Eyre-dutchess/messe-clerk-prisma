"use client"

import { EmptyState } from "@/frontend/constant/EmptyState"
import useConversations from "@/backend/hook/useConversations"
import clsx from "clsx"

const ConversationPage =()=> {
    const {isOpen} = useConversations()

    return (
        <div className={clsx("lg:pl-100 lg:pt-50 h-[50vh] lg:block sm:w-2/3 mx-auto ",
            isOpen?"block":"hidden"
        )}>
            <p className="text-3xl w-max text-blue-900">No conversations yet</p>
        </div>
    )
}
export default ConversationPage;