'use client'
import { useGetPostsByUserIdQuery } from '@/shared/api'
import PostItem from '@/entities/posts/ui/PostItem/PostItem'
import { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { SWIPER_MODULES } from '@/shared/const/temp-hardcode'
import { PostImage } from '@/features/HomePage/PublicPosts/PostImage/PostImage'
import { PostAnnotation } from '@/features/HomePage/PublicPosts/PostAnnotation/PostAnnotation'

type Props = {
  userId: number
  offset: number
  setHasMoreHandler: (el: boolean) => void
}

const PORTION_OF_ITEMS = 4

const Posts = ({offset, userId, setHasMoreHandler}: Props) => {
  const { data } = useGetPostsByUserIdQuery({
    userId: userId,
    endCursorPostId: undefined,
    pageSize: PORTION_OF_ITEMS + offset, // !!!
    sortBy: 'createdAt',
    sortDirection: 'desc',
  })

  useEffect(()=>{
    if (data) {
      setHasMoreHandler(offset <= data.totalCount)
    } 
  },[offset])

  const posts = data?.items.map(post => <PostItem post={post} key={post.id} />)
  return (
    <div className='grid grid-cols-4 gap-4'>
      {data?.items.map(post => (
        <div key={post.id} className="rounded overflow-hidden">
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
          {/* <PostAnnotation post={post} /> */}
        </div>
      ))}
    </div>
  )
}

export default Posts
