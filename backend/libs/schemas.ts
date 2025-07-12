import * as z from "zod";

export const SigninSchema = z.object({
    email: z.string().email({
        message:"Email is required"
    }),
    password: z.string().min(1, {
        message:"Pasword is required"
    }),
})

export const RegisterSchema = z.object({
    email: z.string().email({
        message:"email is required"
    }),
    password: z.string().min(6, {
        message:"minimun 6 characters are required"
    }),
    name: z.string().min(1,{
        message:"name is required"
    })
})

export const VerifySchema = z.object({
    code: z.string().min(1,{
        message:"code is required"
    })
})

export const GroupChatFormSchema = z.object({
    name: z.string().min(1, {
        message: "name is required"
    }),
    members:z.array(z.string()).min(2, {
        message:"minimun 2 members are required"
    })
})