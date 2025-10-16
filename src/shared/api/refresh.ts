import { BASE_URL } from "@/shared/const"

export async function refreshTokens() {
  const res = await fetch(`${BASE_URL}/auth/update-tokens`, {
    method: "POST",
    credentials: "include",
  })

  if (!res.ok) {
    console.log('ошибка обновления токена')
  }

  return res.json() as Promise<{ accessToken: string }>
}
