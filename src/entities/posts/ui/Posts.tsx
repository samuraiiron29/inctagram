'use client'
import { useGetPostsByUserIdQuery } from '@/shared/api'
import { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { SWIPER_MODULES } from '@/shared/const/temp-hardcode'
import { PostImage } from '@/features/HomePage/PublicPosts/PostImage/PostImage'
import { CurrentPostModal } from '@/entities/CurrentPost'
import { useRouter, useSearchParams } from 'next/navigation'

type Props = {
  userId: number
  offset: number
  setHasMoreHandler: (el: boolean) => void
}

const PORTION_OF_ITEMS = 4

const Posts = ({ offset, userId, setHasMoreHandler }: Props) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const postIdInQuery = searchParams.get('postId')

  const { data } = useGetPostsByUserIdQuery({
    userId,
    endCursorPostId: undefined,
    pageSize: PORTION_OF_ITEMS + offset,
    sortBy: 'createdAt',
    sortDirection: 'desc',
  })

  useEffect(() => {
    if (data) setHasMoreHandler(offset <= data.totalCount)
  }, [offset, data, setHasMoreHandler])

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

  const currentPost = postIdInQuery
    ? data?.items.find(p => String(p.id) === postIdInQuery)
    : null

  return (
    <>
      {currentPost && (
        <CurrentPostModal
          post={currentPost}
          open={true}
          modalTitle={'test'}
          onClose={closePost}
          editPostHeader={true}
          images={1}
        />
      )}

      <div className="grid grid-cols-4 gap-4">
        {data?.items.map((post) => (
          <div
            key={post.id}
            className="rounded overflow-hidden cursor-pointer"
            onClick={() => openPost(post.id)}
          >
            {post.images.length > 1 ? (
              <Swiper modules={SWIPER_MODULES} navigation pagination={{ clickable: true }}>
                {post.images.map(image => (
                  <SwiperSlide key={image.url}>
                    <PostImage url={image.url} />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <PostImage url={post.images[0]?.url} />
            )}
          </div>
        ))}
      </div>
    </>
  )
}

export default Posts
