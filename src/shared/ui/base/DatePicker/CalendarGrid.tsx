'use client'
import { CalendarDay } from './CalendarDay'

const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

type CalendarGridProps = {
  currentDate: Date
  today: Date
  selectedDate: Date | null
  rangeStart: Date | null
  rangeEnd: Date | null
  handleRangeClick: (date: Date) => void
  isSelected: (date: Date) => boolean
  isInRange: (date: Date) => boolean
}

export const CalendarGrid = ({
  currentDate,
  today,
  selectedDate,
  rangeStart,
  rangeEnd,
  handleRangeClick,
  isSelected,
  isInRange,
}: CalendarGridProps) => {
  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)

  const startDay = (startOfMonth.getDay() + 6) % 7 // смещение, чтобы начиналась с понедельника
  const daysInMonth = Array.from({ length: endOfMonth.getDate() }, (_, i) => i + 1)

  return (
    <div className="grid grid-cols-7 gap-y-2 text-center">
      {/* Заголовки дней */}
      {DAYS.map(day => (
        <div key={day} className="text-xs font-medium text-light-900">
          {day}
        </div>
      ))}

      {/* Пустые ячейки до начала месяца */}
      {Array.from({ length: startDay }).map((_, i) => (
        <div key={`empty-${i}`} />
      ))}

      {/* Дни месяца */}
      {daysInMonth.map(day => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)

        return (
          <CalendarDay
            key={day}
            day={day}
            date={date}
            today={today}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            isSelected={isSelected}
            isInRange={isInRange}
            handleRangeClick={handleRangeClick}
          />
        )
      })}
    </div>
  )
}
