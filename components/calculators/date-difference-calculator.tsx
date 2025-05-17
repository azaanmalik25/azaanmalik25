"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { format, differenceInDays, differenceInMonths, differenceInYears, addDays, isSameDay } from "date-fns"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import type { DateRange } from "react-day-picker"
import { DateRangePicker } from "@/components/ui/date-range-picker"

export function DateDifferenceCalculator() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)
  const [daysToAdd, setDaysToAdd] = useState<number | "">("")
  const [resultDate, setResultDate] = useState<Date | null>(null)
  const [baseDate, setBaseDate] = useState<Date | undefined>(undefined)
  const [baseOpen, setBaseOpen] = useState(false)

  const calculateDifference = () => {
    if (!dateRange?.from || !dateRange?.to) return null

    const days = differenceInDays(dateRange.to, dateRange.from)
    const months = differenceInMonths(dateRange.to, dateRange.from)
    const years = differenceInYears(dateRange.to, dateRange.from)

    // Calculate remaining months after years
    const remainingMonths = months % 12

    // Calculate remaining days after months
    const tempDate = new Date(dateRange.from)
    tempDate.setFullYear(tempDate.getFullYear() + years)
    tempDate.setMonth(tempDate.getMonth() + remainingMonths)
    const remainingDays = differenceInDays(dateRange.to, tempDate)

    return {
      totalDays: days,
      years,
      months: remainingMonths,
      days: remainingDays,
    }
  }

  const addDaysToDate = () => {
    if (!baseDate || daysToAdd === "") return

    const result = addDays(baseDate, Number(daysToAdd))
    setResultDate(result)
  }

  const difference = calculateDifference()

  return (
    <div className="space-y-6">
      <Tabs defaultValue="difference" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="difference">Date Difference</TabsTrigger>
          <TabsTrigger value="add">Add Days</TabsTrigger>
        </TabsList>

        <TabsContent value="difference" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date-range">Select Date Range</Label>
            <DateRangePicker dateRange={dateRange} onDateRangeChange={setDateRange} />
          </div>

          {dateRange?.from && dateRange?.to && difference && (
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Years</p>
                    <p className="text-2xl font-bold">{difference.years}</p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Months</p>
                    <p className="text-2xl font-bold">{difference.months}</p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Days</p>
                    <p className="text-2xl font-bold">{difference.days}</p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Total Days</p>
                    <p className="text-2xl font-bold">{difference.totalDays}</p>
                  </div>
                </div>

                <div className="mt-4 text-center text-sm text-muted-foreground">
                  <p>
                    From {format(dateRange.from, "PPP")} to {format(dateRange.to, "PPP")}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="add" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="base-date">Base Date</Label>
            <Popover open={baseOpen} onOpenChange={setBaseOpen}>
              <PopoverTrigger asChild>
                <Button
                  id="base-date"
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !baseDate && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {baseDate ? format(baseDate, "PPP") : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <SingleDatePicker selected={baseDate} onSelect={setBaseDate} onClose={() => setBaseOpen(false)} />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="days-to-add">Days to Add</Label>
            <Input
              id="days-to-add"
              type="number"
              placeholder="Enter number of days"
              value={daysToAdd}
              onChange={(e) => setDaysToAdd(e.target.value ? Number(e.target.value) : "")}
            />
          </div>

          <Button onClick={addDaysToDate} className="w-full">
            Calculate
          </Button>

          {baseDate && resultDate && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Base Date</p>
                      <p className="text-xl font-bold">{format(baseDate, "MMM d, yyyy")}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Result Date</p>
                      <p className="text-xl font-bold">{format(resultDate, "MMM d, yyyy")}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {daysToAdd} days from {format(baseDate, "PPP")}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface SingleDatePickerProps {
  selected: Date | undefined
  onSelect: (date: Date | undefined) => void
  onClose: () => void
}

function SingleDatePicker({ selected, onSelect, onClose }: SingleDatePickerProps) {
  const initialDate = selected || new Date()
  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth())
  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear())
  const [showYearPicker, setShowYearPicker] = useState(false)
  const [yearDecade, setYearDecade] = useState(Math.floor(currentYear / 10) * 10)

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
    onSelect(date)
    onClose()
  }

  // Check if a date is selected
  const isDateSelected = (date: Date) => {
    return selected ? isSameDay(date, selected) : false
  }

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
      <div>
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

      days.push(
        <button
          key={`day-${day}`}
          type="button"
          className={cn(
            "h-9 w-9 rounded-md flex items-center justify-center text-sm",
            isSelected ? "bg-primary text-primary-foreground" : "hover:bg-muted",
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

  return (
    <div className="p-3 space-y-4">
      {showYearPicker ? (
        renderYearPicker()
      ) : (
        <>
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
        </>
      )}

      <div className="flex justify-end">
        <Button size="sm" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  )
}
