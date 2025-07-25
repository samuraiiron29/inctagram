'use client'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

type Props = {
  message: string
  variant: 'success' | 'error'
  position?: 'toast' | 'modal'
}

const baseStyle = `flex flex-row justify-start items-center w-[387px] border rounded-[2px] py-3 px-6 gap-6`
const variantStyle = {
  success: 'bg-success-900 border-success-500',
  error: 'bg-danger-900  border-danger-500',
}
const positionStyle = {
  toast: 'fixed bottom-4 left-4 shadow-lg z-50',
  modal: 'absolute top-4 left-1/2 -translate-x-1/2',
}
const getVariantAlert = (text: string) => text[0].toUpperCase() + text.slice(1) + '! '

export const Alert = ({ variant, message, position = 'toast' }: Props) => {
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(false), 3000)
    return () => clearTimeout(timer)
  }, [])
  const isOpenHandler = () => setIsOpen(false)
  const className = clsx(baseStyle, variantStyle[variant], positionStyle[position])
  if (!isOpen) return null
  return (
    <div className={className}>
      <div className="w-[291px]">
        <span className="text-bold_text16">{getVariantAlert(variant)}</span>
        <span className="text-regular_text16">{message}</span>
      </div>
      <button onClick={isOpenHandler} children={'✕'} />
    </div>
  )
}

