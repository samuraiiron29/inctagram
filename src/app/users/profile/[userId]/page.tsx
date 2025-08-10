import type { PublicProfile } from '@/shared/api'
import { UserProfile } from '@/shared/ui/UserProfile/userProfile'

type Params = { userId: string }

const UserPage = async ({ params }: { params: Promise<Params> }) => {
  const { userId } = await params
  const res = await fetch(`https://inctagram.work/api/v1/public-user/profile/${userId}`)
  const profile: PublicProfile = await res.json()

  return <UserProfile profile={profile} />
}

export default UserPage
