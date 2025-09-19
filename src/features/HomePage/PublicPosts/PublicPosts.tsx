'use client'
import { QUANTITY_OF_PUBLIC_POSTS, SWIPER_MODULES } from '@/shared/const/temp-hardcode'
import { useGetPostByIdQuery, useGetPublicPostsQuery, useLazyGetPostByIdQuery } from '@/shared/api/'
import { Swiper, SwiperSlide } from 'swiper/react'

import { PostImage } from './PostImage/PostImage'
import { IsLoading } from './TempIsLoading/TempIsLoading'
import { IsError } from './TempIsError/TempIsError'
import { PostAnnotation } from './PostAnnotation/PostAnnotation'
import { useRef, useState } from 'react'
import { CurrentPostModal } from '@/entities/CurrentPost'

export const PublicPosts = () => {
  const [showPost, setShowPost] = useState(false)
  const currentIndex = useRef<number | null>(null)
  const { data, isLoading, isError, refetch } = useGetPublicPostsQuery(QUANTITY_OF_PUBLIC_POSTS)

  if (isLoading) return <IsLoading />
  if (isError) return <IsError onClick={() => refetch()} />
  const items = data?.items ?? []
  if (items.length === 0) return <div className="text-sm text-dark-100 px-2">Пока нет публикаций</div>
  return (
    <>
      {showPost && currentIndex.current !== null && (
        <CurrentPostModal
          post={data!.items[currentIndex.current]}
          open={showPost}
          modalTitle={'public'}
          onClose={() => setShowPost(false)}
          editPostHeader={false}
          images={1}
        />
      )}
      {data?.items.map((post, index) => (
        <div key={post.id} className="rounded overflow-hidden w-[240px] h-[390px]">
          {post.images.length > 1 ? (
            <Swiper modules={SWIPER_MODULES} navigation pagination={{ clickable: true }}>
              {post.images.map(image => (
                <SwiperSlide
                  key={image.url}
                  onClick={() => {
                    setShowPost(true)
                    currentIndex.current = index
                  }}
                >
                  <PostImage url={image.url} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div
              onClick={() => {
                setShowPost(true)
                currentIndex.current = index
              }}
            >
              <PostImage url={post.images[0]?.url} />
            </div>
          )}
          <PostAnnotation post={post} />
        </div>
      ))}
    </>
  )
}
