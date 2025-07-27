import { useState } from "react";
import {Mode, useDateSelection} from "./useDateSelection"


const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
function formatDate(date: Date) { return date.toLocaleDateString("ru-RU"); }
function formatMonthYear(date: Date) {
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const year = date.getFullYear();
  return `${month} ${year}`;
}
function formatISO(date: Date) { return date.toISOString().split("T")[0]; }
function classNames(...classes: (string | false | null | undefined)[]) { return classes.filter(Boolean).join(" "); } //!!??

type DatePickerProps = {
  error?: boolean;
  errorMessage?: string;
  label: string;
  mode?: Mode;
}

export const DatePicker = ({ error = false, errorMessage, label, mode }: DatePickerProps)  => {
  const today = new Date();
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(today);

   const {
    selectedDate,
    rangeStart,
    rangeEnd,
    handleRangeClick,
    isInRange,
    isSelected,
  } = useDateSelection(mode);

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDay = (startOfMonth.getDay() + 6) % 7;
  const daysInMonth = Array.from({ length: endOfMonth.getDate() }, (_, i) => i + 1); 

  const displayValue =
    mode === "single"
      ? selectedDate?.toLocaleDateString("ru-RU") || "Не выбрано"
      : rangeStart && rangeEnd
      ? `${rangeStart.toLocaleDateString("ru-RU")} – ${rangeEnd.toLocaleDateString("ru-RU")}`
      : "Выберите период";

  return (
    <div className="relative inline-block text-left text-light-100 w-[284px]"
    style={{fontFamily:"var(--font-body)"}}>
       {/* Лейбл над полем ввода */}
       {label && (
  <label className="block text-xs text-light-900 mb-1">
    {
      error
        ? "Error"
        : isOpen
          ? "Date"
          : mode === "range" && rangeStart && rangeEnd
            ? "Date range"
            : mode === "single" && selectedDate
              ? "Date selected"
              : "Date"
    }
  </label>
)}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={classNames(
            "w-full h-[36px] flex items-center justify-between rounded-sm border bg-dark-500 px-3 py-2 text-sm transition-colors",
            "focus:outline-none focus:border-accent-500", // Стиль для фокуса
            error 
              ? "border-danger-500 text-danger-300" // Стили для ошибки
              : "border-dark-300 text-light-100 hover:border-dark-100" // Стандартные стили
          )}
          style={{ fontFamily: "var(--font-body)" }}
        >
            <span>{displayValue}</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="currentColor">
            <path d="M14.1667 3.3335H5.83333C4.91667 3.3335 4.175 4.0835 4.175 5.00016V15.0002C4.175 15.9168 4.91667 16.6668 5.83333 16.6668H14.1667C15.0833 16.6668 15.8333 15.9168 15.8333 15.0002V5.00016C15.8333 4.0835 15.0833 3.3335 14.1667 3.3335ZM14.1667 15.0002H5.83333V8.3335H14.1667V15.0002ZM14.1667 6.66683H5.83333V5.00016H14.1667V6.66683Z" fill="currentColor"/>
          </svg>
        </button>
        {/* Отображение сообщения об ошибке */}
        {error && errorMessage && (
          <p className="mt-1 text-xs text-danger-300" style={{ fontFamily: "var(--font-body)" }}>{errorMessage}</p>
        )}
      </div>

      {/* Выпадающий календарь */}
       {isOpen && (
        <div className="absolute z-10 w-full rounded-sm bg-dark-700 shadow-lg border-t border-dark-300">
          <div className="p-4">
              {/* Хедер */}
               <div className="flex items-center justify-between pb-4"> 
          
               <span className="font-semibold text-base">{formatMonthYear(currentDate)}</span> 
               <span className="font-semibold text-base"></span>

              <div className="flex items-center space-x-1">
                <button
                  type="button"
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
                  className="p-1 rounded-full bg-dark-100 hover:bg-dark-300">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                   </button>
                <button
                  type="button"
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
                  className="p-1 rounded-full bg-dark-100 hover:bg-dark-300">
                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                
                </button>
              </div>
            </div>
             <div className="grid grid-cols-7 gap-y-2 text-center">
              {DAYS.map((day) => (
                <div key={day} className="text-xs font-medium text-light-900">{day}</div>
              ))}
              {Array.from({ length: startDay }).map((_, i) => <div key={`empty-${i}`} />)}
{daysInMonth.map((day) => {
  const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
   
   const selected = isSelected(date);
   const todayIs = formatISO(date) === formatISO(today);
   const weekend = date.getDay() === 0 || date.getDay() === 6;
   const singleSelected = rangeStart && !rangeEnd && formatISO(date) === formatISO(rangeStart);

                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handleRangeClick(date)}
                    className={classNames(
  "mx-auto h-7 w-7 flex items-center justify-center rounded-full text-sm transition-colors",
  selected && "bg-accent-500 text-light-100 font-bold hover:bg-accent-300",        // начальная/конечная дата
  singleSelected && "border-2 border-accent-500 text-light-100",                   // одна дата — кружок
  !selected && isInRange(date) && "bg-blue-500 text-white",                      // между датами
  !selected && todayIs && "border border-accent-500",
  !selected && weekend && "text-danger-300",
  !selected && !weekend && "text-light-100",
  !selected && "hover:bg-dark-500"
)} >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
        
