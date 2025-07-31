'use client'

import { useGetPublicPostsQuery } from '@/shared/api/postsApi'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import Link from 'next/link'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { UserHeader } from '@/shared/ui/UserHeader/UserHeader'
import { formatTimeAgo } from '@/shared/lib/utils/formatTimeAgo'
import Image from 'next/image'

type Props = {
  count: string
}
export const HomePage = ({ count }: Props) => {
  const { data: postsData } = useGetPublicPostsQuery(4)


  const totalCount = count.toString().padStart(6, '0')

  return (
    <div className={'max-w-[972px] mx-auto my-[24px]'}>
      <div className={'flex items-center justify-between h-[72px] mb-[36px] py-0 px-[24px] border border-dark-100 bg-dark-500'}>
        <h1 className={'text-h2'}>Registered users:</h1>
        <div className={'flex items-center space-x-1 bg-black p-[12px] rounded border border-dark-100'}>
          {totalCount?.split('').flatMap((digit, index, array) => [
            <span key={`digit-${index}`} className={'text-h2 px-[5px]'}>
              {digit}
            </span>,
            index < array.length - 1 && <span key={`separator-${index}`} className={'w-[1px] h-[30px] bg-dark-100'} />,
          ])}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 w-full">
        {postsData?.items.map(post => (
          <div key={post.id} className="rounded overflow-hidden w-[240px] h-[390px]">
            {post.images.length > 1 ? (
              <Swiper modules={[Navigation, Pagination]} navigation pagination={{ clickable: true }}>
                {post.images.map(image => (
                  <SwiperSlide key={image.url}>
                    <Link href="">
                      <img className="w-[240px] h-[240px] object-cover" src={image.url} alt="post photo" />
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <Link href="">
                <Image width={240} height={240} className="object-cover" src={post.images[0]?.url} alt="post photo" />
              </Link>
            )}
            <div className={'mt-[15px]'}>
              <UserHeader imageUrl={post.avatarOwner} />
              <div className="text-xs text-dark-100 px-2 mt-[12px] mb-[3px] text-[12px]">{formatTimeAgo(post.createdAt)}</div>
              <p className="text-sm text-white px-2 mt-1 truncate">{post.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
