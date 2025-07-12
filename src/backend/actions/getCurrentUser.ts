"use server"

import prisma from "@/backend/libs/prismadb"
import { auth, currentUser } from "@clerk/nextjs/server"

export const getCurrentUser = async() =>{
    try {
        const {userId} = await auth()
        if(!userId || typeof userId !== "string"){
            throw new Error("invalid ID")
        }
        const curUser = await prisma.user.findUnique({
            where:{
                clerkId: userId
            }
        })
        if(!curUser){
            return null
        }
        return curUser    
    } catch (error: any) {
        return error
    }
}