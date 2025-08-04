'use client'

import Image from 'next/image'
import { Registration } from './Registation/ui/Registration'

const Page = () => {
  const handleGitHubLogin = () => {
    const redirectUrl = 'http://localhost:3000/auth/github'
    const loginUrl = `${process.env.NEXT_PUBLIC_BASE_URL}auth/github/login?redirect_url=${redirectUrl}`
    window.location.href = loginUrl
  }
  const handleGoogleLogin = () => {
    const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID
    const GOOGLE_REDIRECT_URL = 'http://localhost:3000/auth/google'
    const url = `https://accounts.google.com/o/oauth2/v2/auth?scope=email profile&response_type=code&redirect_uri=${GOOGLE_REDIRECT_URL}&client_id=${CLIENT_ID}`
    window.location.assign(url)
  }

  return (
    <>
      <div className={'flex flex-col items-center my-[20px] '}>
        <div className={'flex flex-col gap-[5px] items-center bg-accent-100 rounded py-[16px]'}>
          <p>Sign Up using GitHub / Google</p>
          <Image
            onClick={handleGitHubLogin}
            src="/oauthIcons/github.svg"
            alt="GitHub auth"
            width={36}
            height={36}
            className="cursor-pointer"
          />
          <Image
            onClick={handleGoogleLogin}
            src="/oauthIcons/google.svg"
            alt="Google auth"
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
