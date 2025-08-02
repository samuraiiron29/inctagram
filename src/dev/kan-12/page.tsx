'use client'
import { Input } from '@/shared/ui/base/Input/Input'
import { Flex } from '@radix-ui/themes'
export default function Page() {

  return (
    <Flex direction={'column'}>
        <Input inputType='password' placeholder="Password" imageSrc={'/eye-off.svg'} width={24} height={24}/>
        <Input inputType='search' placeholder="Search..." imageSrc={'/search.svg'} width={20} height={20} left/>
    </Flex>
  )
}
