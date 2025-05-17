"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { format, differenceInDays, isWeekend, addDays, isWithinInterval } from "date-fns"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import type { DateRange } from "react-day-picker"
import { Calendar } from "@/components/ui/calendar"

interface Holiday {
  id: string
  date: Date
  name: string
}

export function WorkingDaysCalculator() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)
  const [includeStartDay, setIncludeStartDay] = useState(true)
  const [includeEndDay, setIncludeEndDay] = useState(true)
  const [excludeWeekends, setExcludeWeekends] = useState(true)
  const [holidays, setHolidays] = useState<Holiday[]>([])
  const [newHolidayDate, setNewHolidayDate] = useState<Date | undefined>(undefined)
  const [newHolidayName, setNewHolidayName] = useState("")
  const [holidayPopoverOpen, setHolidayPopoverOpen] = useState(false)

  // Calculate working days
  const calculateWorkingDays = () => {
    if (!dateRange?.from || !dateRange?.to) return null

    const startDate = dateRange.from
    const endDate = dateRange.to

    // Calculate total days
    let totalDays = differenceInDays(endDate, startDate) + 1

    // Adjust for start and end days if needed
    if (!includeStartDay) totalDays--
    if (!includeEndDay) totalDays--

    // Calculate weekend days
    let weekendDays = 0
    if (excludeWeekends) {
      let currentDate = new Date(startDate)
      if (!includeStartDay) currentDate = addDays(currentDate, 1)

      const lastDate = new Date(endDate)
      if (!includeEndDay) lastDate.setDate(lastDate.getDate() - 1)

      while (currentDate <= lastDate) {
        if (isWeekend(currentDate)) {
          weekendDays++
        }
        currentDate.setDate(currentDate.getDate() + 1)
      }
    }

    // Calculate holiday days (excluding weekends if needed)
    let holidayDays = 0
    if (holidays.length > 0) {
      let currentDate = new Date(startDate)
      if (!includeStartDay) currentDate = addDays(currentDate, 1)

      const lastDate = new Date(endDate)
      if (!includeEndDay) lastDate.setDate(lastDate.getDate() - 1)

      const dateRange = { start: currentDate, end: lastDate }

      for (const holiday of holidays) {
        if (isWithinInterval(holiday.date, dateRange)) {
          // Only count if it's not already counted as a weekend
          if (!excludeWeekends || !isWeekend(holiday.date)) {
            holidayDays++
          }
        }
      }
    }

    // Calculate working days
    const workingDays = totalDays - weekendDays - holidayDays

    return {
      totalDays,
      weekendDays,
      holidayDays,
      workingDays,
    }
  }

  // Add a new holiday
  const addHoliday = () => {
    if (!newHolidayDate || !newHolidayName.trim()) return

    const newHoliday: Holiday = {
      id: Date.now().toString(),
      date: newHolidayDate,
      name: newHolidayName.trim(),
    }

    setHolidays([...holidays, newHoliday])
    setNewHolidayDate(undefined)
    setNewHolidayName("")
    setHolidayPopoverOpen(false)
  }

  // Remove a holiday
  const removeHoliday = (id: string) => {
    setHolidays(holidays.filter((holiday) => holiday.id !== id))
  }

  const result = calculateWorkingDays()

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="date-range">Select Date Range</Label>
        <DateRangePicker dateRange={dateRange} onDateRangeChange={setDateRange} />
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="include-start"
            checked={includeStartDay}
            onCheckedChange={(checked) => setIncludeStartDay(checked as boolean)}
          />
          <Label htmlFor="include-start">Include start date</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="include-end"
            checked={includeEndDay}
            onCheckedChange={(checked) => setIncludeEndDay(checked as boolean)}
          />
          <Label htmlFor="include-end">Include end date</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="exclude-weekends"
            checked={excludeWeekends}
            onCheckedChange={(checked) => setExcludeWeekends(checked as boolean)}
          />
          <Label htmlFor="exclude-weekends">Exclude weekends (Saturday & Sunday)</Label>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Holidays</Label>
          <Popover open={holidayPopoverOpen} onOpenChange={setHolidayPopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                Add Holiday
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h4 className="font-medium text-sm">Add New Holiday</h4>
                <div className="space-y-2">
                  <Label htmlFor="holiday-date">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="holiday-date"
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !newHolidayDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newHolidayDate ? format(newHolidayDate, "PPP") : <span>Select date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={newHolidayDate} onSelect={setNewHolidayDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="holiday-name">Holiday Name</Label>
                  <Input
                    id="holiday-name"
                    value={newHolidayName}
                    onChange={(e) => setNewHolidayName(e.target.value)}
                    placeholder="e.g. Christmas Day"
                  />
                </div>
                <Button onClick={addHoliday} className="w-full">
                  Add Holiday
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {holidays.length > 0 ? (
          <div className="border rounded-md divide-y">
            {holidays.map((holiday) => (
              <div key={holiday.id} className="flex items-center justify-between p-3">
                <div>
                  <p className="font-medium">{holiday.name}</p>
                  <p className="text-sm text-muted-foreground">{format(holiday.date, "PPP")}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => removeHoliday(holiday.id)}>
                  Remove
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No holidays added yet.</p>
        )}
      </div>

      {dateRange?.from && dateRange?.to && result && (
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Working Days</p>
                <p className="text-2xl font-bold">{result.workingDays}</p>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">Total Days</p>
                <p className="text-2xl font-bold">{result.totalDays}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Weekend Days</p>
                <p className="text-lg font-medium">{result.weekendDays}</p>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">Holiday Days</p>
                <p className="text-lg font-medium">{result.holidayDays}</p>
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
    </div>
  )
}
