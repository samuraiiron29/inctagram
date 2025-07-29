import { useState } from "react";
import { Mode } from "./useDateSelection";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarGrid } from "./CalendarGrid";

type CalendarProps = {
  today: Date;
  mode?: Mode;
  selectedDate: Date | null;
  rangeStart: Date | null;
  rangeEnd: Date | null;
  handleRangeClick: (date: Date) => void;
  isSelected: (date: Date) => boolean;
  isInRange: (date: Date) => boolean;
};

export const Calendar = ({
  today,
  mode,
  selectedDate,
  rangeStart,
  rangeEnd,
  handleRangeClick,
  isSelected,
  isInRange,
}: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(today);

  return (
    <div className="absolute z-10 w-full rounded-sm bg-dark-700 shadow-lg border-t border-dark-300">
      <div className="p-4">
        <CalendarHeader currentDate={currentDate} setCurrentDate={setCurrentDate} />
        <CalendarGrid
          currentDate={currentDate}
          today={today}
          selectedDate={selectedDate}
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          handleRangeClick={handleRangeClick}
          isSelected={isSelected}
          isInRange={isInRange}
        />
      </div>
    </div>
  );
};
