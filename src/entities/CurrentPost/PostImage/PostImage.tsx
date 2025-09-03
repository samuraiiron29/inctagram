import { useState } from 'react'
import Image from 'next/image'
import { Skeleton } from '@radix-ui/themes'

export const PostImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="relative w-full h-full">
      {isLoading && <Skeleton className="absolute inset-0 w-full h-full" />}
      <Image src={src} alt={alt} fill className={className} onLoadingComplete={() => setIsLoading(false)} />
    </div>
  )
}
