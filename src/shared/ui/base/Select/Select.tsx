'use client'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

type Props = {
    disabled?: boolean
    label?: string
    required?: boolean
    title?: string
    options?: string[]
    onChange: (value: string) => void
    isLanguage?: boolean
    width?: string
    placeholder?: string
    error?: string
    value?: string
    onBlur?: () => void
}

export const Select = ({
                           disabled,
                           title,
                           options,
                           onChange,
                           placeholder,
                           label,
                           required,
                           error,
                           value,
                           onBlur,
                           isLanguage,
                           width = '150px',
                       }: Props) => {
    const [isOpen, setIsOpen] = useState(false)
    const [internalValue, setInternalValue] = useState(value || '')
    const [language, setLanguage] = useState<string>('English')
    const languageOptions = ['Russian', 'English']
    const actualOptions = isLanguage ? languageOptions : options
    const selectRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (value !== undefined) {
            setInternalValue(value)
        }
    }, [value])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false)
                onBlur?.()
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleOptionClick = (option: string) => {
        if (disabled) return
        setInternalValue(option)
        onChange(option)
        setIsOpen(false)
        if (isLanguage) setLanguage(option)
    }

    const toggleDropdown = () => {
        if (!disabled) setIsOpen((prev) => !prev)
    }

    return (
        <div className="text-white" style={{ width: `${isLanguage ? '200px' : width}` }} ref={selectRef}>
            {title && <span className="text-sm font-medium">{title}</span>}
            {label && (
                <label className="text-sm font-medium">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}

            <div className={`relative flex gap-1 ${disabled ? 'opacity-40 pointer-events-none' : ''}`}>
                <button
                    onClick={toggleDropdown}
                    className={`
                        w-full px-3 py-2 text-left border rounded-md 
                        bg-black hover:border-gray-400 
                        focus:outline-none
                        flex justify-between items-center gap-1
                        ${isOpen ? 'border-gray-300' : 'border-gray-600'}
                      `}
                >
                    <div className="flex items-center gap-2">
                        {isLanguage && (
                            <Image
                                src={language === 'Russian' ? '/flagRussia.svg' : '/flag.svg'}
                                alt="flag"
                                width={20}
                                height={20}
                            />
                        )}
                        <span className={`${!internalValue && placeholder ? 'text-gray-500' : ''}`}>
                            {internalValue || placeholder || 'Select'}
                        </span>
                    </div>
                    <Image
                        src={isOpen ? '/arrow2.svg' : '/arrow1.svg'}
                        alt="arrow"
                        width={14}
                        height={8}
                    />
                </button>

                {isOpen && (
                    <ul
                        className="absolute top-10 z-50 mt-1 w-full max-h-52 overflow-auto bg-black border border-gray-600 rounded-md shadow-lg"
                    >
                        {actualOptions?.map((option, i) => (
                            <li
                                key={i}
                                className={`px-3 py-2 cursor-pointer hover:bg-gray-700 ${
                                    internalValue === option ? 'text-blue-400' : ''
                                }`}
                                onClick={() => handleOptionClick(option)}
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
    )
}
