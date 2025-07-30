'use client'

import Image from 'next/image'

const Page = () => {
  const handleGitHubLogin = () => {
    const redirectUrl = 'http://localhost:3000/auth/github'
    // const loginUrl = `https://inctagram.work/api/v1/auth/github/login?redirect_url=${redirectUrl}`
    const loginUrl = `${process.env.NEXT_PUBLIC_BASE_URL}auth/github/login?redirect_url=${redirectUrl}`
    window.location.href = loginUrl
  }

  return (
    <div className={'flex flex-col items-center my-[20px] '}>
      <div>Sign Up</div>
      <div className={'flex flex-col items-center bg-accent-100 rounded py-[16px]'}>
        <p>Sign Up using GitHub</p>
        <Image
          onClick={handleGitHubLogin}
          src="/oauthIcons/github.svg"
          alt="GitHub auth"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      </div>
    </div>
  )
}

export default Page
