import { ChevronLeft } from "../icons/ChevronLeft"
import { ChevronRight } from "../icons/ChevronRight"
import { cn } from "../utils/utils"
import type { FC } from "react"

interface CalendarNavigationProps {
  year: number
  month: number
  onNavigate: (year: number, month: number) => void
  className?: string
}

const months = [
  "Januar",
  "Februar",
  "Mars",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Desember",
]

export const EventCalendarHeader: FC<CalendarNavigationProps> = ({ year, month, onNavigate, className }) => {
  const prevMonth = (month + 11) % 12
  const nextMonth = (month + 1) % 12
  const prevYear = month === 0 ? year - 1 : year
  const nextYear = month === 11 ? year + 1 : year

  const handlePreviousMonth = () => {
    onNavigate(prevYear, prevMonth)
  }

  const handleNextMonth = () => {
    onNavigate(nextYear, nextMonth)
  }

  return (
    <div className={cn("flex justify-between sm:justify-end items-center gap-4", className)}>
      <h2 className="text-xl">
        {months[month]} {year}
      </h2>
      <div className="flex gap-2 sm:gap-0">
        <button
          type="button"
          className="cursor-pointer rounded-full hover:bg-gray-200 dark:hover:bg-neutral-700 flex p-3 sm:p-2 duration-200"
          onClick={handlePreviousMonth}
          aria-label="Previous month"
        >
          <ChevronLeft width={24} height={24}/>
        </button>
        <button
          type="button"
          className="cursor-pointer rounded-full hover:bg-gray-200 dark:hover:bg-neutral-700 flex p-3 sm:p-2 duration-200"
          onClick={handleNextMonth}
          aria-label="Next month"
        >
          <ChevronRight width={24} height={24}/>
        </button>
      </div>
    </div>
  )
}
