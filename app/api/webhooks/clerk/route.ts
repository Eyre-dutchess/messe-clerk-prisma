import {Webhook} from "svix"
import { WebhookEvent } from "@clerk/nextjs/server"
import { headers } from "next/headers"
import prisma from "@/backend/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try {
        const secret = process.env.SIGNING_SECRET;
        if(!secret){
            return new Response("missing secret", {status: 500});
        }

        const wh = new Webhook(secret)
        const body = await req.text();
        const headerPayload = await headers()

        const event = wh.verify(body, {
            "svix-id": headerPayload.get("svix-id")!,
            "svix-timestamp": headerPayload.get("svix-timestamp")!,
            "svix-signature": headerPayload.get("svix-signature")!,
        }) as WebhookEvent

        if(event.type === "user.created"){
            const {id, first_name, last_name, email_addresses} = event.data;
        
            await prisma.user.upsert({
                where:{clerkId: id},
                update:{},
                create:{
                    clerkId: id,
                    email: email_addresses[0].email_address,
                    name: `${first_name} ${last_name}`,
                }
            })
        }

        return new Response("OK")  
    } catch (error) {
        return NextResponse.json(error, {status: 400})
    }
    
}

// npm i --g ngrok
// ngrok http 3000
// ngrok config add-authtoken 2zQnKuJISoDJEcBpHGrRdHkNWlz_6zxVtfqW5uQ2pPRdQxzC6
// Authtoken saved to configuration file: /Users/eyrec/Library/Application Support/ngrok/ngrok.yml
// grok http http://localhost:3000
 



// export async function POST() {
//     return Response.json({message:"route is working"})
// }
