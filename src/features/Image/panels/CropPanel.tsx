'use client'
import React, { useEffect, useState } from 'react'
import Cropper, { type ReactCropperElement } from 'react-cropper'
import type CropperJS from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { FilterSelect } from '../parts/FilterSelect'
import { ThumbStrip } from '../parts/ThumbStrip'

export type Props = {
  cropperRef: React.MutableRefObject<ReactCropperElement | null>
  sources: string[]
  filters: string[]
  setFilters: React.Dispatch<React.SetStateAction<string[]>>
  current: number
  setCurrent: (i: number) => void
  aspectRatio?: number
  setAspectRatio: (v: number | undefined) => void
  onNext: (dataUrl?: string) => void
  onAddMoreClick: () => void
  onRemoveAt: (i: number) => void
  setIsRatio: (flag: boolean) => void
}

export function CropPanel({
  cropperRef,
  sources,
  filters,
  setFilters,
  current,
  setCurrent,
  aspectRatio,
  setAspectRatio,
  onNext,
  onAddMoreClick,
  onRemoveAt,
  setIsRatio,
}: Props) {
  // применяем соотношение сторон при изменении
  useEffect(() => {
    const cr = cropperRef.current?.cropper as CropperJS | undefined
    if (!cr) return
    if (aspectRatio !== undefined) cr.setAspectRatio(aspectRatio)
    else cr.setAspectRatio(NaN)
  }, [aspectRatio, cropperRef])
  useEffect(() => {
    setIsRatio(false)
  }, [])
  const selectIndex = (i: number) => {
    setCurrent(i)
    setTimeout(() => cropperRef.current?.cropper?.replace(sources[i], false), 0)
  }
  // const isRatioSelected = aspectRatio !== undefined

  return (
    <div className="flex flex-col gap-4">
      {/* controls */}
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <label>
          Ratio:
          <select
            className="ml-2 rounded border border-white/10 bg-dark-200 p-1 [color-scheme:dark] appearance-none"
            value={aspectRatio === undefined ? 0 : aspectRatio}
            onChange={e => {
              const v = Number(e.target.value)
              setAspectRatio(v === 0 ? undefined : v)
              setIsRatio(true)
            }}
          >
            <option value={1} className="bg-black/60">
              1 : 1
            </option>
            <option value={16 / 9} className="bg-black/60">
              16 : 9
            </option>
            <option value={4 / 3} className="bg-black/60">
              4 : 3
            </option>
            <option value={0} className="bg-black/60">
              Free
            </option>
          </select>
        </label>

        <FilterSelect
          value={filters[current] ?? 'none'}
          onChange={v =>
            setFilters(p => {
              const c = [...p]
              c[current] = v
              return c
            })
          }
        />

        <div className="ml-auto text-sm text-gray-300">
          {current + 1} / {sources.length}
        </div>
      </div>

      <div className="relative h-[460px] w-full overflow-hidden rounded border border-white/10 bg-black">
        <Cropper
          src={sources[current]}
          ref={el => {
            if (el && typeof el === 'object' && 'cropper' in el) cropperRef.current = el as ReactCropperElement
            else cropperRef.current = null
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
          background={false}
          autoCropArea={1}
          checkOrientation={false}
        />
      </div>

      <ThumbStrip sources={sources} current={current} onAddClick={onAddMoreClick} onSelect={selectIndex} onRemove={onRemoveAt} />
    </div>
  )
}
