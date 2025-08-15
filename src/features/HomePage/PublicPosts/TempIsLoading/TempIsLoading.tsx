import { QUANTITY_OF_PUBLIC_POSTS } from '@/shared/const/temp-hardcode'

export const IsLoading = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,240px)] gap-6">
      {Array.from({ length: QUANTITY_OF_PUBLIC_POSTS }).map((_, i) => (
        <div key={i} className="w-[240px] h-[390px] rounded bg-dark-500 animate-pulse" />
      ))}
    </div>
  )
}
