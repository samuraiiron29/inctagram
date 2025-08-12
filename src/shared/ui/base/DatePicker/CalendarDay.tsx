'use client'
import clsx from 'clsx'

type CalendarDayProps = {
  day: number
  date: Date
  today: Date
  rangeStart: Date | null
  rangeEnd: Date | null
  isSelected: (date: Date) => boolean
  isInRange: (date: Date) => boolean
  handleRangeClick: (date: Date) => void
}

function formatISO(date: Date) {
  return date.toISOString().split('T')[0]
}

export const CalendarDay = ({ day, date, today, rangeStart, rangeEnd, isSelected, isInRange, handleRangeClick }: CalendarDayProps) => {
  const selected = isSelected(date)
  const todayIs = formatISO(date) === formatISO(today)
  const weekend = date.getDay() === 0 || date.getDay() === 6

  const isRangeStart = rangeStart && formatISO(date) === formatISO(rangeStart)
  const isRangeEnd = rangeEnd && formatISO(date) === formatISO(rangeEnd)
  const inMiddle = isInRange(date)
  const singleSelected = (!rangeEnd && isRangeStart) || (selected && !rangeStart && !rangeEnd)

  return (
    <button
      type="button"
      onClick={() => handleRangeClick(date)}
      className={clsx(
        'w-full aspect-square flex items-center justify-center text-sm transition-colors',
        // диапазон
        (isRangeStart || isRangeEnd || inMiddle) && 'bg-accent-500 text-light-100',
        inMiddle && 'rounded-none',
        isRangeStart && !isRangeEnd && 'rounded-l-full font-bold',
        isRangeEnd && !isRangeStart && 'rounded-r-full font-bold',
        isRangeStart && isRangeEnd && 'rounded-full font-bold',
        // одиночная дата
        singleSelected && 'border-2 border-accent-500 bg-accent-500 rounded-full',
        // прочие состояния
        !selected && !inMiddle && todayIs && 'border border-accent-500',
        !selected && !inMiddle && weekend && 'text-danger-300',
        !selected && !inMiddle && !weekend && 'text-light-100',
        !selected && !inMiddle && 'hover:bg-dark-500 rounded-full'
      )}
    >
      {day}
    </button>
  )
}
