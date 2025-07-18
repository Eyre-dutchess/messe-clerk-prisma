import { NextApiRequest, NextApiResponse } from "next";

import { pusherServer } from "@/backend/libs/pusher";
import { auth } from "@clerk/nextjs/server";



export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
){

    const {userId} = await auth()

    if(!userId){
        return response.status(401)
    };
    const socketId = request.body.socket_id;
    const channel = request.body.channel_name;
    const data = {
        user_id: userId
    };
    const authResponse = pusherServer.authorizeChannel(socketId, channel, data);
    return response.send(authResponse)
}

