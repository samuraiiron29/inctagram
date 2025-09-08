'use client'
import React from 'react'
import Image from 'next/image'
import { Button } from '@/shared/ui/base/Button/Button'

type Props = {
  onPick: () => void
  fileInputRef: React.RefObject<HTMLInputElement | null>
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function EmptyPanel({ onPick, fileInputRef, onFileChange }: Props) {
  return (
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
      <Button variant="primary" onClick={onPick}>
        Select from Computer
      </Button>
    </div>
  )
}
