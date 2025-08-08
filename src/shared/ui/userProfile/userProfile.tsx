'use client'

import { type PublicProfile } from '@/shared/api'
import { Posts } from '../Posts/Posts'

type Props = {
  profile: PublicProfile
}
export const UserProfile = (props: Props) => {
  return (
    <>
      <>Name</>
      <Posts userId={props.profile.id} />
      <>Footer</>
    </>
  )
}
