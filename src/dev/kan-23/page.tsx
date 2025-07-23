'use client'
import { Button } from '@radix-ui/themes'

export default function Page() {
  return (
    <div>
      <Button variant="outline" color="blue">
        TEST
      </Button>

      <p className="text-h1 ">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, porro perferendis doloremque, asperiores voluptates itaque alias sed
        excepturi quam ipsam suscipit, pariatur ad dicta placeat veniam? Officiis eaque animi quia.
      </p>
      <p className="text-regular16">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, porro perferendis doloremque, asperiores voluptates itaque alias sed
        excepturi quam ipsam suscipit, pariatur ad dicta placeat veniam? Officiis eaque animi quia.
      </p>
      <p className="text-linkSmall text-amber-400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, porro perferendis doloremque, asperiores voluptates itaque alias sed
        excepturi quam ipsam suscipit, pariatur ad dicta placeat veniam? Officiis eaque animi quia.
      </p>
      <p className="text-h1  ">Обычный текст</p>
      <p className="text-bold_text14 ">Жирный текст</p>
      <p className="text-linkSmall  ">Ссылка</p>
    </div>
  )
}

// export default Page
