'use client'
import { useGetPostsByUserIdQuery } from '@/shared/api'
import PostItem from '@/entities/posts/ui/PostItem/PostItem'
import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { SWIPER_MODULES } from '@/shared/const/temp-hardcode'
import { PostImage } from '@/features/HomePage/PublicPosts/PostImage/PostImage'
import { PostAnnotation } from '@/features/HomePage/PublicPosts/PostAnnotation/PostAnnotation'
import { CurrentPostModal } from '@/entities/CurrentPost'

type Props = {
  userId: number
  offset: number
  setHasMoreHandler: (el: boolean) => void
}

const PORTION_OF_ITEMS = 4

const Posts = ({ offset, userId, setHasMoreHandler }: Props) => {
  const [showPost, setShowPost] = useState(false)
  const currentIndex = useRef<number | null>(null)

  const { data } = useGetPostsByUserIdQuery({
    userId,
    endCursorPostId: undefined,
    pageSize: PORTION_OF_ITEMS + offset, // !!!
    sortBy: 'createdAt',
    sortDirection: 'desc',
  })

  useEffect(() => {
    if (data) setHasMoreHandler(offset <= data.totalCount)
  }, [offset])

  // const posts = data?.items.map(post => <PostItem post={post} key={post.id} />)

  return (
    <>
      {showPost && currentIndex.current !== null && (
        <CurrentPostModal
          post={data!.items[currentIndex.current]}
          open={showPost}
          modalTitle={'test'}
          onClose={() => setShowPost(false)}
          editPostHeader={true}
          images={1}
        />
      )}
      <div className="grid grid-cols-4 gap-4">
        {data?.items.map((post, index) => (
          <div key={post.id} className="rounded overflow-hidden">
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
            {/* <PostAnnotation post={post} /> */}
          </div>
        ))}
      </div>
    </>
  )
}

export default Posts
