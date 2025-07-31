import clsx from "clsx";

type CalendarDayProps = {
  day: number;
  date: Date;
  today: Date;
  rangeStart: Date | null;
  rangeEnd: Date | null;
  isSelected: (date: Date) => boolean;
  isInRange: (date: Date) => boolean;
  handleRangeClick: (date: Date) => void;
};

function formatISO(date: Date) {
  return date.toISOString().split("T")[0];
}

export const CalendarDay = ({
  day,
  date,
  today,
  rangeStart,
  rangeEnd,
  isSelected,
  isInRange,
  handleRangeClick,
}: CalendarDayProps) => {
  const selected = isSelected(date);
  const todayIs = formatISO(date) === formatISO(today);
  const weekend = date.getDay() === 0 || date.getDay() === 6;
  const singleSelected =
    rangeStart && !rangeEnd && formatISO(date) === formatISO(rangeStart);

  return (
    <button
      type="button"
      onClick={() => handleRangeClick(date)}
      className={clsx(
        "mx-auto h-7 w-7 flex items-center justify-center rounded-full text-sm transition-colors",
        selected && "bg-accent-500 text-light-100 font-bold hover:bg-accent-300", // начальная/конечная дата
        singleSelected && "border-2 border-accent-500 text-light-100",             // одна дата — кружок
        !selected && isInRange(date) && "bg-blue-500 text-white",                  // между датами
        !selected && todayIs && "border border-accent-500",                        // сегодняшняя дата
        !selected && weekend && "text-danger-300",                                 // выходные
        !selected && !weekend && "text-light-100",
        !selected && "hover:bg-dark-500"
      )}
    >
      {day}
    </button>
  );
};
