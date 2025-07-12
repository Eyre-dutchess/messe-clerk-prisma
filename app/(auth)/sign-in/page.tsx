import React from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { OAuthForm } from '@/frontend/OAuthForm'
import { SigninForm } from '@/frontend/SigninForm'
import { PageContainer } from '@/frontend/constant/PageContainer'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function page(){
  const user = await auth()
  if(user.isAuthenticated){
    redirect("/users")
  }


  return (
    <PageContainer>
        <Card className="w-4/5 md:w-2/3 max-w-[650px]">
          <CardHeader>
            <CardTitle className='text-center text-xl  text-blue-500'>Welcome back to SignIn</CardTitle>
          </CardHeader>
          <CardContent >
            <SigninForm />
            <OAuthForm secAction='register' secLabel="Don't have an account yet?"/>
          </CardContent>
        </Card>
    </PageContainer>
  )
}


// factorVerificationAge
// : 
// (2) [6, -1]

// has
// : 
// (params) => {…}
// isAuthenticated
// : 
// true
// redirectToSignIn
// : 
// (opts = {}) => {…}
// redirectToSignUp
// : 
// (opts = {}) => {…}
// sessionClaims
    // : 
    // azp
    // : 
    // "http://localhost:3000"
    // exp
    // : 
    // 1752111550
    // fva
    // : 
    // (2) [6, -1]
    // iat
    // : 
    // 1752111490
    // iss
    // : 
    // "https://fancy-bass-70.clerk.accounts.dev"
    // nbf
    // : 
    // 1752111480
    // sid
    // : 
    // "sess_2zf987GOZhqWYFFWUQ2Fu6OHmEC"
    // sub
    // : 
    // "user_2zZMHZFf68QbDXWmpMEEzSzHSwe"
    // v
    // : 
    // 2
    // [[Prototype]]
    // : 
    // Object
// sessionId
// : 
// "sess_2zf987GOZhqWYFFWUQ2Fu6OHmEC"
// sessionStatus
// : 
// null
// tokenType
// : 
// "session_token"
// userId
// : 
// "user_2zZMHZFf68QbDXWmpMEEzSzHSwe"