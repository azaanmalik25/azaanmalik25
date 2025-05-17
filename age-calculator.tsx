"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Clock, Gift, CalendarIcon as CalendarFull, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { format, addYears, differenceInDays } from "date-fns"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Switch } from "@/components/ui/switch"

export default function AgeCalculator() {
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
  const [totalSeconds, setTotalSeconds] = useState<number | null>(null)
  const [open, setOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState<Date>(new Date())
  const [nextBirthday, setNextBirthday] = useState<{ date: Date; daysRemaining: number } | null>(null)
  const [zodiacSign, setZodiacSign] = useState<string>("")
  const [dayOfWeek, setDayOfWeek] = useState<string>("")
  const [yearProgress, setYearProgress] = useState<number>(0)
  const [showFutureAge, setShowFutureAge] = useState<boolean>(false)
  const [futureDate, setFutureDate] = useState<Date>(addYears(new Date(), 10))
  const [futureAge, setFutureAge] = useState<{ years: number; months: number; days: number } | null>(null)
  const [openFutureDate, setOpenFutureDate] = useState(false)

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
      calculateZodiacSign(birthDate)
      calculateDayOfWeek(birthDate)
      calculateNextBirthday(birthDate)

      if (showFutureAge) {
        calculateFutureAge(birthDate, futureDate)
      }
    }

    // Calculate year progress
    const startOfYear = new Date(currentTime.getFullYear(), 0, 1)
    const endOfYear = new Date(currentTime.getFullYear(), 11, 31)
    const daysPassed = differenceInDays(currentTime, startOfYear)
    const totalDaysInYear = differenceInDays(endOfYear, startOfYear) + 1
    setYearProgress(Math.round((daysPassed / totalDaysInYear) * 100))
  }, [birthDate, birthHours, birthMinutes, currentTime, futureDate, showFutureAge])

  const calculateAge = (birthDate: Date, currentDate: Date) => {
    // Clone dates to avoid modifying the originals
    const birth = new Date(birthDate)
    const current = new Date(currentDate)

    // Set the birth time
    birth.setHours(birthHours, birthMinutes, 0, 0)

    // Calculate the time difference in milliseconds
    const diffTime = current.getTime() - birth.getTime()

    // Calculate total days and seconds lived
    const totalDaysLived = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    const totalSecondsLived = Math.floor(diffTime / 1000)
    setTotalDays(totalDaysLived)
    setTotalSeconds(totalSecondsLived)

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

  const calculateZodiacSign = (date: Date) => {
    const day = date.getDate()
    const month = date.getMonth() + 1 // JavaScript months are 0-indexed

    let sign = ""

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
      sign = "Aries ♈"
    } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
      sign = "Taurus ♉"
    } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
      sign = "Gemini ♊"
    } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
      sign = "Cancer ♋"
    } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
      sign = "Leo ♌"
    } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
      sign = "Virgo ♍"
    } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
      sign = "Libra ♎"
    } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
      sign = "Scorpio ♏"
    } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
      sign = "Sagittarius ♐"
    } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
      sign = "Capricorn ♑"
    } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
      sign = "Aquarius ♒"
    } else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
      sign = "Pisces ♓"
    }

    setZodiacSign(sign)
  }

  const calculateDayOfWeek = (date: Date) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    setDayOfWeek(days[date.getDay()])
  }

  const calculateNextBirthday = (birthDate: Date) => {
    const today = new Date()
    const currentYear = today.getFullYear()

    // Create date for this year's birthday
    const thisYearBirthday = new Date(currentYear, birthDate.getMonth(), birthDate.getDate())

    // If birthday has already occurred this year, calculate for next year
    if (today > thisYearBirthday) {
      const nextYearBirthday = new Date(currentYear + 1, birthDate.getMonth(), birthDate.getDate())
      const daysRemaining = differenceInDays(nextYearBirthday, today)
      setNextBirthday({ date: nextYearBirthday, daysRemaining })
    } else {
      const daysRemaining = differenceInDays(thisYearBirthday, today)
      setNextBirthday({ date: thisYearBirthday, daysRemaining })
    }
  }

  const calculateFutureAge = (birthDate: Date, futureDate: Date) => {
    // Clone dates to avoid modifying the originals
    const birth = new Date(birthDate)
    const future = new Date(futureDate)

    // Calculate years
    let years = future.getFullYear() - birth.getFullYear()

    // Calculate months
    let months = future.getMonth() - birth.getMonth()

    // Calculate days
    let days = future.getDate() - birth.getDate()

    // Adjust months and years if days are negative
    if (days < 0) {
      // Get the last day of the previous month
      const lastMonth = new Date(future.getFullYear(), future.getMonth(), 0)
      days += lastMonth.getDate()
      months--
    }

    // Adjust years if months are negative
    if (months < 0) {
      months += 12
      years--
    }

    setFutureAge({ years, months, days })
  }

  const formatNumber = (num: number): string => {
    return num.toLocaleString()
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Advanced Age Calculator</CardTitle>
        <CardDescription>Calculate your exact age with additional insights</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Select your birth date</label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !birthDate && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {birthDate ? format(birthDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={birthDate}
                onSelect={(date) => {
                  setBirthDate(date)
                  setOpen(false)
                }}
                disabled={(date) => date > today}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2 mt-4">
          <Label htmlFor="birth-time">Time of Birth</Label>
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
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="detailed">Detailed</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
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

              {nextBirthday && (
                <div className="bg-muted p-4 rounded-md flex items-center space-x-3">
                  <Gift className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Next Birthday</p>
                    <p className="text-sm text-muted-foreground">
                      In {nextBirthday.daysRemaining} days ({format(nextBirthday.date, "MMMM d, yyyy")})
                    </p>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="detailed" className="space-y-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="total-time">
                  <AccordionTrigger>Total Time Units</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Total years:</span>
                        <span className="font-medium">{age.years}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Total months:</span>
                        <span className="font-medium">{formatNumber(age.years * 12 + age.months)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Total weeks:</span>
                        <span className="font-medium">{formatNumber(Math.floor((totalDays || 0) / 7))}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Total days:</span>
                        <span className="font-medium">{formatNumber(totalDays || 0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Total hours:</span>
                        <span className="font-medium">{formatNumber((totalDays || 0) * 24 + age.hours)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Total minutes:</span>
                        <span className="font-medium">
                          {formatNumber(((totalDays || 0) * 24 + age.hours) * 60 + age.minutes)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Total seconds:</span>
                        <span className="font-medium">{formatNumber(totalSeconds || 0)}</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="future-age">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <span>Age at Future Date</span>
                      <Switch
                        className="ml-2"
                        checked={showFutureAge}
                        onCheckedChange={setShowFutureAge}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {showFutureAge && (
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Select future date</label>
                          <Popover open={openFutureDate} onOpenChange={setOpenFutureDate}>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full justify-start text-left font-normal">
                                <CalendarFull className="mr-2 h-4 w-4" />
                                {format(futureDate, "PPP")}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={futureDate}
                                onSelect={(date) => {
                                  if (date && date > (birthDate || new Date())) {
                                    setFutureDate(date)
                                    setOpenFutureDate(false)
                                  }
                                }}
                                disabled={(date) => date < (birthDate || new Date())}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>

                        {futureAge && (
                          <div className="bg-muted p-3 rounded-md">
                            <p className="text-sm font-medium">On {format(futureDate, "MMMM d, yyyy")}, you will be:</p>
                            <p className="text-lg font-bold mt-1">
                              {futureAge.years} years, {futureAge.months} months, {futureAge.days} days
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="milestones">
                  <AccordionTrigger>Upcoming Milestones</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {[25, 30, 40, 50, 60, 70, 80, 90, 100]
                        .filter((milestone) => milestone > age.years)
                        .slice(0, 3)
                        .map((milestone) => {
                          const yearsToMilestone = milestone - age.years
                          const milestoneDate = new Date(birthDate!)
                          milestoneDate.setFullYear(milestoneDate.getFullYear() + milestone)

                          return (
                            <div key={milestone} className="flex justify-between items-center">
                              <span className="text-sm">{milestone} years old:</span>
                              <span className="font-medium">{format(milestoneDate, "MMM d, yyyy")}</span>
                            </div>
                          )
                        })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            <TabsContent value="insights" className="space-y-4">
              <div className="space-y-3">
                <div className="bg-muted p-3 rounded-md flex items-center space-x-3">
                  <Info className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Born on a {dayOfWeek}</p>
                    <p className="text-sm text-muted-foreground">Zodiac Sign: {zodiacSign}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Current Year Progress</span>
                    <span className="text-sm">{yearProgress}%</span>
                  </div>
                  <Progress value={yearProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {format(currentTime, "MMM d")} - Day {Math.ceil((yearProgress / 100) * 365)} of the year
                  </p>
                </div>

                <div className="bg-muted p-3 rounded-md">
                  <p className="text-sm font-medium">Life Expectancy</p>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Global Average (72 years):</span>
                      <span className="font-medium">{Math.max(0, 72 - age.years)} years remaining</span>
                    </div>
                    <Progress value={Math.min(100, (age.years / 72) * 100)} className="h-2" />

                    <div className="flex justify-between mt-1">
                      <span className="text-sm">Developed Countries (80 years):</span>
                      <span className="font-medium">{Math.max(0, 80 - age.years)} years remaining</span>
                    </div>
                    <Progress value={Math.min(100, (age.years / 80) * 100)} className="h-2" />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {birthDate && (
          <Button
            variant="outline"
            onClick={() => {
              setBirthDate(undefined)
              setBirthHours(0)
              setBirthMinutes(0)
              setAge(null)
              setTotalDays(null)
              setTotalSeconds(null)
              setZodiacSign("")
              setDayOfWeek("")
              setNextBirthday(null)
              setShowFutureAge(false)
              setFutureAge(null)
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
      </CardFooter>
    </Card>
  )
}
