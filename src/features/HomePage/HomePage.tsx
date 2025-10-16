'use client'
import { RegistrationUsers } from './registrationUsers'
import { PublicPosts } from './PublicPosts/PublicPosts'

export const HomePage = ({ count }: { count: string }) => {
  return (
    <div className={'max-w-[972px] mx-auto'}>
      {/* {status === 'loading' && <LinearProgress />} */}
      <RegistrationUsers count={count} />
      <div className="grid grid-cols-4 gap-4 w-full">
        <PublicPosts />
      </div>
    </div>
  )
}
