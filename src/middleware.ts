import {  clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher(['/(.*)','/sign-in(.*)','/api/webhooks(.*)', "/register(.*)"])

export default clerkMiddleware(async(auth, req)=>{
  
  const {userId} = await auth();

  if(!isPublicRoute(req)){
    await auth.protect()
  }
  // if(!userId){
  //   return Response.redirect(new URL("/sign-in", req.url))
  // }
  if(!isPublicRoute(req)){
    if(userId){
        return Response.redirect(new URL("/users", req.url))
    }
  }

});
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};