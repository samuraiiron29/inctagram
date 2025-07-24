'use client'
import { Button } from '@/shared/ui/base/Button/Button'
import Image from 'next/image'
import { Button as RadixButton, Flex } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
export default function Page() {
  return (
    <Flex p={'3'} direction={'column'} gap={'5'}>
      <Flex p={'5'} align={'center'} justify={'center'} gap={'5'} direction={'column'} className="bg-dark-500">
        <Button variant="primary">Button</Button>
        <Button variant="secondary">Button</Button>
        <Button variant="outlined">Button</Button>
        <Button variant="textButton">Button</Button>
        <Button variant="variant21">
          <Flex gap={'1'}>
            <Image src="/flag.svg" alt="flag" width={24} height={24} />
            Button
          </Flex>
        </Button>
      </Flex>
    </Flex>
  )
}
