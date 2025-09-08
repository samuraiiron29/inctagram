import { QUANTITY_OF_PUBLIC_POSTS } from '@/shared/const/temp-hardcode'

export const IsLoading = () => {
  return (
    <div className="flex gap-6 py-2">
      {Array.from({ length: QUANTITY_OF_PUBLIC_POSTS }).map((_, i) => (
        <div key={i} className={'flex flex-col gap-[10px]'}>
          <div className="flex-shrink-0 w-[240px] h-[240px] bg-dark-500 animate-pulse" />
          <div className={'flex gap-[12px]'}>
            <div className="flex-shrink-0 w-[36px] h-[36px] rounded-full bg-dark-500 animate-pulse" />
            <div className="flex-shrink-0 w-[132px] h-[24px] bg-dark-500 animate-pulse" />
          </div>
          <div className="flex-shrink-0 w-[240px] h-[16px] bg-dark-500 animate-pulse" />
        </div>
      ))}
    </div>
  )
}
