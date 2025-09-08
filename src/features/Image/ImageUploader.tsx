'use client'
import React, { useRef, useState } from 'react'
import type CropperJS from 'cropperjs'
import { useCreatePostMutation, useUploadImagesForPostMutation } from '@/shared/api'
import { useAppDispatch } from '@/shared/lib/hooks'
import { setOpenCreate } from '@/store/slices/appSlice'
import { readFilesAsDataURLs } from './hooks/useDataUrls'
import { applyCropAndFilter } from './utils/applyCropAndFilter'
import { CropPanel } from './panels/CropPanel'
import { PreviewPanel } from './panels/PreviewPanel'
import { EmptyPanel } from './panels/EmptyPanel'
import type { Mode } from './types/types'
import { DESC_LIMIT } from './consts/consts'
import { HeaderBar } from './parts/HeaderBar'
import { CloseConfirmModal } from './parts/CloseConfirmModal'
import LinearProgress from '@/shared/ui/base/Liner/LinearProgress'

export default function ImageUploader({ open }: { open: boolean }) {
  const dispatch = useAppDispatch()
  const [uploadImage, { isLoading }] = useUploadImagesForPostMutation()
  const [createPost] = useCreatePostMutation()
  const [mode, setMode] = useState<Mode>('empty')
  const [sources, setSources] = useState<string[]>([])
  const [filters, setFilters] = useState<string[]>([])
  const [finalImages, setFinalImages] = useState<(File | null)[]>([])
  const [current, setCurrent] = useState(0)
  const [aspectRatio, setAspectRatio] = useState<number | undefined>(1)
  const [desc, setDesc] = useState('')
  const [showModal, setShowModal] = useState<boolean>(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const cropperRef = useRef<any>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const addMoreInputRef = useRef<HTMLInputElement | null>(null)

  const handleOnClose = () => setShowModal(false)
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length) return
    const dataURLs = await readFilesAsDataURLs(files)
    setSources(dataURLs)
    setFilters(Array(dataURLs.length).fill('none'))
    setFinalImages(Array(dataURLs.length).fill(null))
    setCurrent(0)
    setMode('crop')
    setTimeout(() => cropperRef.current?.cropper?.replace(dataURLs[0], false), 0)
  }
  const onAddMore = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length) return
    const dataURLs = await readFilesAsDataURLs(files)
    setSources(prev => [...prev, ...dataURLs])
    setFilters(prev => [...prev, ...Array(dataURLs.length).fill('none')])
    setFinalImages(prev => [...prev, ...Array(dataURLs.length).fill(null)])
  }
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
    setTimeout(() => cropperRef.current?.cropper?.replace(newSources[nextIdx], false), 0)
  }
  const selectIndex = (i: number) => {
    setCurrent(i)
    setTimeout(() => cropperRef.current?.cropper?.replace(sources[i], false), 0)
  }
  const applyCurrent = async (): Promise<File | null> => {
    const cr = cropperRef.current?.cropper as CropperJS | undefined
    return applyCropAndFilter(cr, filters[current] ?? 'none', current)
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
    if (current === sources.length - 1) setMode('preview')
    else {
      const idx = current + 1
      setCurrent(idx)
      setTimeout(() => cropperRef.current?.cropper?.replace(sources[idx], false), 0)
    }
  }
  const handlePublish = async () => {
    if (isPublishing) return
    setIsPublishing(true)
    const files = finalImages.filter(Boolean) as File[]
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
      dispatch(setOpenCreate(false))
    } catch (e) {
      console.error(e)
    } finally {
      setIsPublishing(false)
    }
  }

  if (!open) return null

  return (
    <>
      {isLoading ? <LinearProgress /> : ''}
      <div className="fixed inset-0 z-50 flex items-center justify-center" aria-modal="true" role="dialog">
        <div
          className="absolute inset-0 bg-black/60"
          onClick={() => (mode !== 'empty' ? setShowModal(true) : dispatch(setOpenCreate(false)))}
        />
        <CloseConfirmModal
          // open={showModal}
          open={showModal && mode !== 'empty'}
          onClose={handleOnClose}
          onDiscard={() => {
            setMode('empty')
            handleOnClose()
            dispatch(setOpenCreate(false))
          }}
          onSaveDraft={handleOnClose}
        />
        <div
          className="relative z-10 w-[980px] max-w-[96vw] rounded-xl border border-white/10 bg-dark-100 text-gray-100 shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          <HeaderBar
            mode={mode}
            current={current}
            total={sources.length}
            onBack={() => (mode === 'crop' ? setMode('empty') : setMode('crop'))}
            onNext={nextFromCrop}
            onPublish={handlePublish}
            onCloseEmpty={() => dispatch(setOpenCreate(false))}
            isPublishing={isPublishing}
          />

          <div className="max-h-[80vh] overflow-auto p-4">
            {mode === 'empty' && (
              <EmptyPanel onPick={() => fileInputRef.current?.click()} fileInputRef={fileInputRef} onFileChange={onFileChange} />
            )}

            {mode === 'crop' && sources.length > 0 && (
              <>
                <CropPanel
                  cropperRef={cropperRef}
                  sources={sources}
                  filters={filters}
                  setFilters={setFilters}
                  current={current}
                  setCurrent={setCurrent}
                  aspectRatio={aspectRatio}
                  setAspectRatio={setAspectRatio}
                  onNext={nextFromCrop}
                  onAddMoreClick={() => addMoreInputRef.current?.click()}
                  onRemoveAt={removeAt}
                />
                <input ref={addMoreInputRef} type="file" multiple accept="image/*" className="hidden" onChange={onAddMore} />
              </>
            )}

            {mode === 'preview' && (
              <PreviewPanel
                files={finalImages}
                desc={desc}
                setDesc={setDesc}
                onEditAt={(i: number) => {
                  setMode('crop')
                  selectIndex(i)
                }}
                descLimit={DESC_LIMIT}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
