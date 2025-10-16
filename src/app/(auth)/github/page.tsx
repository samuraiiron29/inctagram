'use client'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { PATH } from '@/shared/lib/path/path'
import { setCookie } from '@/shared/lib/utils/cookieUtils'
import { useAppDispatch } from '@/shared/lib/hooks'
import { setAccessToken } from '@/store/slices/authSlice'

export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const dispatch = useAppDispatch()

  useEffect(() => {
    const accessToken = searchParams.get('accessToken')
    if (accessToken) {
      dispatch(setAccessToken(accessToken))
      setCookie('isGitHub', 'true', 7)
      router.push('/')
    } else router.push(PATH.LOGIN)
  }, [])
  return <div className={'flex justify-center items-center'}>...Load</div>
}
