"use client"

import * as React from "react"
import { addDays, format, isSameDay } from "date-fns"
import { CalendarIcon, X, ChevronLeft, ChevronRight } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface DateRangePickerProps {
  dateRange: DateRange | undefined
  onDateRangeChange: (dateRange: DateRange | undefined) => void
  align?: "start" | "center" | "end"
  className?: string
  showCompare?: boolean
}

type PresetOption = {
  name: string
  label: string
  dateRange: DateRange
}

export function DateRangePicker({
  dateRange,
  onDateRangeChange,
  align = "start",
  className,
  showCompare = false,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  // Predefined date range options
  const presets: PresetOption[] = [
    {
      name: "today",
      label: "Today",
      dateRange: {
        from: new Date(),
        to: new Date(),
      },
    },
    {
      name: "yesterday",
      label: "Yesterday",
      dateRange: {
        from: addDays(new Date(), -1),
        to: addDays(new Date(), -1),
      },
    },
    {
      name: "last7",
      label: "Last 7 days",
      dateRange: {
        from: addDays(new Date(), -6),
        to: new Date(),
      },
    },
    {
      name: "last14",
      label: "Last 14 days",
      dateRange: {
        from: addDays(new Date(), -13),
        to: new Date(),
      },
    },
    {
      name: "last30",
      label: "Last 30 days",
      dateRange: {
        from: addDays(new Date(), -29),
        to: new Date(),
      },
    },
    {
      name: "thisMonth",
      label: "This month",
      dateRange: {
        from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        to: new Date(),
      },
    },
    {
      name: "lastMonth",
      label: "Last month",
      dateRange: {
        from: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
        to: new Date(new Date().getFullYear(), new Date().getMonth(), 0),
      },
    },
  ]

  const formatDateRange = (range: DateRange | undefined) => {
    if (!range || !range.from) {
      return "Select date range"
    }

    if (!range.to) {
      return format(range.from, "MMM d, yyyy")
    }

    if (isSameDay(range.from, range.to)) {
      return format(range.from, "MMM d, yyyy")
    }

    return `${format(range.from, "MMM d, yyyy")} - ${format(range.to, "MMM d, yyyy")}`
  }

  const handleClear = () => {
    onDateRangeChange(undefined)
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            size="lg"
            className={cn(
              "w-full justify-start text-left font-normal hover:bg-background",
              !dateRange && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formatDateRange(dateRange)}
            {dateRange && dateRange.from && (
              <X
                className="ml-auto h-4 w-4 opacity-50 hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation()
                  handleClear()
                }}
              />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align={align}>
          <Tabs defaultValue="calendar" className="w-full">
            <div className="flex items-center justify-between px-4 pt-4">
              <TabsList className="grid w-[250px] grid-cols-2">
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
                <TabsTrigger value="presets">Presets</TabsTrigger>
              </TabsList>
              <Button variant="ghost" size="sm" onClick={handleClear} className="h-7 text-xs">
                Clear
              </Button>
            </div>
            <TabsContent value="calendar" className="p-4">
              <EnhancedCalendar
                selected={dateRange}
                onSelect={onDateRangeChange}
                defaultMonth={dateRange?.from || new Date()}
              />
            </TabsContent>
            <TabsContent value="presets" className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {presets.map((preset) => (
                  <Button
                    key={preset.name}
                    variant="outline"
                    className={cn(
                      "justify-start text-left",
                      dateRange?.from &&
                        dateRange.to &&
                        preset.dateRange.from &&
                        preset.dateRange.to &&
                        isSameDay(dateRange.from, preset.dateRange.from) &&
                        isSameDay(dateRange.to, preset.dateRange.to) &&
                        "bg-muted",
                    )}
                    onClick={() => {
                      onDateRangeChange(preset.dateRange)
                      setIsOpen(false)
                    }}
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          <div className="flex items-center justify-between p-4 pt-0">
            <div className="text-sm text-muted-foreground">
              {dateRange?.from && (
                <>
                  <span className="font-medium">{format(dateRange.from, "MMM d, yyyy")}</span>
                  {dateRange.to && dateRange.from.getTime() !== dateRange.to.getTime() ? (
                    <>
                      <span> – </span>
                      <span className="font-medium">{format(dateRange.to, "MMM d, yyyy")}</span>
                    </>
                  ) : null}
                </>
              )}
            </div>
            <Button size="sm" onClick={() => setIsOpen(false)} className="ml-auto">
              Apply
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

interface EnhancedCalendarProps {
  selected: DateRange | undefined
  onSelect: (range: DateRange | undefined) => void
  defaultMonth: Date
}

function EnhancedCalendar({ selected, onSelect, defaultMonth }: EnhancedCalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(defaultMonth.getMonth())
  const [currentYear, setCurrentYear] = React.useState(defaultMonth.getFullYear())
  const [startDate, setStartDate] = React.useState<Date | null>(selected?.from || null)
  const [endDate, setEndDate] = React.useState<Date | null>(selected?.to || null)
  const [showYearPicker, setShowYearPicker] = React.useState(false)
  const [yearDecade, setYearDecade] = React.useState(Math.floor(currentYear / 10) * 10)

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

  // Update the calendar when selected dates change externally
  React.useEffect(() => {
    if (selected?.from) {
      setStartDate(selected.from)
      if (!selected.to) {
        setEndDate(null)
      }
    } else {
      setStartDate(null)
    }

    if (selected?.to) {
      setEndDate(selected.to)
    }
  }, [selected])

  // Handle month navigation
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const goToPreviousDecade = () => {
    setYearDecade(yearDecade - 10)
  }

  const goToNextDecade = () => {
    setYearDecade(yearDecade + 10)
  }

  // Handle year selection
  const handleYearClick = (year: number) => {
    setCurrentYear(year)
    setShowYearPicker(false)
  }

  // Generate days for the current month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  // Handle date selection
  const handleDateClick = (date: Date) => {
    if (!startDate || (startDate && endDate) || date < startDate) {
      // Start a new selection
      setStartDate(date)
      setEndDate(null)
      onSelect({ from: date, to: undefined })
    } else {
      // Complete the selection
      setEndDate(date)
      onSelect({ from: startDate, to: date })
    }
  }

  // Check if a date is selected
  const isDateSelected = (date: Date) => {
    if (!startDate) return false

    if (!endDate) {
      return isSameDay(date, startDate)
    }

    return date >= startDate && date <= endDate
  }

  // Check if a date is the start or end of the selection
  const isStartDate = (date: Date) => startDate && isSameDay(date, startDate)
  const isEndDate = (date: Date) => endDate && isSameDay(date, endDate)

  // Render year picker
  const renderYearPicker = () => {
    const years = []
    const startYear = yearDecade
    const endYear = yearDecade + 11

    for (let year = startYear; year < endYear; year++) {
      years.push(
        <button
          key={year}
          type="button"
          className={cn(
            "h-10 rounded-md flex items-center justify-center text-sm",
            year === currentYear && "bg-primary text-primary-foreground",
            year !== currentYear && "hover:bg-muted",
          )}
          onClick={() => handleYearClick(year)}
        >
          {year}
        </button>,
      )
    }

    return (
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">
            {yearDecade} - {yearDecade + 11}
          </span>
          <div className="flex">
            <Button variant="outline" size="icon" className="h-7 w-7" onClick={goToPreviousDecade}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-7 w-7 ml-1" onClick={goToNextDecade}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2">{years}</div>
      </div>
    )
  }

  // Render days view
  const renderDaysView = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth)
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth)

    // Create calendar grid
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-9"></div>)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day)
      const isSelected = isDateSelected(date)
      const isStart = isStartDate(date)
      const isEnd = isEndDate(date)

      days.push(
        <button
          key={`day-${day}`}
          type="button"
          className={cn(
            "h-9 w-9 rounded-md flex items-center justify-center text-sm",
            isSelected && "bg-primary text-primary-foreground",
            !isSelected && "hover:bg-muted",
            (isStart || isEnd) && "font-bold",
          )}
          onClick={() => handleDateClick(date)}
        >
          {day}
        </button>,
      )
    }

    return (
      <div>
        <div className="grid grid-cols-7 gap-1 mb-1">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div key={day} className="h-9 flex items-center justify-center text-xs text-muted-foreground">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">{days}</div>
      </div>
    )
  }

  // Render second month (for range selection)
  const renderSecondMonth = () => {
    let secondMonth = currentMonth + 1
    let secondYear = currentYear

    if (secondMonth > 11) {
      secondMonth = 0
      secondYear += 1
    }

    const secondMonthDays = []
    const daysInSecondMonth = getDaysInMonth(secondYear, secondMonth)
    const firstDayOfSecondMonth = getFirstDayOfMonth(secondYear, secondMonth)

    // Add empty cells for days before the first day of the second month
    for (let i = 0; i < firstDayOfSecondMonth; i++) {
      secondMonthDays.push(<div key={`empty-second-${i}`} className="h-9"></div>)
    }

    // Add days of the second month
    for (let day = 1; day <= daysInSecondMonth; day++) {
      const date = new Date(secondYear, secondMonth, day)
      const isSelected = isDateSelected(date)
      const isStart = isStartDate(date)
      const isEnd = isEndDate(date)

      secondMonthDays.push(
        <button
          key={`second-day-${day}`}
          type="button"
          className={cn(
            "h-9 w-9 rounded-md flex items-center justify-center text-sm",
            isSelected && "bg-primary text-primary-foreground",
            !isSelected && "hover:bg-muted",
            (isStart || isEnd) && "font-bold",
          )}
          onClick={() => handleDateClick(date)}
        >
          {day}
        </button>,
      )
    }

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <button type="button" className="text-sm font-medium hover:underline" onClick={() => setShowYearPicker(true)}>
            {months[secondMonth]} {secondYear}
          </button>
        </div>

        <div>
          <div className="grid grid-cols-7 gap-1 mb-1">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div key={`second-${day}`} className="h-9 flex items-center justify-center text-xs text-muted-foreground">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">{secondMonthDays}</div>
        </div>
      </div>
    )
  }

  if (showYearPicker) {
    return renderYearPicker()
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* First month */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="text-sm font-medium hover:underline"
              onClick={() => setShowYearPicker(true)}
            >
              {months[currentMonth]} {currentYear}
            </button>
            <div className="flex">
              <Button variant="outline" size="icon" className="h-7 w-7" onClick={goToPreviousMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-7 w-7 ml-1" onClick={goToNextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {renderDaysView()}
        </div>

        {/* Second month */}
        <div className="space-y-4">{renderSecondMonth()}</div>
      </div>
    </div>
  )
}
