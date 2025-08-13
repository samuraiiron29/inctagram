'use client'
import { useGetPostsByUserIdQuery } from '@/shared/api'
import { Flex } from '@radix-ui/themes'
import PostItem from '@/entities/posts/ui/PostItem/PostItem'

type Props = {
  userId: number
}
const Posts = (props: Props) => {
  const { data } = useGetPostsByUserIdQuery({
    userId: props.userId,
    endCursorPostId: undefined,
    pageSize: 8,
    sortBy: 'createdAt',
    sortDirection: 'desc',
  })
  const posts = data?.items.map(post => <PostItem post={post} key={post.id} />)
  return (
    <Flex gap={'4'} m={'5'} ml={'18'} wrap={'wrap'}>
      {posts}
    </Flex>
  )
}

export default Posts
