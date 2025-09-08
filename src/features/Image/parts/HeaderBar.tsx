'use client'
import React from 'react'
import Image from 'next/image'
import type { Mode } from '../types/types'
import LinearProgress from '@/shared/ui/base/Liner/LinearProgress'

type Props = {
  mode: Mode
  current: number
  total: number
  isPublishing: boolean
  onBack: () => void
  onNext: () => void
  onPublish: () => void
  onCloseEmpty: () => void
}

export function HeaderBar({ mode, current, total, isPublishing, onBack, onNext, onPublish, onCloseEmpty }: Props) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
      {mode === 'empty' && (
        <>
          <h2 className="text-base font-semibold">Add Photos</h2>
          <button onClick={onCloseEmpty} aria-label="Close">
            <Image src="/close-outline.svg" alt="закрыть" width={16} height={16} />
          </button>
        </>
      )}

      {mode === 'crop' && (
        <>
          <div className="flex items-center gap-2">
            <button onClick={onBack} aria-label="Back" className="p-2 -ml-2">
              <Image src="/back-vector.svg" alt="Назад" width={12} height={12} />
            </button>
            <div className="text-sm text-gray-300">
              {current + 1} / {total}
            </div>
          </div>
          <h2 className="text-base font-semibold">Cropping</h2>
          <button onClick={onNext} className="text-primary-400 font-medium">
            Next
          </button>
        </>
      )}

      {mode === 'preview' && (
        <>
          <button onClick={onBack} aria-label="Back" className="p-2 -ml-2">
            <Image src="/back-vector.svg" alt="Назад" width={12} height={12} />
          </button>
          <h2 className="text-base font-semibold">Publication</h2>

          <button onClick={onPublish} disabled={isPublishing} className="text-primary-400 font-medium">
            {isPublishing ? 'Publishing…' : 'Publish'}
          </button>
        </>
      )}
      {isPublishing ? <LinearProgress /> : ''}
    </div>
  )
}
