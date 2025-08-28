'use client'
import { oauth } from '@/shared/lib/utils/oauth'
import Image from 'next/image'
type Props = {}
export const Oauth = (props: Props) => {
  const handleOauthGithub = () => oauth()
  return (
    <div className="flex items-center gap-16 mt-[13px] mb-[24px]">
      <Image src="/git_logo.svg" alt="GitHub auth" width={36} height={36} className="cursor-pointer" onClick={handleOauthGithub} />
      <Image src="/google.svg" alt="Google auth" width={36} height={36} className="cursor-pointer" onClick={handleOauthGithub} />
    </div>
  )
}
