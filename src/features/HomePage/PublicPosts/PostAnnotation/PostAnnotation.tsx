import { UserHeader } from '@/entities'
import type { Post } from '@/shared/lib/types'
import { formatTimeAgo } from '@/shared/lib/utils'
type Props = {
  post: Post
}
export const PostAnnotation = ({ post }: Props) => {
  return (
    <div className={'mt-[15px]'}>
      <UserHeader imageUrl={post.avatarOwner} firstName={post.owner.firstName} />
      <div className="text-small_text text-light-900 px-2 mt-[12px] mb-[3px] ">{formatTimeAgo(post.createdAt)}</div>
      <p className="text-regular_text14 px-2 mt-1 truncate">{post.description}</p>
    </div>
  )
}
