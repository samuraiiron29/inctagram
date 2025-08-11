'use client'
import Image from 'next/image'
import React from 'react'

export type SignInArgs = {
  email: string
  password: string
}
function Page() {
  return (
    <div>
      <div className={'flex flex-col items-center my-[20px] '}>
        <div>Sign Up</div>
        <div className={'flex flex-col items-center bg-accent-100 rounded py-[16px]'}>
          <p>Sign Up using GitHub</p>
          <Image onClick={() => {}} src="/oauthIcons/github.svg" alt="GitHub auth" width={36} height={36} className="cursor-pointer" />
        </div>
      </div>
    </div>
  )
}

export default Page
