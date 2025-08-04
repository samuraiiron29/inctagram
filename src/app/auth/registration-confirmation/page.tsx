'use client'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import Image from 'next/image'
import { useConfirmMutation } from '@/shared/api'
import { PATH } from '@/shared/lib/path'

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
        .unwrap()
        .then(() => setIsInitialized(true))
        .catch(() => {
          // need pouter.push()
        })


    }
  }, [])

  if (!isInitialized) return <div>load</div>

  return (
    <div className={'flex justify-center flex-col items-center'}>
      <h1>Congratulations!</h1>
      <h3>Your email has been confirmed</h3>
      <Link href={PATH.AUTH.LOGIN}>
        <Button children={'Sign In'} />
      </Link>
      <Image src="/bro.png" alt="bro" width={432} height={300} />
    </div>
  )
}

export default Page
