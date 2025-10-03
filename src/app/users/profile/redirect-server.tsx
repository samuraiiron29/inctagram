import { PATH } from '@/shared/lib/path'
import { redirect } from 'next/navigation'
import { getServerMe } from '@/shared/api/server/getServerMe'

export const dynamic = 'force-dynamic' // чтобы Next не SSG-шил

export default async function RedirectServer() {
  const me = await getServerMe()
  if (!me) redirect(PATH.LOGIN)
  redirect(PATH.USERS.PROFILE_USERID(me.userId))
  return null
}
