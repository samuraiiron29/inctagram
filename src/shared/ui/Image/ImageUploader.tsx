'use client'

import React, { useEffect, useRef, useState } from 'react'
import Cropper from 'react-cropper'
import type CropperJS from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import Image from 'next/image'
import { Button } from '@/shared/ui/base/Button/Button'
import { useCreatePostMutation, useUploadImagesForPostMutation } from '@/shared/api'

type Mode = 'empty' | 'crop' | 'preview'

type Props = {
  open: boolean
  onClose?: () => void
}

const DESC_LIMIT = 500

export default function ImageUploader({ open, onClose }: Props) {
  const cropperRef = useRef<any>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [mode, setMode] = useState<Mode>('empty')
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [aspectRatio, setAspectRatio] = useState<number | undefined>(1)
  const [filter, setFilter] = useState<string>('none')
  const [finalImage, setFinalImage] = useState<File[]>([])
  const [desc, setDesc] = useState('')

  // блокируем скролл боди, закрытие по Esc
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose?.()
      window.addEventListener('keydown', onKey)
      return () => {
        document.body.style.overflow = prev
        window.removeEventListener('keydown', onKey)
      }
    }
  }, [open, onClose])

  useEffect(() => {
    const cropper = cropperRef.current?.cropper as CropperJS | undefined
    if (!cropper) return
    if (aspectRatio !== undefined) {
      cropper.setAspectRatio(aspectRatio)
      cropper.reset()
    } else {
      cropper.setAspectRatio(NaN)
    }
  }, [aspectRatio])

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImageSrc(reader.result)
        setFinalImage([])
        setMode('crop')
      }
    }
    reader.readAsDataURL(file)
  }
  const handleNext = () => {
    const cropper = cropperRef.current?.cropper as CropperJS | undefined
    if (!cropper) return alert('Cropper не инициализирован')

    const canvas = cropper.getCroppedCanvas()
    if (!canvas) return alert('Невозможно получить обрезанное изображение')

    // Применяем фильтр
    const filteredCanvas = document.createElement('canvas')
    filteredCanvas.width = canvas.width
    filteredCanvas.height = canvas.height
    const ctx = filteredCanvas.getContext('2d')
    if (!ctx) return alert('Ошибка при работе с canvas')

    ctx.filter = filter
    ctx.drawImage(canvas, 0, 0)

    filteredCanvas.toBlob(blob => {
      if (!blob) return alert('Ошибка конвертации в Blob')

      const file = new File([blob], 'cropped.png', { type: 'image/png' })

      setFinalImage([file])

      setMode('preview')
    }, 'image/png')
  }

  const handleBack = () => {
    if (mode === 'preview') return setMode('crop')
    if (mode === 'crop') {
      setImageSrc(null)
      setFinalImage([])
      setMode('empty')
    }
  }

  const [uploadImage] = useUploadImagesForPostMutation()
  const [createPost] = useCreatePostMutation()

  const handlePublish = async () => {
    if (!finalImage) return

    console.log(finalImage)

    try {
      const uploadImg = await uploadImage({ files: finalImage }).unwrap()
      await createPost({
        description: desc,
        uploadIds: uploadImg.images.map(img => img.uploadId),
      })
    } catch (error) {
      console.log(error)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" aria-modal="true" role="dialog">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div
        className="relative z-10 w-[940px] max-w-[94vw] rounded-xl border border-white/10 bg-dark-100 text-gray-100 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          {mode === 'empty' && (
            <>
              <h2 className="text-base font-semibold">Add Photo</h2>
              <button onClick={onClose} aria-label="Close">
                <Image src="/close-outline.svg" alt="закрыть" width={16} height={16} />
              </button>
            </>
          )}
          {mode === 'crop' && (
            <>
              <button onClick={handleBack} aria-label="Back" className="p-2 -ml-2">
                <Image src="/back-vector.svg" alt="Назад" width={12} height={12} />
              </button>
              <h2 className="text-base font-semibold">Cropping</h2>
              <button onClick={handleNext} className="text-primary-400 font-medium">
                Next
              </button>
            </>
          )}
          {mode === 'preview' && (
            <>
              <button onClick={handleBack} aria-label="Back" className="p-2 -ml-2">
                <Image src="/back-vector.svg" alt="Назад" width={12} height={12} />
              </button>
              <h2 className="text-base font-semibold">Publication</h2>
              <button onClick={handlePublish} className="text-primary-400 font-medium">
                Publish
              </button>
            </>
          )}
        </div>

        <div className="max-h-[80vh] overflow-auto p-4">
          {mode === 'empty' && (
            <div className="flex flex-col items-center justify-center gap-6 py-10">
              <div className="flex h-[230px] w-[220px] items-center justify-center rounded bg-dark-500">
                <Image src="/Icon.svg" alt="icon" width={36} height={36} />
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
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

          {mode === 'crop' && imageSrc && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 text-sm">
                <label>
                  Ratio:
                  <select
                    className="ml-2 rounded border border-white/10 bg-dark-200 p-1"
                    value={aspectRatio === undefined ? 0 : aspectRatio}
                    onChange={e => {
                      const val = Number(e.target.value)
                      setAspectRatio(val === 0 ? undefined : val)
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
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                  >
                    <option value="none">None</option>
                    <option value="grayscale(100%)">B/W</option>
                    <option value="sepia(100%)">Sepia</option>
                    <option value="brightness(150%)">Bright</option>
                    <option value="contrast(150%)">Contrast</option>
                    <option value="blur(3px)">Blur</option>
                  </select>
                </label>
              </div>

              <Cropper
                src={imageSrc}
                aspectRatio={aspectRatio}
                guides
                viewMode={1}
                dragMode="move"
                scalable
                cropBoxMovable
                cropBoxResizable
                zoomable
                ref={cropperRef}
                className="rounded border border-white/10"
                style={{ height: 430, width: '100%', filter }}
              />
            </div>
          )}

          {mode === 'preview' && finalImage && (
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded border border-white/10 bg-black">
                <img src={URL.createObjectURL(finalImage[0])} alt="preview" className="h-full w-full object-cover" />
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
