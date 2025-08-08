'use client'
type HeaderProps = {
  currentDate: Date
  setCurrentDate: (date: Date) => void
}

export const CalendarHeader = ({ currentDate, setCurrentDate }: HeaderProps) => {
  const month = currentDate.toLocaleDateString('en-US', { month: 'long' })
  const year = currentDate.getFullYear()

  return (
    <div className="flex items-center justify-between pb-4">
      <span className="font-semibold text-base">{`${month} ${year}`}</span>
      <div className="flex items-center space-x-1">
        <button
          onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-dark-100 hover:bg-dark-300"
        >
          ←
        </button>
        <button
          onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-dark-100 hover:bg-dark-300"
        >
          →
        </button>
      </div>
    </div>
  )
}
