'use client'

import Image from 'next/image'
import { Registration } from './Registation/ui/Registration'

const Page = () => {
  const handleGitHubLogin = () => {
    const redirectUrl = 'http://localhost:3000/auth/github'
    const loginUrl = `${process.env.NEXT_PUBLIC_BASE_URL}auth/github/login?redirect_url=${redirectUrl}`
    window.location.href = loginUrl
  }

  return (
    <>
      <div className={'flex flex-col items-center my-[20px] '}>
        <div>Sign Up</div>
        <div className={'flex flex-col items-center bg-accent-100 rounded py-[16px]'}>
          <p>Sign Up using GitHub</p>
          <Image
            onClick={handleGitHubLogin}
            src="/oauthIcons/github.svg"
            alt="GitHub auth"
            width={36}
            height={36}
            className="cursor-pointer"
          />
        </div>
      </div>
      <Registration />
    </>
  )
}

export default Page
