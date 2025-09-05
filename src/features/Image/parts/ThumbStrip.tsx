'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/free-mode'

type Props = {
  sources: string[]
  current: number
  onAddClick: () => void
  onSelect: (i: number) => void
  onRemove: (i: number) => void
}

export function ThumbStrip({ sources, current, onAddClick, onSelect, onRemove }: Props) {
  return (
    <div className="relative">
      <Swiper modules={[FreeMode]} freeMode watchSlidesProgress slidesPerView="auto" spaceBetween={8} className="rounded bg-black/30 p-2">
        <SwiperSlide style={{ width: 76 }}>
          <button
            onClick={onAddClick}
            className="flex h-16 w-[68px] items-center justify-center rounded border border-white/20 bg-black/40 text-2xl"
            aria-label="Add more"
          >
            +
          </button>
        </SwiperSlide>

        {sources.map((src, i) => (
          <SwiperSlide key={i} style={{ width: 100 }}>
            <div
              className={`relative h-16 w-[92px] overflow-hidden rounded border ${i === current ? 'border-primary-400' : 'border-white/20'}`}
            >
              <img src={src} alt={`thumb-${i + 1}`} className="h-full w-full object-cover" />
              <button onClick={() => onSelect(i)} className="absolute inset-0" aria-label={`Select ${i + 1}`} />
              <button
                onClick={e => {
                  e.stopPropagation()
                  onRemove(i)
                }}
                className="absolute right-1 top-1 rounded bg-black/60 px-1 text-xs"
                aria-label="Remove"
              >
                ✕
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
