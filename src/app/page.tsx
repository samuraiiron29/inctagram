import { HomePage } from '@/shared/ui/HomePage/HomePage'

export default async function Home() {
  try {
    const usersResponse = await fetch('https://inctagram.work/api/v1/public-user')
    const usersCount = await usersResponse.json()

    return <HomePage count={usersCount.totalCount} />
  } catch (error) {
    console.error(error)
  }
}

// new day new test up docker 2 3 4
