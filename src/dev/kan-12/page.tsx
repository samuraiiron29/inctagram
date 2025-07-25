'use client'
import { Input } from '@/shared/ui/base/Input/Input'
import { Flex } from '@radix-ui/themes'
export default function Page() {

  return (
    <Flex direction={'column'} gap={'4'}>
        <Input inputType='email' placeholder="Epam@epam.com"/>
    </Flex>
  )
}
