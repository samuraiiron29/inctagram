'use client'

import { useMeQuery } from '@/shared/api'
import { useAppDispatch } from '@/shared/lib/hooks'
import { getCookie } from '@/shared/lib/utils'
import LinearProgress from '@/shared/ui/base/Liner/LinearProgress'
import { setIsLoggedIn } from '@/store/slices/appSlice'
import { skipToken } from '@reduxjs/toolkit/query'
import { useState, useEffect } from 'react'

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const token = getCookie('accessToken')
  const { data, isLoading, isError, isSuccess } = useMeQuery(token ? undefined : skipToken)
  const dispatch = useAppDispatch()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (isLoading) return
    if (isSuccess && data?.email) dispatch(setIsLoggedIn(true))
    else if (isError) dispatch(setIsLoggedIn(false))
    setIsInitialized(true)
  }, [isLoading, isSuccess, isError, data])

  if (!isInitialized) {
    return <LinearProgress />
  }

  return <>{children}</>
}
