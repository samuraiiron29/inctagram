'use client'

import { useMeQuery } from '@/shared/api/authApi'
import { useRouter } from 'next/navigation'
import { PATH } from '@/shared/lib/path/path'
import { useEffect } from 'react'

type Props = {}

const Profile = (props: Props) => {
  const { data } = useMeQuery()
  const router = useRouter()

  useEffect(() => {
    if (data?.userId) {
      router.push(PATH.USERS.PROFILE_USERID(data.userId))
    } else {
      router.push(PATH.HOME)
    }
  }, [data, router])

  return <>Profile</>
}

export default Profile
