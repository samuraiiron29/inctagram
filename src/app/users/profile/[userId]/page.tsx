// app/users/profile/[userId]/page.tsx
import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import type { Post, PublicProfile } from '@/shared/lib/types'

type PageProps = {
  params: Promise<{ userId: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function UserPage({ params, searchParams }: PageProps) {
  const { userId } = await params
  const sp = await searchParams
  const postId = Array.isArray(sp.postId) ? sp.postId?.[0] : sp.postId

  const cookieStore = await cookies()
  const token = cookieStore.get('accessToken')?.value

  const [res, postRes] = await Promise.all([
    fetch(`https://inctagram.work/api/v1/public-user/profile/${userId}`, { cache: 'no-store' }),
    postId
      ? fetch(`https://inctagram.work/api/v1/posts/id/${postId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          cache: 'no-store',
        })
      : Promise.resolve(new Response(null, { status: 204 })),
  ])

  if (!res.ok) notFound()

  const profile: PublicProfile = await res.json()
  const post: Post | null = postId && postRes.ok ? await postRes.json() : null

  if (!profile?.userMetadata) notFound()

  return <>ffdsfsd</>
}
