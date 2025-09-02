'use client'
import { useMeQuery } from '@/shared/api'
import LinearProgress from '@/shared/ui/base/Liner/LinearProgress'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
export function AuthInitializer({ children }: { children: React.ReactNode }) {
  // const token = getCookie('accessToken')
  const { data, isLoading, isSuccess } = useMeQuery()
  const [isInitialized, setIsInitialized] = useState(false)
  const pathname = usePathname()
  const isSSRUserProfilePage = /^\/users\/profile(?:\/.*)+$/.test(pathname)
  useEffect(() => {
    if (isLoading) return
    if (isSuccess) setIsInitialized(true)
    else setIsInitialized(true)
  }, [isLoading, isSuccess, data])
  if (!isInitialized && !isSSRUserProfilePage) {
    return <LinearProgress />
  }
  return <>{children}</>
}
