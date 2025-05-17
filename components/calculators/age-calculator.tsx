"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CustomCalendar } from "@/components/custom-calendar"

export function AgeCalculator() {
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined)
  const [birthHours, setBirthHours] = useState<number>(0)
  const [birthMinutes, setBirthMinutes] = useState<number>(0)
  const [age, setAge] = useState<{
    years: number
    months: number
    days: number
    hours: number
    minutes: number
  } | null>(null)
  const [totalDays, setTotalDays] = useState<number | null>(null)
  const [open, setOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState<Date>(new Date())

  const today = new Date()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (birthDate) {
      calculateAge(birthDate, currentTime)
    }
  }, [birthDate, birthHours, birthMinutes, currentTime])

  const calculateAge = (birthDate: Date, currentDate: Date) => {
    // Clone dates to avoid modifying the originals
    const birth = new Date(birthDate)
    const current = new Date(currentDate)

    // Set the birth time
    birth.setHours(birthHours, birthMinutes, 0, 0)

    // Calculate the time difference in milliseconds
    const diffTime = current.getTime() - birth.getTime()

    // Calculate total days lived
    const totalDaysLived = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    setTotalDays(totalDaysLived)

    // Calculate years
    let years = current.getFullYear() - birth.getFullYear()

    // Calculate months
    let months = current.getMonth() - birth.getMonth()

    // Calculate days
    let days = current.getDate() - birth.getDate()

    // Calculate hours and minutes
    let hours = current.getHours() - birth.getHours()
    let minutes = current.getMinutes() - birth.getMinutes()

    // Adjust minutes and hours if minutes are negative
    if (minutes < 0) {
      minutes += 60
      hours--
    }

    // Adjust hours and days if hours are negative
    if (hours < 0) {
      hours += 24
      days--
    }

    // Adjust months and years if days are negative
    if (days < 0) {
      // Get the last day of the previous month
      const lastMonth = new Date(current.getFullYear(), current.getMonth(), 0)
      days += lastMonth.getDate()
      months--
    }

    // Adjust years if months are negative
    if (months < 0) {
      months += 12
      years--
    }

    setAge({ years, months, days, hours, minutes })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="birth-date">Date of Birth</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="birth-date"
              variant="outline"
              className={cn("w-full justify-start text-left font-normal", !birthDate && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {birthDate ? format(birthDate, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CustomCalendar
              mode="single"
              selected={birthDate}
              onSelect={(date) => {
                setBirthDate(date)
                setOpen(false)
              }}
              disabled={(date) => date > today}
              fromYear={1900}
              toYear={new Date().getFullYear()}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label htmlFor="birth-time">Time of Birth (Optional)</Label>
        <div className="flex space-x-2 items-center">
          <div className="flex-1">
            <Label htmlFor="birth-hours" className="text-xs">
              Hours
            </Label>
            <Input
              id="birth-hours"
              type="number"
              min="0"
              max="23"
              value={birthHours}
              onChange={(e) => setBirthHours(Number.parseInt(e.target.value) || 0)}
              placeholder="HH"
            />
          </div>
          <span className="text-xl mt-4">:</span>
          <div className="flex-1">
            <Label htmlFor="birth-minutes" className="text-xs">
              Minutes
            </Label>
            <Input
              id="birth-minutes"
              type="number"
              min="0"
              max="59"
              value={birthMinutes}
              onChange={(e) => setBirthMinutes(Number.parseInt(e.target.value) || 0)}
              placeholder="MM"
            />
          </div>
        </div>
      </div>

      {age && (
        <div className="space-y-4">
          <div className="grid grid-cols-5 gap-2 text-center">
            <div className="bg-primary/10 p-3 rounded-md">
              <p className="text-2xl font-bold">{age.years}</p>
              <p className="text-xs text-muted-foreground">Years</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-md">
              <p className="text-2xl font-bold">{age.months}</p>
              <p className="text-xs text-muted-foreground">Months</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-md">
              <p className="text-2xl font-bold">{age.days}</p>
              <p className="text-xs text-muted-foreground">Days</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-md">
              <p className="text-2xl font-bold">{age.hours}</p>
              <p className="text-xs text-muted-foreground">Hours</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-md">
              <p className="text-2xl font-bold">{age.minutes}</p>
              <p className="text-xs text-muted-foreground">Minutes</p>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-md">
            <p className="text-sm">
              <span className="font-medium">Total days: </span>
              {totalDays?.toLocaleString()}
            </p>
            <p className="text-sm">
              <span className="font-medium">Total months: </span>
              {(age.years * 12 + age.months).toLocaleString()}
            </p>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        {birthDate && (
          <Button
            variant="outline"
            onClick={() => {
              setBirthDate(undefined)
              setBirthHours(0)
              setBirthMinutes(0)
              setAge(null)
              setTotalDays(null)
            }}
          >
            Reset
          </Button>
        )}
        <div className="text-sm text-muted-foreground">
          {birthDate ? (
            <div className="flex items-center">
              <span>Now: {format(currentTime, "PPP")} </span>
              <Clock className="h-3 w-3 mx-1" />
              <span>{currentTime.toLocaleTimeString()}</span>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  )
}
