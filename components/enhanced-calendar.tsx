"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  showYearPickerOnHeaderClick?: boolean
}

function EnhancedCalendar({ className, classNames, showYearPickerOnHeaderClick = true, ...props }: CalendarProps) {
  const [showYearPicker, setShowYearPicker] = React.useState(false)
  const [currentMonth, setCurrentMonth] = React.useState<Date>(props.defaultMonth || new Date())
  const [yearRangeStart, setYearRangeStart] = React.useState(Math.floor((currentMonth.getFullYear() - 6) / 12) * 12)

  // Handle month navigation
  const handlePreviousMonth = () => {
    const previousMonth = new Date(currentMonth)
    previousMonth.setMonth(previousMonth.getMonth() - 1)
    setCurrentMonth(previousMonth)
  }

  const handleNextMonth = () => {
    const nextMonth = new Date(currentMonth)
    nextMonth.setMonth(nextMonth.getMonth() + 1)
    setCurrentMonth(nextMonth)
  }

  // Handle year range navigation
  const handlePreviousYearRange = () => {
    setYearRangeStart(yearRangeStart - 12)
  }

  const handleNextYearRange = () => {
    setYearRangeStart(yearRangeStart + 12)
  }

  // Handle year selection
  const handleYearSelect = (year: number) => {
    const newDate = new Date(currentMonth)
    newDate.setFullYear(year)
    setCurrentMonth(newDate)
    setShowYearPicker(false)
  }

  // Render year picker
  const renderYearPicker = () => {
    const years = []
    for (let i = 0; i < 12; i++) {
      const year = yearRangeStart + i
      years.push(
        <button
          key={year}
          onClick={() => handleYearSelect(year)}
          className={cn(
            "h-9 w-14 rounded-md flex items-center justify-center text-sm",
            year === currentMonth.getFullYear() ? "bg-primary text-primary-foreground" : "hover:bg-muted",
          )}
        >
          {year}
        </button>,
      )
    }

    return (
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">
            {yearRangeStart} - {yearRangeStart + 11}
          </span>
          <div className="flex">
            <button
              onClick={handlePreviousYearRange}
              className={cn(buttonVariants({ variant: "outline", size: "icon" }), "h-7 w-7")}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={handleNextYearRange}
              className={cn(buttonVariants({ variant: "outline", size: "icon" }), "h-7 w-7 ml-1")}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">{years}</div>
      </div>
    )
  }

  // Custom components for DayPicker
  const components = {
    Caption: ({ displayMonth }: { displayMonth: Date }) => (
      <div className="flex items-center justify-between px-2 py-2">
        <button onClick={() => setShowYearPicker(true)} className="text-sm font-medium hover:underline" type="button">
          {format(displayMonth, "MMMM yyyy")}
        </button>
        <div className="flex space-x-1">
          <button
            onClick={handlePreviousMonth}
            className={cn(buttonVariants({ variant: "outline", size: "icon" }), "h-7 w-7")}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={handleNextMonth}
            className={cn(buttonVariants({ variant: "outline", size: "icon" }), "h-7 w-7")}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    ),
  }

  if (showYearPicker) {
    return renderYearPicker()
  }

  return (
    <DayPicker
      captionLayout="buttons-hide"
      month={currentMonth}
      components={components}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(buttonVariants({ variant: "ghost" }), "h-9 w-9 p-0 font-normal aria-selected:opacity-100"),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      {...props}
    />
  )
}

export { EnhancedCalendar }
