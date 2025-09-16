import { BASE_URL } from '@/shared/const'
import type { Me } from '@/shared/lib/types'
import { cookies } from 'next/headers'
export const getServerMe = async (): Promise<Me | null> => {
  console.log('временный консоль лог для ми запроса, ищем багу куки аксес токена')
  const token = (await cookies()).get('accessToken')?.value
  if (!token) return null
  try {
    const res = await fetch(`${BASE_URL}auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    })
    if (!res.ok) {
      console.log('здесь будет сидеть ошибка куки, если не найдется, удалить консоль лог !res.ok', res)
      return null
    }
    const me = (await res.json()) as Partial<Me> | null
    if (!me || typeof me.userId !== 'number') return null
    return me as Me
  } catch {
    return null
  }
}
