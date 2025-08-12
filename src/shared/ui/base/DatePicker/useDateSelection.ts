'use client'
import { useState } from 'react'

export type Mode = 'single' | 'range'

export const useDateSelection = (mode: Mode = 'single') => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [rangeStart, setRangeStart] = useState<Date | null>(null)
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null)

  const handleRangeClick = (date: Date) => {
    if (mode === 'single') {
      setSelectedDate(date)
    } else {
      if (!rangeStart || (rangeStart && rangeEnd)) {
        setRangeStart(date)
        setRangeEnd(null)
      } else {
        if (date < rangeStart) {
          setRangeEnd(rangeStart)
          setRangeStart(date)
        } else {
          setRangeEnd(date)
        }
      }
    }
  }

  const isInRange = (date: Date) => {
    if (mode !== 'range' || !rangeStart || !rangeEnd) return false

    const start = new Date(rangeStart)
    const end = new Date(rangeEnd)

    start.setHours(0, 0, 0, 0)
    end.setHours(0, 0, 0, 0)
    date.setHours(0, 0, 0, 0)

    return date > start && date < end
  }

  const isSelected = (date: Date) => {
    if (mode === 'single') {
      return selectedDate?.toDateString() === date.toDateString()
    }
    return rangeStart?.toDateString() === date.toDateString() || rangeEnd?.toDateString() === date.toDateString()
  }

  const reset = () => {
    setSelectedDate(null)
    setRangeStart(null)
    setRangeEnd(null)
  }

  return {
    selectedDate,
    rangeStart,
    rangeEnd,
    handleRangeClick,
    isInRange,
    isSelected,
    reset,
  }
}
