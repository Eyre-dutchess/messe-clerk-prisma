"use client"

import useActiveChannel from "@/backend/hook/useActiveChannel"


const ActiveStatus = ()=>{
    useActiveChannel();
    return null;
}

export default ActiveStatus;