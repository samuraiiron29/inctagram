'use client'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

type Props = {
  files: (File | null)[]
  desc: string
  setDesc: (v: string) => void
  onEditAt: (i: number) => void
  descLimit: number
}

export function PreviewPanel({ files, desc, setDesc, onEditAt, descLimit }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-3">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={12}
          slidesPerView={1}
          className="rounded border border-white/10 h-full"
        >
          {files.map((f, i) => (
            <SwiperSlide key={i} className="h-full">
              <div className="relative w-full bg-transparent rounded overflow-hidden" style={{ aspectRatio: 1 }}>
                {f ? (
                  <>
                    <img src={URL.createObjectURL(f)} alt={`preview-${i + 1}`} className="inset-0 h-full w-full object-cover" />
                    <button className="absolute bottom-2 right-2 rounded bg-black/60 px-2 py-1 text-xs" onClick={() => onEditAt(i)}>
                      Edit
                    </button>
                  </>
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">No data</div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Image src="/avatar-placeholder.png" alt="avatar" width={32} height={32} className="rounded-full bg-white/10" />
          <div className="text-sm font-medium">URLProfile</div>
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-300">Add publication descriptions</label>
          <div className="relative">
            <textarea
              value={desc}
              onChange={e => setDesc(e.target.value.slice(0, descLimit))}
              placeholder="Text-area"
              className="h-36 w-full resize-none rounded-md border border-white/10 bg-dark-100 p-3 outline-none"
            />
            <div className="absolute bottom-2 right-3 text-xs text-gray-400">
              {desc.length}/{descLimit}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
