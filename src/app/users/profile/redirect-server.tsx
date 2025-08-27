import { PATH } from '@/shared/lib/path'
import { redirect } from 'next/navigation'
import { getServerMe } from '@/shared/api/server/getServerMe'

export const dynamic = 'force-dynamic' // чтобы Next не SSG-шил

export default async function RedirectServer() {
  const me = await getServerMe()
  console.log(me?.userId)
  if (!me) redirect(PATH.LOGIN)
  redirect(`/users/profile/${me.userId}`)
}

//  const token = (await cookies()).get('accessToken')?.value
//  if (!token) redirect(PATH.LOGIN)
//    // Узнаём userId
//   const res = await fetch('https://inctagram.work/api/v1/auth/me', {
//     headers: { Authorization: `Bearer ${token}` },
//     cache: 'no-store',
//   })
//   if (!res.ok) redirect(PATH.LOGIN)

//   const { userId } = (await res.json()) as { userId?: string }
// if (!userId) redirect(PATH.LOGIN)
//       return null // чтоб не ругался TS
// redirect(`/users/profile/${userId}`)
