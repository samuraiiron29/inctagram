'use client'
import { useRouter } from 'next/navigation'
import { Button, Flex } from '@radix-ui/themes'

export default function Home() {
  const router = useRouter()

  return (
    <Flex direction={'column'} align={'center'} justify={'center'} className="gap-4 p-8 text-white">
      <span>Привет, я пока пустая, но есть компоненты в разработке:</span>
      <Button children={'Go to development'} onClick={() => router.push('/dev')} />
    </Flex>
  )
}
