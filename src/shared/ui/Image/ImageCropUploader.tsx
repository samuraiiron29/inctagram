'use client'

import { useState, ChangeEvent, useCallback } from 'react'
import Cropper from 'react-easy-crop'

export function ImageCropUploader() {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setImageSrc(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log('cropped area in pixels:', croppedAreaPixels)
    // Здесь можно будет вырезать изображение перед отправкой
  }, [])

  return (
    <div className="flex flex-col gap-4 items-center">
      {!imageSrc && <input type="file" accept="image/*" onChange={handleFileChange} />}

      {imageSrc && (
        <div className="relative w-[300px] h-[300px] bg-gray-200">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
      )}
    </div>
  )
}
