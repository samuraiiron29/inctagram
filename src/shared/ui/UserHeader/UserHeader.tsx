'use client'

import Link from 'next/link'
import Image from 'next/image'

type Props = {
  imageUrl: string
};
export const UserHeader = ({imageUrl}: Props) => {
  return (
    <div className={'flex gap-[12px] items-center'}>
      <Image
        src={imageUrl || '/avatar.svg'}
        alt="Post image"
        width={36}
        height={36}
        className={'w-[36px] h-[36px] rounded-full'}
      />
      <Link href={''} className={''}>
        URLProfiele
      </Link>
    </div>
  )
}