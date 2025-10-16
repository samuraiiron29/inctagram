import { CurrentPostModal } from '@/entities/CurrentPost'
import { BASE_URL } from '@/shared/const'

type Params = { postId: string }

export default async function PostPage({ params }: { params: any }) {
  const { postId } = params

  try {
    const res = await fetch(`${BASE_URL}/api/v1/posts/${postId}`, { cache: 'no-store' })

    console.log(res)
    if (!res.ok) {
      throw new Error('Пост не найден')
    }

    const post = await res.json()

    return (
      <div className="flex justify-center items-center min-h-screen bg-black/70">
        <CurrentPostModal
          post={post}
          open={true}
          modalTitle={post.title}
          onClose={() => {}}
          editPostHeader={false}
          images={post.images?.length || 0}
        />
      </div>
    )

  } catch (e) {
    console.log(e)
    return <div>Ошибка при загрузке поста</div>
  }
}
