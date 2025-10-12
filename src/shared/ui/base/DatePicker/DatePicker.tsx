'use client'
import { useEffect, useRef, useState } from 'react'
import { Mode, useDateSelection } from './useDateSelection'
import { Calendar } from './Calendar'

type DatePickerProps = {
  error?: boolean
  errorMessage?: string
  label: string
  mode?: Mode
  className?: string
}

export const DatePicker = ({ error = false, errorMessage, label, mode, className }: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const today = new Date()
  const pickerRef = useRef<HTMLDivElement>(null)

  const { selectedDate, rangeStart, rangeEnd, handleRangeClick, isInRange, isSelected } = useDateSelection(mode)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const displayValue =
    mode === 'single'
      ? selectedDate?.toLocaleDateString('ru-RU') || 'Не выбрано'
      : rangeStart && rangeEnd
        ? `${rangeStart.toLocaleDateString('ru-RU')} – ${rangeEnd.toLocaleDateString('ru-RU')}`
        : 'Выберите период'

  return (
    <div ref={pickerRef} className={`relative text-light-100 ${className}`} style={{ fontFamily: 'var(--font-body)' }}>
      {label && <label className="block text-xs text-light-900 mb-1">{error ? 'Error' : isOpen ? 'Date' : label}</label>}

      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className={`w-full h-[36px] flex items-center justify-between rounded-sm border ${mode === 'single' ? 'bg-[#0D0D0D]' : 'bg-dark-500'} px-3 py-2 text-sm transition-colors
          focus:outline-none focus:border-accent-500 
          ${error ? 'border-danger-500 text-danger-300' : 'border-dark-300 text-light-100 hover:border-dark-100'} `}
      >
        <span>{displayValue}</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M14.1667 3.3335H5.83333..." fill="currentColor" />
        </svg>
      </button>

      {error && errorMessage && <p className="mt-1 text-xs text-danger-300">{errorMessage}</p>}

      {isOpen && (
        <Calendar
          today={today}
          mode={mode}
          selectedDate={selectedDate}
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          handleRangeClick={handleRangeClick}
          isSelected={isSelected}
          isInRange={isInRange}
        />
      )}
    </div>
  )
}
