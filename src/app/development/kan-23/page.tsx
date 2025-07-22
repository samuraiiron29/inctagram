'use client'

import { Button, Flex } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
export default function Page() {
  const router = useRouter()

  return (
    <>
      <Button onClick={() => router.back()}>Назад</Button>
      <Flex gap={'5'} direction={'column'} m={'5'}>
        <Button variant="classic">TEST</Button>
        <Flex className=" " width={'150px'}>
          123
        </Flex>
        <p className="text-regular_link ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, porro perferendis doloremque, asperiores voluptates itaque alias
          sed excepturi quam ipsam suscipit, pariatur ad dicta placeat veniam? Officiis eaque animi quia.
        </p>
        <p className="text-h1  ">Обычный текст</p>
        <p className="text-bold_text14 ">Жирный текст</p>
        <p className="text-linkSmall  ">Ссылка</p>
        <p className="text-large ">Ссылка</p>
        <div className="bg-accent-700 text-regular_text14 text-danger-300">test</div>
      </Flex>
    </>
  )
}

// export default Page
