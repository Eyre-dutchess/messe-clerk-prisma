

import BgLinear from "@/frontend/constant/BgLinear"
import { Sidebar } from "@/frontend/sidebar/Sidebar"

interface layoutProps {
  children: React.ReactNode
}

export default async function layout({children}: layoutProps){
  

  return(
    <div className='min-w-screen min-h-screen'>
      <BgLinear />
      <Sidebar>
        {children}
      </Sidebar>
    </div>
  )
}
