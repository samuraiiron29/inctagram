'use client'

import { useConfirmMutation } from '@/shared/api/authApi'
import { PATH } from '@/shared/lib/path/path'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { RegistrationConfirmation } from '../sign-up/Registation/ui/RegistrationConfirmation'

const Page = () => {
  const [confirm] = useConfirmMutation()
  const [isInitialized, setIsInitialized] = useState(false)
  const searchParams = useSearchParams()
  const route = useRouter()
  const code = searchParams.get('code')
  useEffect(() => {
    if (!code) {
      route.push(PATH.AUTH.LOGIN)
    } else {
      confirm({ confirmationCode: code })
      setIsInitialized(true)
    }
  }, [])

  if (!isInitialized) return <div>load</div>

  return (
    <>
      <RegistrationConfirmation />
    </>
  )
}

export default Page
