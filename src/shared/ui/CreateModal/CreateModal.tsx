'use client'
import ImageUploader from '../Image/ImageUploader'

type Props = {
  open: boolean
}
export const CreateModal = (props: Props) => {
  return (
    <>
      <ImageUploader open />
    </>
  )
}

// 'use client'
// import { useState, useCallback } from 'react'
// import Cropper from 'react-easy-crop'
// import { Button } from '@radix-ui/themes'
// import { Slider } from 'radix-ui'
// import Image from 'next/image'

// export const ImageUploader = (props: Props) => {
//   const [imageSrc, setImageSrc] = useState<string|null>(null)
//   const [crop, setCrop] = useState({ x: 0, y: 0 })
//   const [zoom, setZoom] = useState(1)
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null)
//   const [confirmed, setConfirmed] = useState(false)

//   const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (!file) return
//     const reader = new FileReader()
//     reader.onload = () => {
//       if (typeof reader.result === 'string') {
//         setImageSrc(reader.result)
//         props.imageSrc(reader.result)
//       }
//     }
//     reader.readAsDataURL(file)
//   }, [])

//   const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
//     setCroppedAreaPixels(croppedAreaPixels)
//     console.log(croppedAreaPixels)
//   }, [])

//   const confirmCrop = () => {
//     setConfirmed(true)

//     console.log('Выбранная область:', croppedAreaPixels)
//   }

//   return (
//     <div className="flex flex-col items-center gap-4 p-4">
//       {/* Загрузка фото */}
//       <input
//         type="file"
//         accept="image/*"
//         onChange={onFileChange}
//         className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
//                    file:rounded-full file:border-0 file:text-sm file:font-semibold
//                    file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//       />

//       {!confirmed && imageSrc && (
//         <>
//           {/* Кроппер */}
//           <div className="relative w-80 h-80 bg-gray-200 rounded-xl overflow-hidden">
//             <Cropper
//               image={imageSrc}
//               crop={crop}
//               zoom={zoom}
//               aspect={1}
//               onCropChange={setCrop}
//               onZoomChange={setZoom}
//               onCropComplete={onCropComplete}
//             />
//           </div>

//           {/* Зум */}
//           <div className="w-60">
//             <label className="block mb-2 text-sm font-medium text-gray-700">Zoom</label>
//             <Slider.Root
//               className="relative flex items-center select-none touch-none w-full h-5"
//               value={[zoom]}
//               min={1}
//               max={3}
//               step={0.1}
//               onValueChange={value => setZoom(value[0])}
//             >
//               <Slider.Track className="bg-gray-300 relative grow rounded-full h-[3px]">
//                 <Slider.Range className="absolute bg-blue-500 rounded-full h-full" />
//               </Slider.Track>
//               <Slider.Thumb className="block w-4 h-4 bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none" />
//             </Slider.Root>
//           </div>

//           {/* Кнопка подтверждения */}
//           <button onClick={confirmCrop} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
//             Подтвердить
//           </button>
//         </>
//       )}

//       {/* После подтверждения */}
//       {confirmed && (
//         <p className="text-green-700">✅ Обрезка подтверждена! Можешь передать эти координаты на бэкенд или в другой компонент.</p>
//       )}
//       <div>{imageSrc && <Image src={imageSrc} alt="" width={crop.x} height={crop.y} />}</div>
//     </div>
//   )
// }
