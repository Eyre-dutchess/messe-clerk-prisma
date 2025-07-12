"use client"

import React from 'react' 
import Link from 'next/link'
import { useSignIn } from '@clerk/nextjs'
import {OAuthStrategy} from "@clerk/types"
import { AiOutlineGithub, AiOutlineGoogle } from 'react-icons/ai'

import { Button } from '@/components/ui/button'
import Loader from './constant/Loader'

interface OAuthFormProps {
  secLabel: string
  secAction: string
}

export const OAuthForm = ({secLabel, secAction}: OAuthFormProps) => {
    const {signIn, isLoaded} = useSignIn()
    if(!signIn) return null;
    const handleSocial = (strategy: OAuthStrategy) =>{
        return signIn.authenticateWithRedirect({
          strategy, 
          redirectUrl:"/sign-in/sso-callback",
          redirectUrlComplete:"/users"
        })
        .then((res)=>{
          console.log(res)
        })
        .catch((err: any)=>{
          console.error(err, null, 2)
        })
    }
  if(!isLoaded){
    return <Loader />
  }
   return(
     <div className='py-6 space-y-4  flex flex-col items-center'>
        <p className='opacity-25 bg-primary w-full h-[1px] flex items-center justify-center'>or</p>
        <div className='flex flex-row items-center justify-center gap-2  w-full p-6'>
            <Button onClick={()=> handleSocial("oauth_github")} variant="social" className='w-1/2' ><AiOutlineGithub />Github</Button>
            <Button onClick={()=> handleSocial("oauth_google")} variant="social" className='w-1/2'><AiOutlineGoogle />Google</Button> 
        </div>
        <div className='italic w-full flex flex-row items-center justify-center'>
            <p className='opacity-25'>{secLabel}</p>
            <Link href={`/${secAction}`} className='capitalise'>
              <Button variant="link">{secAction} now</Button>
            </Link>
        </div> 
     </div>
   )
}
