'use client'
import { Button } from '@/shared/ui/base/Button/Button'
import Image from 'next/image'
import { Button as RadixButton, Flex } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import { Toaster } from '@/shared/ui/base/Alert/Alert'
import { toast } from 'react-hot-toast'
export default function Page() {
  const router = useRouter()
  const hello = () => toast('Привет!')
  const success = () => toast.success('success!')
  const danger = () => toast.error('error!')
  return (
    <Flex p={'3'} direction={'column'} gap={'5'}>
      <RadixButton onClick={() => router.back()}>Назад</RadixButton>

      <Flex className="bg-dark-500" justify={'center'} align={'center'} gap={'5'} m={'5'} height={'200px'}>
        <RadixButton onClick={hello} color="bronze" children={'hello'} />
        <RadixButton onClick={success} color="green" children={'success'} />
        <RadixButton onClick={danger} color="red" children={'danger'} />
      </Flex>
    </Flex>
  )
}
