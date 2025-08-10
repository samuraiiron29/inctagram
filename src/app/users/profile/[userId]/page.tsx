import type { PublicProfile } from '@/shared/api'
import { notFound } from 'next/navigation'

type Params = { userId: string }

const UserPage = async ({ params }: { params: Promise<Params> }) => {
  try {
    const { userId } = await params
    const res = await fetch(`https://inctagram.work/api/v1/public-user/profile/${userId}`)
    const profile: PublicProfile = await res.json()

    if (!res.ok) {
      notFound()
    }

    if (!profile || !profile.userMetadata) {
      notFound()
    }

    return <>ffdsfsd</>
  } catch (error) {
    console.log(error)
  }
}

export default UserPage
