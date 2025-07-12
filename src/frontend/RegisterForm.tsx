"use client";

import React, {   useState }  from 'react' 
import { useForm } from 'react-hook-form';
import * as z from "zod"
import {  useSignUp } from '@clerk/nextjs';
import { redirect, useRouter  } from 'next/navigation';
import prisma from "@/backend/libs/prismadb";
import bcrypt from "bcryptjs"

import { RegisterSchema } from '@/backend/libs/schemas';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Loader from './constant/Loader';
import { EmptyState } from './constant/EmptyState';

export const RegisterForm = () => {
    const {isLoaded, signUp, setActive} = useSignUp()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
   
    // useEffect(()=>{
    //        if(signUp){
    //            redirect("/sign-in")
    //        }
    //    }, [signUp])
   
    const form = useForm<z.infer<typeof RegisterSchema>>({
        defaultValues:{
            name:"",
            email:"",
            password:""
        }
    })
    const onSubmit =async (values: z.infer<typeof RegisterSchema>)=>{
        if(!isLoaded) return;
        setLoading(true)
        try {
            const pw = await bcrypt.hash(values.password, 12)
             const temp=await signUp.create({
                lastName: values.name,
                firstName: values.name,
                emailAddress: values.email,
                password: pw
            })
            console.log(temp)
            if(temp.status === "complete"){
                await setActive({ session: temp.createdSessionId })
                router.push("/sign-in")
            }
            setLoading(false)
            
        } catch (error: any) {
            setError(error.errors[0].longMessage)
            setLoading(false)
            console.log(error.errors[0].message)
            }
    }
   
    // const formVefy = useForm<z.infer<typeof VerifySchema>>({
    //     defaultValues:{
    //         code:""
    //     }
    //     })
    // const handleVerify = async () => {
    //         if (!isLoaded) return;
    //         try {
    //             const completeSigUp = await signUp.attemptEmailAddressVerification({code});
    //             if (completeSigUp.status !== 'complete') {
    //                console.error(JSON.stringify(completeSigUp, null, 2))}
    
    //             if (completeSigUp.status === 'complete') {
    //                 await setActive({ session: completeSigUp.createdSessionId })
    //                 router.push('/sign-in')}
    //         } catch (err: any) {
    //             console.error('Error:', JSON.stringify(err, null, 2))
    //     }
    //   }


    if(!isLoaded || loading){
        return <Loader />
    }
    if(error){
        return <EmptyState title={error || "soemthing went wrong and `/error/` isnt showing"} />
    }
    return(
        <>
         {/* {verifying && <Form {...formVefy} >
                <div className='fixed z-50 bg-zinc-800/50 top-0 left-0 w-screen h-screen flex items-center justify-center'>
                    <form onSubmit={formVefy.handleSubmit(handleVerify)} className='w-[400px] h-[300px] bg-white/85 rounded-md flex flex-col items-center justify-center gap-2 py-6 px-3'>
                        <FormField 
                            control={formVefy.control}
                            name="code"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Verify code</FormLabel>
                                    <FormControl>
                                        <Input type="string" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </form>
                </div>  
            </Form>} */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className=' p-6 space-y-4 rounded-md shadow-blue-500 bg-white/25'>
                    <FormField control={form.control} name="name"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Name: </FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={!isLoaded} type="text" placeholder='john doe' />
                                </FormControl>
                            </FormItem>
                        )} />
                    <FormField control={form.control} name="email"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Email: </FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={!isLoaded} type="email" placeholder='johndoe@example.com' />
                                </FormControl>
                            </FormItem>
                        )} />
                    <FormField control={form.control} disabled={!isLoaded} name="password"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Password: </FormLabel>
                                <FormControl>
                                    <Input {...field} type="password" placeholder='*******' />
                                </FormControl>
                            </FormItem>
                        )}/>
                    <div id="clerk-captcha"></div>
                    <Button className='w-full' disabled={!isLoaded} type="submit">Register</Button>
                </form>
            </Form>
             {/* {error && (
                  <EmptyState  />
                )} */}
        </>
    )
}
