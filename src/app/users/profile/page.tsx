'use client'

import { useMeQuery } from '@/shared/api/authApi'
import { redirect } from 'next/navigation'
import { PATH } from '@/shared/lib/path/path'
import { useEffect } from 'react'

type Props = {}

const Profile = (props: Props) => {
  const { data } = useMeQuery()

  useEffect(() => {
    if (data?.userId) {
      redirect(PATH.USERS.PROFILE_USERID(data.userId))
    } else {
      redirect(PATH.HOME)
    }
  }, [data])

  return <>Profile</>
}

export default Profile
