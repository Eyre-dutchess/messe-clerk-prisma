import Link from "next/link";
import { BsMessenger } from "react-icons/bs";

import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PageContainer } from "@/frontend/constant/PageContainer";

export default  function Home() {

  return (
    <PageContainer> 
      <Card className="w-4/5 md:w-2/3 max-w-[650px]">
        <CardHeader className="truncate py-10">
          <div className="mx-auto w-max rounded-full bg-white/75 text-blue-400 text-6xl md:text-8xl"><BsMessenger /></div>
          <CardTitle className="font-[family-name:var(--font-title))] text-center text-2xl md:text-4xl text-blue-400 pt-6">Your Personal Messenger</CardTitle>
        </CardHeader>
        <CardFooter className="gap-4">
          <Link href="/sign-in" className="w-full">
            <Button className="w-full bg-blue-400 hover:bg-blue-300">Sign in</Button>
          </Link>
          <Link  href="/register" className="w-full">
            <Button variant="ghost" className="w-full text-blue-400 border border-blue-300 hover:text-blue-400">Register</Button>
          </Link>
        </CardFooter>
      </Card>
    </PageContainer>
  );
}
