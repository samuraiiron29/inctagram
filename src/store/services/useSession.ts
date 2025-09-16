import { useMeQuery } from '@/shared/api'

export function useSession() {
  const { data, isLoading, isFetching, isError } = useMeQuery()
  const isLoggedIn = Boolean(data && !data.isBlocked)
  return {
    user: data,
    isLoggedIn,
    isLoading: isLoading || isFetching,
    isError,
  }
}
