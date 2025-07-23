'use client'
import { Button } from '@/shared/ui/base/Button/Button'

import { Button as RadixButton, Flex } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
export default function Page() {
  const router = useRouter()
  return (
    <Flex p={'3'} direction={'column'} gap={'5'}>
      <RadixButton onClick={() => router.back()}>Назад</RadixButton>

      <Flex p={'5'} align={'center'} justify={'center'} gap={'5'} direction={'column'} className="bg-dark-500">
        <Button variant="primary">Button</Button>
        <Button variant="secondary">Button</Button>
        <Button variant="outlined">Button</Button>
        <Button variant="textButton">Button</Button>
        <Button variant="variant21">Button</Button>
      </Flex>
    </Flex>
  )
}
