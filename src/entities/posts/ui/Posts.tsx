'use client'
import { useGetPostsByUserIdQuery } from '@/shared/api'
import { Flex } from '@radix-ui/themes'
import PostItem from '@/entities/posts/ui/PostItem/PostItem'

type Props = {
  userId: number
  page?: number
}
const Posts = (props: Props) => {
  const { data } = useGetPostsByUserIdQuery({
    userId: props.userId,
    endCursorPostId: undefined,
    pageSize: props.page, // !!!
    sortBy: 'createdAt',
    sortDirection: 'desc',
  })

  const posts = data?.items.map(post => <PostItem post={post} key={post.id} />)
  return (
    <div className='grid grid-cols-4 gap-4'>
      {posts}
    </div>
  )
}

export default Posts
