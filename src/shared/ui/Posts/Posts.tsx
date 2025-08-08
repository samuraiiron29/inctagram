'use client'
import { useGetPostsByUserIdQuery } from '@/shared/api'
import { PostItem } from './PostItem/PostItem'

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
  return <>{posts}</>
}
