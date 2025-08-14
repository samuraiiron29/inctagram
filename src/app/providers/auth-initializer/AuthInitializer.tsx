'use client'

import { useMeQuery } from '@/shared/api'
import { useAppDispatch } from '@/shared/lib/hooks'
import LinearProgress from '@/shared/ui/base/Liner/LinearProgress'
import { setIsLoggedIn } from '@/store/slices/appSlice'
import { useEffect, useState } from 'react'

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const { data, isLoading, isSuccess } = useMeQuery()
  const dispatch = useAppDispatch()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (isLoading) return
    if (isSuccess) {
      setIsInitialized(true)
      dispatch(setIsLoggedIn(true))
    } else {
      setIsInitialized(true)
    }
  }, [isLoading, isSuccess, data])

  if (!isInitialized) {
    return <LinearProgress />
  }

  return <>{children}</>
}
