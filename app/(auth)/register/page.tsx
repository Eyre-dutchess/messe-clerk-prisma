import React from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { OAuthForm } from '@/frontend/OAuthForm'
import { RegisterForm } from '@/frontend/RegisterForm'
import { PageContainer } from '@/frontend/constant/PageContainer'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function page(){
    // const user = await auth()
    // if(user.isAuthenticated){
    //   redirect("/users")
    // }
    // if(!user.sessionId){
    //   redirect("/")
    // }
  return (
    <PageContainer>
        <Card className="w-4/5 md:w-2/3 max-w-[650px]">
          <CardHeader>
            <CardTitle className='text-center text-xl  text-blue-500'>Welcome to Register</CardTitle>
          </CardHeader>
          <CardContent>
            <RegisterForm />
            <OAuthForm secAction='sign-in' secLabel="Already have an account? " />
          </CardContent>
        </Card>
    </PageContainer>
  )
}
