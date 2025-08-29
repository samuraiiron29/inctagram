import { HomePage } from '@/features/HomePage'
import { BASE_URL } from '@/shared/const'

export default async function Home() {

  try {
    const usersResponse = await fetch(`${BASE_URL}public-user`)
    const usersCount = await usersResponse.json()
    return <HomePage count={usersCount.totalCount} />
  } catch (error) {
    // console.error(error)
  }
}

