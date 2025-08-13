'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Cropper, { type ReactCropperElement } from 'react-cropper'
import type CropperJS from 'cropperjs'
import 'cropperjs/dist/cropper.css'

import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/free-mode'

import { Button } from '@/shared/ui/base/Button/Button'
import { useCreatePostMutation, useUploadImagesForPostMutation } from '@/shared/api'
import { useAppDispatch } from '@/shared/lib/hooks'
import { setOpenCreate } from '@/store/slices/appSlice'

type Mode = 'empty' | 'crop' | 'preview'
type Props = {
  open: boolean
}

const DESC_LIMIT = 500

export default function ImageUploader({ open }: Props) {
  // refs
  const cropperRef = useRef<ReactCropperElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const addMoreInputRef = useRef<HTMLInputElement | null>(null)

  const dispatch = useAppDispatch()

  // state
  const [mode, setMode] = useState<Mode>('empty')
  const [sources, setSources] = useState<string[]>([])
  const [filters, setFilters] = useState<string[]>([])
  const [finalImages, setFinalImages] = useState<File[]>([])
  const [current, setCurrent] = useState(0)
  const [aspectRatio, setAspectRatio] = useState<number | undefined>(1)
  const [desc, setDesc] = useState('')

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const readFilesAsDataURLs = (files: FileList) =>
    Promise.all(
      Array.from(files).map(
        f =>
          new Promise<string>((res, rej) => {
            const r = new FileReader()
            r.onload = () => (typeof r.result === 'string' ? res(r.result) : rej('bad result'))
            r.onerror = rej
            r.readAsDataURL(f)
          })
      )
    )

  // initial upload
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length) return
    const dataURLs = await readFilesAsDataURLs(files)
    setSources(dataURLs)
    setFilters(Array(dataURLs.length).fill('none'))
    setFinalImages(Array(dataURLs.length).fill(null) as unknown as File[])
    setCurrent(0)
    setMode('crop')
    // заменим источник у уже смонтированного кропера
    setTimeout(() => cropperRef.current?.cropper?.replace(dataURLs[0], false), 0)
  }

  // add more (+)
  const onAddMore = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length) return
    const dataURLs = await readFilesAsDataURLs(files)
    setSources(prev => [...prev, ...dataURLs])
    setFilters(prev => [...prev, ...Array(dataURLs.length).fill('none')])
    setFinalImages(prev => [...prev, ...(Array(dataURLs.length).fill(null) as unknown as File[])])
  }

  // remove specific frame
  const removeAt = (i: number) => {
    const newSources = sources.filter((_, idx) => idx !== i)
    const newFilters = filters.filter((_, idx) => idx !== i)
    const newFinal = finalImages.filter((_, idx) => idx !== i)
    setSources(newSources)
    setFilters(newFilters)
    setFinalImages(newFinal)

    if (newSources.length === 0) {
      setMode('empty')
      setCurrent(0)
      cropperRef.current?.cropper?.clear()
      return
    }

    const nextIdx = Math.min(i, newSources.length - 1)
    setCurrent(nextIdx)
    // важное: заменить картинку внутри уже видимого кропера
    setTimeout(() => cropperRef.current?.cropper?.replace(newSources[nextIdx], false), 0)
  }

  // switch current by clicking a thumb
  const selectIndex = (i: number) => {
    setCurrent(i)
    setTimeout(() => cropperRef.current?.cropper?.replace(sources[i], false), 0)
  }

  // apply crop + filter
  const applyCurrent = async (): Promise<File | null> => {
    const cr = cropperRef.current?.cropper as CropperJS | undefined
    if (!cr) return null
    const canvas = cr.getCroppedCanvas()
    if (!canvas) return null

    const filtered = document.createElement('canvas')
    filtered.width = canvas.width
    filtered.height = canvas.height
    const ctx = filtered.getContext('2d')!
    ctx.filter = filters[current] ?? 'none'
    ctx.drawImage(canvas, 0, 0)

    return await new Promise<File | null>(r =>
      filtered.toBlob(b => r(b ? new File([b], `img_${current + 1}.png`, { type: 'image/png' }) : null), 'image/png')
    )
  }

  const nextFromCrop = async () => {
    const f = await applyCurrent()
    if (f) {
      setFinalImages(prev => {
        const c = [...prev]
        c[current] = f
        return c
      })
    }
    if (current === sources.length - 1) {
      setMode('preview')
    } else {
      const idx = current + 1
      setCurrent(idx)
      setTimeout(() => cropperRef.current?.cropper?.replace(sources[idx], false), 0)
    }
  }

  // keep aspect ratio on active instance
  useEffect(() => {
    const cr = cropperRef.current?.cropper as CropperJS | undefined
    if (!cr) return
    if (aspectRatio !== undefined) {
      cr.setAspectRatio(aspectRatio)
      // без reset() — чтобы не «прыгала» рамка; если нужно, раскомментируй:
      // cr.reset()
    } else {
      cr.setAspectRatio(NaN)
    }
  }, [aspectRatio])

  // API
  const [uploadImage] = useUploadImagesForPostMutation()
  const [createPost] = useCreatePostMutation()

  const handlePublish = async () => {
    const files = finalImages.filter(Boolean)
    // доберём текущий, если вдруг не прошли все
    if (!files.length && sources.length) {
      const f = await applyCurrent()
      if (f) files.push(f)
    }
    if (!files.length) return

    try {
      const uploadImg = await uploadImage({ files }).unwrap()
      await createPost({
        description: desc,
        uploadIds: uploadImg.images.map((img: any) => img.uploadId),
      })
      setMode('empty')
      setSources([])
      setFilters([])
      setFinalImages([])
      setCurrent(0)
      setDesc('')
    } catch (e) {
      console.error(e)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" aria-modal="true" role="dialog">
      <div className="absolute inset-0 bg-black/60" />
      <div
        className="relative z-10 w-[980px] max-w-[96vw] rounded-xl border border-white/10 bg-dark-100 text-gray-100 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          {mode === 'empty' && (
            <>
              <h2 className="text-base font-semibold">Add Photos</h2>
              <button onClick={() => dispatch(setOpenCreate(false))} aria-label="Close">
                <Image src="/close-outline.svg" alt="закрыть" width={16} height={16} />
              </button>
            </>
          )}

          {mode === 'crop' && (
            <>
              <div className="flex items-center gap-2">
                <button onClick={() => setMode('empty')} aria-label="Back" className="p-2 -ml-2">
                  <Image src="/back-vector.svg" alt="Назад" width={12} height={12} />
                </button>
                <div className="text-sm text-gray-300">
                  {current + 1} / {sources.length}
                </div>
              </div>
              <h2 className="text-base font-semibold">Cropping</h2>
              <button onClick={nextFromCrop} className="text-primary-400 font-medium">
                Next
              </button>
            </>
          )}

          {mode === 'preview' && (
            <>
              <button onClick={() => setMode('crop')} aria-label="Back" className="p-2 -ml-2">
                <Image src="/back-vector.svg" alt="Назад" width={12} height={12} />
              </button>
              <h2 className="text-base font-semibold">Publication</h2>
              <button onClick={handlePublish} className="text-primary-400 font-medium">
                Publish
              </button>
            </>
          )}
        </div>

        {/* Body */}
        <div className="max-h-[80vh] overflow-auto p-4">
          {/* EMPTY */}
          {mode === 'empty' && (
            <div className="flex flex-col items-center justify-center gap-6 py-10">
              <div className="flex h-[230px] w-[220px] items-center justify-center rounded bg-dark-500">
                <Image src="/Icon.svg" alt="icon" width={36} height={36} />
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={onFileChange}
                className="sr-only"
                aria-hidden="true"
                tabIndex={-1}
              />
              <Button variant="primary" onClick={() => fileInputRef.current?.click()}>
                Select from Computer
              </Button>
            </div>
          )}

          {/* CROP */}
          {mode === 'crop' && sources.length > 0 && (
            <div className="flex flex-col gap-4">
              {/* controls */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <label>
                  Ratio:
                  <select
                    className="ml-2 rounded border border-white/10 bg-dark-200 p-1"
                    value={aspectRatio === undefined ? 0 : aspectRatio}
                    onChange={e => {
                      const v = Number(e.target.value)
                      setAspectRatio(v === 0 ? undefined : v)
                    }}
                  >
                    <option value={1}>1:1</option>
                    <option value={16 / 9}>16:9</option>
                    <option value={4 / 3}>4:3</option>
                    <option value={0}>Free</option>
                  </select>
                </label>

                <label>
                  Filter:
                  <select
                    className="ml-2 rounded border border-white/10 bg-dark-200 p-1"
                    value={filters[current] ?? 'none'}
                    onChange={e =>
                      setFilters(p => {
                        const c = [...p]
                        c[current] = e.target.value
                        return c
                      })
                    }
                  >
                    <option value="none">None</option>
                    <option value="grayscale(100%)">B/W</option>
                    <option value="sepia(100%)">Sepia</option>
                    <option value="brightness(150%)">Bright</option>
                    <option value="contrast(150%)">Contrast</option>
                    <option value="blur(3px)">Blur</option>
                  </select>
                </label>

                <div className="ml-auto text-sm text-gray-300">
                  {current + 1} / {sources.length}
                </div>
              </div>

              {/* MAIN CROP AREA — без Swiper */}
              <div className="relative h-[460px] w-full overflow-hidden rounded border border-white/10 bg-black">
                <Cropper
                  // важно: один инстанс всегда видим → корректно измеряет контейнер
                  src={sources[current]}
                  ref={el => {
                    if (el && typeof el === 'object' && 'cropper' in el) {
                      cropperRef.current = el as ReactCropperElement
                    } else {
                      cropperRef.current = null
                    }
                  }}
                  style={{ height: 460, width: '100%', filter: filters[current] ?? 'none' }}
                  viewMode={1}
                  dragMode="move"
                  guides
                  scalable
                  cropBoxMovable
                  cropBoxResizable
                  zoomable
                  responsive
                  background={false} // убирает «шахматку» под фоном
                  autoCropArea={1} // заполнить область максимально
                  checkOrientation={false}
                />
              </div>

              {/* THUMBS Swiper + “+” */}
              <div className="relative">
                <Swiper
                  modules={[FreeMode]}
                  freeMode
                  watchSlidesProgress
                  slidesPerView="auto"
                  spaceBetween={8}
                  className="rounded bg-black/30 p-2"
                >
                  {/* + Add */}
                  <SwiperSlide style={{ width: 76 }}>
                    <button
                      onClick={() => addMoreInputRef.current?.click()}
                      className="flex h-16 w-[68px] items-center justify-center rounded border border-white/20 bg-black/40 text-2xl"
                      aria-label="Add more"
                    >
                      +
                    </button>
                  </SwiperSlide>

                  {sources.map((src, i) => (
                    <SwiperSlide key={i} style={{ width: 100 }}>
                      <div
                        className={`relative h-16 w-[92px] overflow-hidden rounded border ${
                          i === current ? 'border-primary-400' : 'border-white/20'
                        }`}
                      >
                        <img src={src} alt={`thumb-${i + 1}`} className="h-full w-full object-cover" />
                        <button onClick={() => selectIndex(i)} className="absolute inset-0" aria-label={`Select ${i + 1}`} />
                        <button
                          onClick={e => {
                            e.stopPropagation()
                            removeAt(i)
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

                {/* hidden + input */}
                <input ref={addMoreInputRef} type="file" multiple accept="image/*" className="hidden" onChange={onAddMore} />
              </div>
            </div>
          )}

          {/* PREVIEW / PUBLICATION (Swiper со всеми финалами) */}
          {mode === 'preview' && finalImages.length > 0 && (
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
                  {finalImages.map((f, i) => (
                    <SwiperSlide key={i} className="h-full">
                      <div className="relative w-full bg-transparent rounded overflow-hidden" style={{ aspectRatio: 1 }}>
                        {f ? (
                          <>
                            <img src={URL.createObjectURL(f)} alt={`preview-${i + 1}`} className="inset-0 h-full w-full object-cover" />
                            <button
                              className="absolute bottom-2 right-2 rounded bg-black/60 px-2 py-1 text-xs"
                              onClick={() => {
                                setMode('crop')
                                selectIndex(i)
                              }}
                            >
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
                      onChange={e => setDesc(e.target.value.slice(0, DESC_LIMIT))}
                      placeholder="Text-area"
                      className="h-36 w-full resize-none rounded-md border border-white/10 bg-dark-100 p-3 outline-none"
                    />
                    <div className="absolute bottom-2 right-3 text-xs text-gray-400">
                      {desc.length}/{DESC_LIMIT}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
