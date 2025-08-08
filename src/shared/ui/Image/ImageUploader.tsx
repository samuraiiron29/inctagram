'use client'
import { useState, ChangeEvent } from 'react'

export function ImageUploader() {
  const [image, setImage] = useState<string | null>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file) // читаем файл как base64
    }
  }

  return (
    <div className="flex flex-col gap-4 items-center">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {image && <img src={image} alt="Preview" className="max-w-xs rounded shadow" />}
    </div>
  )
}
