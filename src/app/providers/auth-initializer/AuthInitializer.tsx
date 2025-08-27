'use client'
import { useMeQuery } from '@/shared/api'
import LinearProgress from '@/shared/ui/base/Liner/LinearProgress'
import { useEffect, useState } from 'react'
export function AuthInitializer({ children }: { children: React.ReactNode }) {
  // const token = getCookie('accessToken')
  const { data, isLoading, isSuccess } = useMeQuery()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (isLoading) return
    if (isSuccess) setIsInitialized(true)
    else setIsInitialized(true)
  }, [isLoading, isSuccess, data])
  if (!isInitialized) return <LinearProgress />
  return <>{children}</>
}
