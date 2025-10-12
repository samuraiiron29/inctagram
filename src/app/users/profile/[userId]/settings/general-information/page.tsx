'use client'

import { AvatarUploader } from "@/features/Image/utils/AvatarUploader"
import { Button, Scroll } from "@/shared/ui/base"
import { SettingsForm } from "@/shared/ui/base/SettingsForm/SettingsForm"
import Image from "next/image"
import { useState } from "react"

const GeneralInformation = () => {
   const [openUploader, setOpenUploader] = useState(false)
    
  return (
    <div className="p-4 md:p-0 h-[100vh]">
     <div className="flex flex-col md:flex-row gap-10">
      {/* Левая колонка с аватаром и кнопкой */}
        <div className="flex flex-col items-center md:items-start min-w-[204px]">
          <div className="relative mb-5 w-[204px] h-[204px]">
            <Image src={'/avatar.svg'} width={204} height={204} alt="Avatar" className="rounded-full mr-10 border-white min-w-[204px]" />
        </div>
       
       <Button variant="outlined" onClick={()=>setOpenUploader(true)}>
        Select Profile Photo
       </Button>
       </div>
       
       {/* Форма */}
          <div className="flex-1">
            <Scroll className="h-[100vh]">
              <SettingsForm />
              
              {/* <div className="flex flex-col md:flex-row gap-6">
              </div> */}
              <AvatarUploader open={openUploader} onClose={()=>setOpenUploader(false)}/>
            </Scroll>
          </div>
        
    </div>
    </div>
  )
}


export default GeneralInformation