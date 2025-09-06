'use client'
import type CropperJS from 'cropperjs'

export async function applyCropAndFilter(cropper: CropperJS | undefined, filter: string, index: number): Promise<File | null> {
  if (!cropper) return null
  const canvas = cropper.getCroppedCanvas()
  if (!canvas) return null

  const filtered = document.createElement('canvas')
  filtered.width = canvas.width
  filtered.height = canvas.height
  const ctx = filtered.getContext('2d')!
  ctx.filter = filter ?? 'none'
  ctx.drawImage(canvas, 0, 0)

  return await new Promise<File | null>(r =>
    filtered.toBlob(b => r(b ? new File([b], `img_${index + 1}.png`, { type: 'image/png' }) : null), 'image/png')
  )
}
