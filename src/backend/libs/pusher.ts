
import PusherServer from "pusher";
import PusherClient from "pusher-js";
export const pusherServer = new PusherServer({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster:"ap1",
    useTLS: true
});

export const pusherClient = new PusherClient(
    process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
    {   
        channelAuthorization:{
            endpoint:"/api/pusher/auth",
            transport: "ajax"
        },
        cluster:"ap1"
    }
);