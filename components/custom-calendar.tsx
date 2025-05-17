"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface CustomCalendarProps {
  mode?: "single" | "range" | "multiple"
  selected?: Date | Date[] | { from: Date; to: Date }
  onSelect?: (date: Date | undefined) => void
  disabled?: (date: Date) => boolean
  className?: string
  fromYear?: number
  toYear?: number
}

export function CustomCalendar({
  mode = "single",
  selected,
  onSelect,
  disabled,
  className,
  fromYear = 1900,
  toYear = new Date().getFullYear() + 5,
}: CustomCalendarProps) {
  const today = new Date()
  const currentYear = today.getFullYear()

  // Initialize with current date or selected date
  const initialDate = mode === "single" && selected instanceof Date ? selected : today

  const [currentMonth, setCurrentMonth] = React.useState(initialDate.getMonth())
  const [currentViewYear, setCurrentViewYear] = React.useState(initialDate.getFullYear())

  // Generate years array for dropdown
  const years = React.useMemo(() => {
    const yearsArray = []
    for (let year = fromYear; year <= toYear; year++) {
      yearsArray.push(year)
    }
    return yearsArray
  }, [fromYear, toYear])

  // Month names
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  // Handle month navigation
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentViewYear(currentViewYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentViewYear(currentViewYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  // Generate days for the current month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  // Check if a date is selected
  const isDateSelected = (date: Date) => {
    if (!selected) return false

    if (mode === "single" && selected instanceof Date) {
      return date.toDateString() === selected.toDateString()
    }

    return false
  }

  // Check if a date is today
  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString()
  }

  // Check if a date is disabled
  const isDateDisabled = (date: Date) => {
    return disabled ? disabled(date) : false
  }

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    if (isDateDisabled(date)) return

    if (onSelect) {
      onSelect(date)
    }
  }

  // Render days of the week
  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

  // Render calendar grid
  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentViewYear, currentMonth)
    const firstDayOfMonth = getFirstDayOfMonth(currentViewYear, currentMonth)
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-9 w-9"></div>)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentViewYear, currentMonth, day)
      const isSelected = isDateSelected(date)
      const isTodayDate = isToday(date)
      const isDisabled = isDateDisabled(date)

      days.push(
        <button
          key={`day-${day}`}
          type="button"
          disabled={isDisabled}
          className={cn(
            "h-9 w-9 rounded-md flex items-center justify-center text-sm",
            isSelected && "bg-primary text-primary-foreground",
            !isSelected && !isDisabled && "hover:bg-muted",
            isTodayDate && !isSelected && "border border-primary",
            isDisabled && "text-muted-foreground opacity-50 cursor-not-allowed",
          )}
          onClick={() => handleDateSelect(date)}
        >
          {day}
        </button>,
      )
    }

    return days
  }

  return (
    <div className={cn("p-3 space-y-4", className)}>
      <div className="space-y-2">
        {/* Month and Year Selectors */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <Select value={currentMonth.toString()} onValueChange={(value) => setCurrentMonth(Number.parseInt(value))}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month, index) => (
                  <SelectItem key={month} value={index.toString()}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={currentViewYear.toString()}
              onValueChange={(value) => setCurrentViewYear(Number.parseInt(value))}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent className="max-h-[200px]">
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex space-x-1">
            <Button variant="outline" size="icon" className="h-7 w-7" onClick={goToPreviousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-7 w-7" onClick={goToNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div>
        <div className="grid grid-cols-7 gap-1 mb-1">
          {daysOfWeek.map((day) => (
            <div key={day} className="h-9 flex items-center justify-center text-xs text-muted-foreground">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">{renderCalendarGrid()}</div>
      </div>
    </div>
  )
}
