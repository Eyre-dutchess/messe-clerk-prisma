"use client"

import React, { useEffect, useState }  from 'react' 
import { useForm } from 'react-hook-form'
import * as z from "zod";
import {  useSignIn, useUser } from '@clerk/nextjs';
import { redirect, useRouter } from 'next/navigation';

import { SigninSchema} from '@/backend/libs/schemas';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import Loader from './constant/Loader';
import { EmptyState } from './constant/EmptyState';

export const SigninForm = () => {
   
    const {isLoaded, signIn, setActive} = useSignIn()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    // useEffect(()=>{
    //     if(signIn){
    //         redirect("/users")
    //     }
    // }, [signIn])

    const form = useForm<z.infer<typeof SigninSchema>>({
        defaultValues:{
            email: "",
            password: ""
        }
    })
    
    const onSubmit =async (values: z.infer<typeof SigninSchema>) =>{
        if(!isLoaded) return;
        setLoading(true)
        try {
            const temp =  await signIn.create({
                password: values.password,
                strategy:"password",
                identifier:values.email
            })
            
            if(temp.status === "complete" ){
                await setActive({session: temp.createdSessionId}) 
                redirect("/users")
            }
            setLoading(false)
            
        } catch (error: any) {
            setError(error.errors[0].longMessage || "something /some error went wrong" )
            setLoading(false)
            console.log(error.errors[0].message || "something /some error went wrong")
            }
        
    }

    if(!isLoaded || loading){
            return <Loader />
        }
    if(error){
            return <EmptyState title={error || "soemthing went wrong and `/error/` isnt showing"} />
    }
    return(
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='p-6 space-y-4 rounded-md  shadow-blue-500 bg-white/25'>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Email: </FormLabel>
                                <FormControl>
                                    <Input className='' type="email" {...field} placeholder='joan@example.com'/>
                                </FormControl>
                            </FormItem>
                        )}
                        />

                    <FormField 
                        control={form.control}
                        name="password"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Password: </FormLabel>
                                <FormControl>
                                    <Input type="password"  placeholder='*******' {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                        />
                    <div id="clerk-captcha"></div>
                    <Button type="submit"  className='w-full'>Log in</Button>
                </form>
            </Form>
            {error && (
                <EmptyState />
            )}
        </>
    )
}


// attemptFirstFactor
// : 
// e=> {…}
// createdSessionId
// : 
// "sess_2zZUISrvEDMAoHH2EpKxDDpC7Jm"
// firstFactorVerification
// : 
// o
// attempts
// : 
// 1
// channel
// : 
// undefined
// error
// : 
// null
// expireAt
// : 
// Tue Jul 08 2025 09:26:47 GMT+0800 (China Standard Time) {}
// externalVerificationRedirectURL
// : 
// null
// id
// : 
// undefined
// message
// : 
// null
// nonce
// : 
// null
// pathRoot
// : 
// ""
// status
// : 
// "verified"
// strategy
// : 
// "password"
// verifiedAtClient
// : 
// undefined
// id
// : 
// "sia_2zZUIQPnXUzFfUPQRCdcNvo0GPM"
// identifier
// : 
// "sera@outlook.com"
// pathRoot
// : 
// "/client/sign_ins"
// prepareFirstFactor
// : 
// e=> {…}
// prepareSecondFactor
// : 
// e=>this._basePost({body:e,action:"prepare_second_factor"})
// resetPassword
// : 
// e=>this._basePost({body:e,action:"reset_password"})
// secondFactorVerification
// : 
// o {id: undefined, pathRoot: '', status: null, strategy: null, nonce: null, …}
// status
// : 
// "complete"
// supportedFirstFactors
// : 
// null
// supportedIdentifiers
// : 
// ['email_address']
// supportedSecondFactors
// : 
// null
// userData
// : 
// Q {firstName: undefined, lastName: undefined, imageUrl: undefined, hasImage: undefined}

// VM12911 SigninForm.tsx:65 {
//   "status": 422,
//   "clerkError": true,
//   "errors": [
//     {
//       "code": "form_password_incorrect",
//       "message": "Password is incorrect. Try again, or use another method.",
//       "longMessage": "Password is incorrect. Try again, or use another method.",
//       "meta": {
//         "paramName": "password"
//       }
//     }
//   ]
// }