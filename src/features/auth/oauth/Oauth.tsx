'use client'
import { BASE_URL, OAUTH_URL } from '@/shared/const'
import Image from 'next/image'

export const Oauth = () => {
  const handleOauthGithub = () => {
    const redirectUrl = encodeURIComponent(`${OAUTH_URL}github`)
    const url = `${BASE_URL}auth/github/login?redirect_url=${redirectUrl}`
    window.location.assign(url)
  }

  return (
    <div className="flex items-center gap-16 mt-[13px] mb-[24px]">
      <Image src="/git_logo.svg" alt="GitHub auth" width={36} height={36} className="cursor-pointer" onClick={handleOauthGithub} />
      <Image src="/google.svg" alt="Google auth" width={36} height={36} className="cursor-pointer" onClick={handleOauthGithub} />
    </div>
  )
}
