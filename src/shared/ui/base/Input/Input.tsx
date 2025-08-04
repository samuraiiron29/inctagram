'use client'

import { ChangeEvent, useState } from 'react'
import Image from 'next/image'
import { useFormContext } from 'react-hook-form'
import type { ZodInputs } from '@/shared/lib/types'

type InputType = 'password' | 'email' | 'search' | 'default'

type PropsType = {
  type?: InputType
  disabled?: boolean
  name: string
  placeholder?: string
  width?: string
  label: string
}

export const Input = ({ type = 'default', disabled, name, placeholder, width, label }: PropsType) => {
  const form = (() => {
    try {
      return useFormContext<ZodInputs>()
    } catch {
      return null
    }
  })()

  const [inputValue, setInputValue] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const errorMessage =
    form && name in form.formState.errors ? (form.formState.errors[name as keyof ZodInputs]?.message as string) : undefined

  const getIconSrc = (): string | null => {
    if (type === 'password') return showPassword ? '/eye-off-outline.svg' : '/eye-outline.svg'
    if (type === 'search') return '/search-outline.svg'
    return null
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleIconClick = () => {
    if (type === 'password') {
      setShowPassword(prev => !prev)
    }
  }

  const inputType = showPassword && type === 'password' ? 'text' : type

  return (
    <div style={{ width: width }}>
      <label className="mb-1 block text-sm opacity-50">{label}</label>

      <div className="relative flex items-center">
        {type === 'search' && getIconSrc() && (
          <button type="button" className="cursor-pointer absolute z-1 flex items-center left-[12px]" onClick={handleIconClick}>
            <Image src={getIconSrc()!} alt="icon" width={24} height={24} />
          </button>
        )}

        <input
          type={inputType}
          {...(form
            ? form.register(name as keyof ZodInputs)
            : {
                value: inputValue,
                onChange: onChangeHandler,
              })}
          className={`
            input border rounded-xs w-2xs py-1.5 px-3
            ${getIconSrc() && type === 'search' ? 'pl-[41px]' : ''}
            ${errorMessage ? 'border-danger-500 text-danger-500' : 'border-[#333]'}
          `}
          placeholder={placeholder ?? (type === 'password' ? '******************' : type === 'email' ? 'Epam@epam.com' : 'Введите текст')}
          disabled={disabled}
          name={name}
        />

        {type === 'password' && getIconSrc() && (
          <button type="button" onClick={handleIconClick} className="cursor-pointer absolute z-1 flex items-center right-[20px]">
            <Image src={getIconSrc()!} alt="icon" width={24} height={24} />
          </button>
        )}
      </div>
      {errorMessage && <span className="text-danger-500 text-xs mt-1 block">{errorMessage}</span>}
    </div>
  )
}
