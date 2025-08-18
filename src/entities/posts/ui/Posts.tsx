'use client'
import { useGetPostsByUserIdQuery } from '@/shared/api'
import { Flex } from '@radix-ui/themes'
import PostItem from '@/entities/posts/ui/PostItem/PostItem'
import { Dispatch, SetStateAction, useEffect } from 'react'

type Props = {
  userId: number
  page: number
  setHasMore: Dispatch<SetStateAction<boolean>>
}

const Posts = (props: Props) => {
  const { data } = useGetPostsByUserIdQuery({
    userId: props.userId,
    endCursorPostId: undefined,
    pageSize: props.page, // !!!
    sortBy: 'createdAt',
    sortDirection: 'desc',
  })

  useEffect(() => {
  if (data) {
    if (data.totalCount / props.page <= 1) {
      props.setHasMore(false)
    }
  }
}, [data, props.page, props.setHasMore])

  const posts = data?.items.map(post => <PostItem post={post} key={post.id} />)
  return (
    <div className='grid grid-cols-4 gap-4'>
      {posts}
    </div>
  )
}

export default Posts
