'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import Link from 'next/link'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { UserHeader } from '@/shared/ui/UserHeader/UserHeader'
import { formatTimeAgo } from '@/shared/lib/utils/formatTimeAgo'
import Image from 'next/image'
import { RegistrationUsers } from '@/shared/ui/HomePage/registrationUsers'
import { Button } from '@radix-ui/themes'
import { useDeleteUserProfileMutation, useGetPublicPostsQuery } from '@/shared/api'

type Props = {
  count: string
}

export const HomePage = ({ count }: Props) => {
  const { data: postsData } = useGetPublicPostsQuery(4)
  const [deleteUser] = useDeleteUserProfileMutation()

  const deleteUsers = async () => {
    try {
      await deleteUser({ id: 3053 }).unwrap()
    } catch (error) {
      console.log('Delete error', error)
    }
  }

  return (
    <div className={'max-w-[972px] mx-auto my-[24px]'}>
      <RegistrationUsers count={count} />
      <Button onClick={deleteUsers} children={'Delete Me'} />
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
              <UserHeader imageUrl={post.avatarOwner} firstName={post.owner.firstName} />
              <div className="text-xs text-dark-100 px-2 mt-[12px] mb-[3px] text-[12px]">{formatTimeAgo(post.createdAt)}</div>
              <p className="text-sm text-white px-2 mt-1 truncate">{post.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
