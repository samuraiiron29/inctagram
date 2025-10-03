import { BASE_URL } from '@/shared/const'
import type { Me } from '@/shared/lib/types'
import { selectAccessToken } from '@/store/slices/authSlice'
import { useSelector } from 'react-redux'

export const getServerMe = async (): Promise<Me | null> => {
  const token = useSelector(selectAccessToken)
  console.log('getServerMe', token)
  if (!token) return null
  try {
    const res = await fetch(`${BASE_URL}auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    })
    if (!res.ok) return null
    const me = (await res.json()) as Partial<Me> | null
    if (!me || typeof me.userId !== 'number') return null
    return me as Me
  } catch {
    return null
  }
}
