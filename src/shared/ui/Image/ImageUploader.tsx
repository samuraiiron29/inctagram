// 'use client'

// import React, { useRef, useState } from 'react'
// import Cropper from 'react-cropper'
// import type CropperJS from 'cropperjs'
// import 'cropperjs/dist/cropper.css'

// export default function ImageUploader() {
//   // Тут храним реф на React-компонент Cropper
//   const cropperRef = useRef<any>(null)
//   const [imageSrc, setImageSrc] = useState<string | null>(null)

//   const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (!file) return
//     const reader = new FileReader()
//     reader.onload = () => {
//       if (typeof reader.result === 'string') setImageSrc(reader.result)
//     }
//     reader.readAsDataURL(file)
//   }

//   const getCroppedImage = () => {
//     // Получаем инстанс cropperjs через cropperRef.current.cropper
//     const cropper = cropperRef.current?.cropper as CropperJS | undefined

//     if (!cropper) {
//       alert('Cropper не инициализирован')
//       return
//     }

//     const canvas = cropper.getCroppedCanvas()

//     if (!canvas) {
//       alert('Невозможно получить обрезанное изображение')
//       return
//     }

//     console.log('Canvas размеры:', canvas.width, canvas.height)

//     canvas.toBlob(blob => {
//       if (!blob) return
//       const url = URL.createObjectURL(blob)
//       const link = document.createElement('a')
//       link.href = url
//       link.download = 'cropped-image.png'
//       link.click()
//       URL.revokeObjectURL(url)
//     }, 'image/png')
//   }

//   return (
//     <div className="flex flex-col items-center gap-4 p-4">
//       <input
//         type="file"
//         accept="image/*"
//         onChange={onFileChange}
//         className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
//                    file:rounded-full file:border-0 file:text-sm file:font-semibold
//                    file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//       />

//       {imageSrc && (
//         <>
//           <Cropper
//             src={imageSrc}
//             style={{ height: 400, width: 400 }}
//             aspectRatio={1}
//             guides={true}
//             viewMode={1}
//             dragMode="move"
//             scalable={true}
//             cropBoxMovable={true}
//             cropBoxResizable={true}
//             zoomable={true}
//             ref={cropperRef} // Важно: реф именно сюда
//           />
//           <button onClick={getCroppedImage} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
//             Скачать результат
//           </button>
//         </>
//       )}
//     </div>
//   )
// }

'use client'

import React, { useEffect, useRef, useState } from 'react'
import Cropper from 'react-cropper'
import type CropperJS from 'cropperjs'
import 'cropperjs/dist/cropper.css'

export default function ImageUploader() {
  const cropperRef = useRef<any>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [aspectRatio, setAspectRatio] = useState<number | undefined>(1)
  const [filter, setFilter] = useState<string>('none')
  const [finalImage, setFinalImage] = useState<string | null>(null)

  useEffect(() => {
    const cropper = cropperRef.current?.cropper
    if (cropper && aspectRatio !== undefined) {
      cropper.setAspectRatio(aspectRatio)
      // Пересоздаем или обновляем crop box
      cropper.reset()
    } else if (cropper && aspectRatio === undefined) {
      // Если свободное соотношение, сбросить ограничение
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
        setFinalImage(null) // сброс результата при новой загрузке
      }
    }
    reader.readAsDataURL(file)
  }

  const applyCropAndFilter = () => {
    const cropper = cropperRef.current?.cropper as CropperJS | undefined
    if (!cropper) {
      alert('Cropper не инициализирован')
      return
    }

    const canvas = cropper.getCroppedCanvas()
    if (!canvas) {
      alert('Невозможно получить обрезанное изображение')
      return
    }

    // Создаём временный canvas для применения CSS-фильтра
    const filteredCanvas = document.createElement('canvas')
    filteredCanvas.width = canvas.width
    filteredCanvas.height = canvas.height

    const ctx = filteredCanvas.getContext('2d')
    if (!ctx) {
      alert('Ошибка при работе с canvas')
      return
    }

    // Применяем фильтр к контексту
    ctx.filter = filter
    ctx.drawImage(canvas, 0, 0)

    // Получаем итоговое изображение в base64
    const dataUrl = filteredCanvas.toDataURL('image/png')
    setFinalImage(dataUrl)
  }

  return (
    <div className="max-w-md mx-auto p-4 flex flex-col gap-4">
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0 file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />

      {imageSrc && (
        <>
          <div className="flex gap-4 items-center">
            <label>
              Ratio:
              <select
                className="ml-2 border rounded p-1"
                value={aspectRatio === undefined ? 0 : aspectRatio}
                onChange={e => {
                  const val = Number(e.target.value)
                  setAspectRatio(val === 0 ? undefined : val)
                }}
              >
                <option value={1}>1:1</option>
                <option value={16 / 9}>16:9</option>
                <option value={4 / 3}>4:3</option>
                <option value={0}>Свободное</option>
              </select>
            </label>

            <label>
              Фильтр:
              <select className="ml-2 border rounded p-1" value={filter} onChange={e => setFilter(e.target.value)}>
                <option value="none">Без фильтра</option>
                <option value="grayscale(100%)">Черно-белый</option>
                <option value="sepia(100%)">Сепия</option>
                <option value="brightness(150%)">Ярче</option>
                <option value="contrast(150%)">Контраст</option>
                <option value="blur(3px)">Размытие</option>
              </select>
            </label>
          </div>

          <Cropper
            src={imageSrc}
            aspectRatio={aspectRatio}
            guides={true}
            viewMode={1}
            dragMode="move"
            scalable={true}
            cropBoxMovable={true}
            cropBoxResizable={true}
            zoomable={true}
            ref={cropperRef}
            // Накладываем CSS-фильтр для превью
            preview=".img-preview"
            className="rounded border"
            // Фильтр через стиль
            style={{ height: 300, width: '100%', filter }}
          />

          <button onClick={applyCropAndFilter} className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Принять
          </button>
        </>
      )}

      {finalImage && (
        <div className="mt-6 flex flex-col items-center">
          <h3 className="mb-2 text-lg font-semibold">Результат:</h3>
          {finalImage && <img src={finalImage} alt="Обрезанное фото" />}
        </div>
      )}
    </div>
  )
}
