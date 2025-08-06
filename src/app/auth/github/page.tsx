'use client'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { setIsLoggedIn } from '@/store/slices/appSlice'
import { setCookie } from '@/shared/lib/utils/cookieUtils.client'
import { PATH } from '@/shared/lib/path/path'
import { useAppDispatch } from '@/shared/lib/hooks'

export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const dispatch = useAppDispatch()
  useEffect(() => {
    const accessToken = searchParams.get('accessToken')
    const email = searchParams.get('email')
    if (accessToken && email) {
      setCookie('accessToken', accessToken, 7)
      dispatch(setIsLoggedIn(true))
      router.push('/')
      setCookie('isGitHub', 'true', 7)
    } else {
      router.push(PATH.AUTH.LOGIN)
    }
  }, [])

  return <div className={'flex justify-center items-center'}>Закуска</div>
}
