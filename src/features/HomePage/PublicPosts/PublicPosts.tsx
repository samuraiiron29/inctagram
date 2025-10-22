'use client'
import { QUANTITY_OF_PUBLIC_POSTS, SWIPER_MODULES } from '@/shared/const/temp-hardcode'
import { useGetPublicPostsQuery } from '@/shared/api/'
import { Swiper, SwiperSlide } from 'swiper/react'

import { PostImage } from './PostImage/PostImage'
import { IsLoading } from './TempIsLoading/TempIsLoading'
import { IsError } from './TempIsError/TempIsError'
import { PostAnnotation } from './PostAnnotation/PostAnnotation'
import { useRef, useState } from 'react'
import { CurrentPostModal } from '@/entities/CurrentPost'
import { useRouter, useSearchParams } from 'next/navigation'

export const PublicPosts = () => {
  const [showPost, setShowPost] = useState(false)
  const currentIndex = useRef<number | null>(null)
  const { data, isLoading, isError, refetch } = useGetPublicPostsQuery(QUANTITY_OF_PUBLIC_POSTS)

  const router = useRouter()
  const searchParams = useSearchParams()
  const postIdInQuery = searchParams.get('postId')

  const openPost = (postId: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('postId', String(postId))
    router.push(`?${params.toString()}`)
  }

  const closePost = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('postId')
    const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname
    router.push(newUrl)
  }

  const currentPost = postIdInQuery ? data?.items.find(p => String(p.id) === postIdInQuery) : null

  if (isLoading) return <IsLoading />
  if (isError) return <IsError onClick={() => refetch()} />
  const items = data?.items ?? []
  if (items.length === 0) return <div className="text-sm text-dark-100 px-2">Пока нет публикаций</div>

  return (
    <>
      {currentPost && (
        <CurrentPostModal post={currentPost} open={showPost} modalTitle={'public'} onClose={closePost} editPostHeader={false} images={1} />
      )}
      {data?.items.map((post, index) => (
        <div key={post.id} className="rounded overflow-hidden w-max-[240px] w-[100%] h-[390px]">
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
            <PostImage url={post.images[0]?.url} />
          )}
          <PostAnnotation post={post} />
        </div>
      ))}
    </>
  )
}
