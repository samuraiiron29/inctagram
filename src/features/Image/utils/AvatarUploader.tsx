'use client'
import { Modal } from "@/features/Modal"
import { Button } from "@/shared/ui/base"
import { useRef, useState } from "react"
import Image from 'next/image'

type Props = {
     //userId:String
    open:boolean
    onClose:()=>void
  }

export const AvatarUploader = ({open, onClose}:Props) => {
 const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)//Сохраняет URL выбранного изображения, чтобы показать превью
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)//Ссылка на <input type="file">, чтобы открыть его программно при клике на кнопку.
  //const [open, setOpen] = useState(false)  //для модалки
   
 const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => { //Срабатывает при выборе файла. Берёт первый файл из списка.
    const file = e.target.files?.[0]
    if (!file) return

    // Валидация формата
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setError('Error! The format of the uploaded photo must be PNG and JPEG')
      setSelectedFile(null)
     if (preview) URL.revokeObjectURL(preview) // Очистка старого URL
      setPreview(null)
      return
    }
    // Валидация размера
    if (file.size > 10 * 1024 * 1024) {
      setError('Error! Photo size must be less than 10MB')
      setSelectedFile(null)
        if (preview) URL.revokeObjectURL(preview)
      setPreview(null)
      return
    }

        setError(null)
    setSelectedFile(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleSelectClick = () => {
    inputRef.current?.click()
  }

 const handleSave = async () => {
    if (!selectedFile) return
   //  API
    alert('Фото успешно загружено (заглушка)')
    setSelectedFile(null)
    setPreview(null)
  }

  // Очистка при закрытии модального окна (для сброса состояния)
    const handleClose = () => {
        //setSelectedFile(null)
        if (preview) URL.revokeObjectURL(preview) //освобождает память (иначе при повторных загрузках могут копиться ссылки на Blob).
         setPreview(null)
         setError(null)
        console.log("Закрытие модалки сработало");
        onClose?.();
    }

    return (
      <div>
      <Modal 
      width="492" 
      height="564" 
      modalTitle="Add Profile Photo" 
       onClose={handleClose} 
      open={open}
      >
     <input 
                type="file"
                ref={inputRef}
                onChange={handleFileChange}
                accept=".jpeg, .png, image/jpeg, image/png"
                style={{ display: 'none' }}
            />
            <Button variant="primary" onClick={handleSelectClick}>
              Select from Computer
            </Button>
              {error && <p className="text-red-500 mb-4">{error}</p>}

              {selectedFile && preview && (
                <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                    <p className="font-semibold mb-2">Selected Photo:</p>
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        {/* Предварительный просмотр выбранной фотографии */}
                        <div className="relative w-40 h-40 border-dashed border-2 p-1">
                            
                            <Image src={preview} 
                            alt="Selected Preview" 
                            fill 
                             className="object-cover" 
                             />
                             </div>
                        {/* Превью, как фотография будет отображаться в профиле */}
                        <div className="flex flex-col items-center">
                            <p className="text-sm text-gray-600 mb-2">Profile Preview:</p>
                            <div className="relative w-20 h-20 rounded-full overflow-hidden border">
                                <Image src={preview} layout="fill" objectFit="cover" alt="Profile Preview" />
                            </div>
                        </div>
                    </div>
                       
                         <div className="mt-6 flex justify-end">
                {/* 6. Авторизованный пользователь нажимает [ Save ] */}
                <Button onClick={handleSave} disabled={!selectedFile || !!error}>
                    Save
                </Button>
            </div>
             </div>
              )}
             
        </Modal>
         </div>
              )
              }

