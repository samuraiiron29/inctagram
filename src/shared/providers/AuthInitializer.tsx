'use client'

import { useEffect, useState } from 'react'
import { useMeQuery } from '@/shared/api/authApi'
import { useAppDispatch } from '@/shared/lib/hooks/appHooks'
import { setIsLoggedIn } from '@/store/slices/appSlice'
import LinearProgress from '@/shared/ui/base/Liner/LinearProgress'
import { skipToken } from '@reduxjs/toolkit/query'
import { getCookie } from '@/shared/lib/utils/cookieUtils'

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const token = getCookie('accessToken')
  const { data, isLoading, isError, isSuccess } = useMeQuery(token ? undefined : skipToken)
  const dispatch = useAppDispatch()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (isLoading) return

    if (isSuccess && data?.email) {
      dispatch(setIsLoggedIn(true))
    } else if (isError) {
      dispatch(setIsLoggedIn(false))
    }

    setIsInitialized(true)
  }, [isLoading, isSuccess, isError, data])

  if (!isInitialized) {
    return <LinearProgress />
  }

  return <>{children}</>
}
