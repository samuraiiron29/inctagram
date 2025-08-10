'use client'
import { useGetPostsByUserIdQuery } from '@/shared/api'
import { PostItem } from './PostItem/PostItem'
import { Flex } from '@radix-ui/themes'

type Props = {
  userId: number
}
export const Posts = (props: Props) => {
  const { data } = useGetPostsByUserIdQuery({
    userId: props.userId,
    endCursorPostId: undefined,
    pageSize: 8,
    sortBy: 'createdAt',
    sortDirection: 'desc',
  })
  const posts = data?.items.map(post => <PostItem post={post} key={post.id} />)
  return (
    <Flex gap={'4'} m={'5'} ml={'18'}>
      {posts}
    </Flex>
  )
}
