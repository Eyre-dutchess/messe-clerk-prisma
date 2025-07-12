import { useMemo } from "react"

import { User } from "@/generated/prisma"
import { FullConversationType } from "@/backend/types/index"
import { useAuth } from "@clerk/clerk-react"

const useOtherUser = (conversation: FullConversationType | {users: User[]}) => {
    const {userId} =useAuth()
    const otherUser = useMemo(()=>{
        const curUserID = userId
        const otherUser = conversation.users.filter((item)=> item. clerkId !== curUserID)
        return otherUser[0]
    }, [userId, conversation.users]);
    
    return otherUser
}

export default useOtherUser