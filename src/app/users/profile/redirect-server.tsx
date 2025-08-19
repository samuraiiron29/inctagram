import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic' // чтобы Next не SSG-шил

export default async function RedirectServer() {
  const token = (await cookies()).get('accessToken')?.value
  if (!token) redirect('/auth/sign-in')

  // Узнаём userId
  const res = await fetch('https://inctagram.work/api/v1/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })
  if (!res.ok) redirect('/auth/sign-in')

  const { userId } = (await res.json()) as { userId?: string }
  if (!userId) redirect('/auth/sign-in')

  redirect(`/users/profile/${userId}`)

  return null // чтоб не ругался TS
}
