import type { PublicProfile } from '@/shared/lib/types'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import UserProfile from '@/entities/users/ui/UserProfile/UserProfile'
import LinearProgress from '@/shared/ui/base/Liner/LinearProgress'

type Params = { userId: string }

const UserPage = async ({ params }: { params: Promise<Params> }) => {
  try {
    const { userId } = await params
    const res = await fetch(`https://inctagram.work/api/v1/public-user/profile/${userId}`)
    const profile: PublicProfile = await res.json()

    if (!res.ok || !profile || !profile.userMetadata) notFound()

    return (
      <Suspense fallback={<LinearProgress />}>
        <UserProfile profile={profile} />
      </Suspense>
    )
  } catch (error) {
    console.log(error)
  }
}
export default UserPage
