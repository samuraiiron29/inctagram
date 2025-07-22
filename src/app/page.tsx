'use client'
import { redirect, useRouter } from 'next/navigation'

import { Button, Flex } from '@radix-ui/themes'

export default function Home() {
  // redirect('/auth/sign-in');
  const router = useRouter()
  return (
    <Flex direction={'column'} align={'center'} justify={'center'}>
      Привет, я пока пустая, но есть компоненты в разработке:
      <Button children={'go to development'} onClick={() => router.push('/development/')} />
    </Flex>
  )
}
