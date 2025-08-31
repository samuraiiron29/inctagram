'use client'

import { useMeQuery } from '@/shared/api'
import { useAppDispatch } from '@/shared/lib/hooks'
import LinearProgress from '@/shared/ui/base/Liner/LinearProgress'
import { setIsLoggedIn } from '@/store/slices/appSlice'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const { data, isLoading, isSuccess } = useMeQuery()
  const dispatch = useAppDispatch()
  const [isInitialized, setIsInitialized] = useState(false)
  const pathname = usePathname()

  const isSSRUserProfilePage = /^\/users\/profile(?:\/.*)+$/.test(pathname)

  useEffect(() => {
    if (isLoading) return
    if (isSuccess) {
      setIsInitialized(true)
      dispatch(setIsLoggedIn(true))
    } else {
      setIsInitialized(true)
    }
  }, [isLoading, isSuccess, data])

  if (!isInitialized && !isSSRUserProfilePage) {
    return <LinearProgress />
  }

  return <>{children}</>
}
