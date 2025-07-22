'use client'
import { Button, Flex } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
export default function Page() {
  const router = useRouter()
  const redirectHandler = (kan: string) => router.push(`/development/${kan}`)
  return (
    <Flex gap={'2'} p={'5'}>
      <Button children={'kan-15 tabs'} onClick={() => redirectHandler('kan-15')} />
      <Button children={'kan-20 pagination'} onClick={() => redirectHandler('kan-20')} />
      <Button children={'kan-23 typography'} onClick={() => redirectHandler('kan-23')} />
    </Flex>
  )
}

// export default Page
