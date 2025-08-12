'use client'


import Posts from '@/entities/posts/ui/Posts'
import type { PublicProfile } from '@/shared/lib/types'

type Props = {
  profile: PublicProfile
}
const UserProfile = (props: Props) => {
  return (
    <>
      Name
      <Posts userId={props.profile.id} />
    </>
  )
}

export default UserProfile
