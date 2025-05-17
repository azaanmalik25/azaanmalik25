"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Hourglass, Play, Pause, RotateCcw, Bell, BellOff } from "lucide-react"
import { format } from "date-fns"

export function CountdownTimer() {
  // State for countdown settings
  const [targetDate, setTargetDate] = useState<Date | null>(null)
  const [eventName, setEventName] = useState("My Event")
  const [showNotification, setShowNotification] = useState(true)
  const [isRunning, setIsRunning] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // Custom countdown
  const [customDays, setCustomDays] = useState(0)
  const [customHours, setCustomHours] = useState(0)
  const [customMinutes, setCustomMinutes] = useState(0)
  const [customSeconds, setCustomSeconds] = useState(0)
  const [countdownType, setCountdownType] = useState("date")

  // References
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio("/notification.mp3") // This would be a notification sound
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  // Set default target date (24 hours from now)
  useEffect(() => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    setTargetDate(tomorrow)
  }, [])

  // Calculate time left
  const calculateTimeLeft = () => {
    if (!targetDate) return

    const now = new Date().getTime()
    const targetTime = targetDate.getTime()
    const difference = targetTime - now

    if (difference <= 0) {
      // Countdown finished
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      setIsRunning(false)
      if (intervalRef.current) clearInterval(intervalRef.current)

      // Play notification sound if enabled
      if (showNotification && audioRef.current) {
        audioRef.current.play().catch((e) => console.error("Error playing notification:", e))
      }

      return
    }

    // Calculate time units
    const days = Math.floor(difference / (1000 * 60 * 60 * 24))
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((difference % (1000 * 60)) / 1000)

    setTimeLeft({ days, hours, minutes, seconds })
  }

  // Start countdown
  const startCountdown = () => {
    if (!targetDate) return

    setIsRunning(true)
    calculateTimeLeft()

    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(calculateTimeLeft, 1000)
  }

  // Pause countdown
  const pauseCountdown = () => {
    setIsRunning(false)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  // Reset countdown
  const resetCountdown = () => {
    setIsRunning(false)
    if (intervalRef.current) clearInterval(intervalRef.current)

    if (countdownType === "date") {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      setTargetDate(tomorrow)
    } else {
      setCustomDays(0)
      setCustomHours(0)
      setCustomMinutes(0)
      setCustomSeconds(0)

      // Set target date based on custom time
      const newTarget = new Date()
      newTarget.setDate(newTarget.getDate() + customDays)
      newTarget.setHours(newTarget.getHours() + customHours)
      newTarget.setMinutes(newTarget.getMinutes() + customMinutes)
      newTarget.setSeconds(newTarget.getSeconds() + customSeconds)
      setTargetDate(newTarget)
    }

    setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  }

  // Handle date change
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value
    if (dateValue) {
      const newDate = new Date(dateValue)
      setTargetDate(newDate)
    }
  }

  // Handle custom time change
  useEffect(() => {
    if (countdownType === "custom") {
      const newTarget = new Date()
      newTarget.setDate(newTarget.getDate() + customDays)
      newTarget.setHours(newTarget.getHours() + customHours)
      newTarget.setMinutes(newTarget.getMinutes() + customMinutes)
      newTarget.setSeconds(newTarget.getSeconds() + customSeconds)
      setTargetDate(newTarget)
    }
  }, [countdownType, customDays, customHours, customMinutes, customSeconds])

  // Format time unit with leading zero
  const formatTimeUnit = (unit: number) => {
    return unit.toString().padStart(2, "0")
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Hourglass className="h-6 w-6 text-primary" />
          <CardTitle>Countdown Timer</CardTitle>
        </div>
        <CardDescription>Create a countdown to any date or event</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="setup" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="setup">Setup</TabsTrigger>
            <TabsTrigger value="countdown">Countdown</TabsTrigger>
          </TabsList>

          <TabsContent value="setup" className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="event-name">Event Name</Label>
                <Input
                  id="event-name"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  placeholder="Enter event name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="countdown-type">Countdown Type</Label>
                <Select value={countdownType} onValueChange={setCountdownType}>
                  <SelectTrigger id="countdown-type">
                    <SelectValue placeholder="Select countdown type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Specific Date & Time</SelectItem>
                    <SelectItem value="custom">Custom Duration</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {countdownType === "date" ? (
                <div className="space-y-2">
                  <Label htmlFor="target-date">Target Date & Time</Label>
                  <Input
                    id="target-date"
                    type="datetime-local"
                    value={targetDate ? format(targetDate, "yyyy-MM-dd'T'HH:mm") : ""}
                    onChange={handleDateChange}
                  />
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="custom-days">Days</Label>
                    <Input
                      id="custom-days"
                      type="number"
                      min="0"
                      value={customDays}
                      onChange={(e) => setCustomDays(Number(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="custom-hours">Hours</Label>
                    <Input
                      id="custom-hours"
                      type="number"
                      min="0"
                      max="23"
                      value={customHours}
                      onChange={(e) => setCustomHours(Number(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="custom-minutes">Minutes</Label>
                    <Input
                      id="custom-minutes"
                      type="number"
                      min="0"
                      max="59"
                      value={customMinutes}
                      onChange={(e) => setCustomMinutes(Number(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="custom-seconds">Seconds</Label>
                    <Input
                      id="custom-seconds"
                      type="number"
                      min="0"
                      max="59"
                      value={customSeconds}
                      onChange={(e) => setCustomSeconds(Number(e.target.value))}
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" onClick={() => setShowNotification(!showNotification)}>
                  {showNotification ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
                </Button>
                <span className="text-sm">{showNotification ? "Notifications enabled" : "Notifications disabled"}</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="countdown">
            <div className="text-center py-8">
              <h2 className="text-2xl font-bold mb-6">{eventName}</h2>

              <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-4xl font-bold">{formatTimeUnit(timeLeft.days)}</div>
                  <div className="text-sm text-muted-foreground">Days</div>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-4xl font-bold">{formatTimeUnit(timeLeft.hours)}</div>
                  <div className="text-sm text-muted-foreground">Hours</div>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-4xl font-bold">{formatTimeUnit(timeLeft.minutes)}</div>
                  <div className="text-sm text-muted-foreground">Minutes</div>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-4xl font-bold">{formatTimeUnit(timeLeft.seconds)}</div>
                  <div className="text-sm text-muted-foreground">Seconds</div>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                {!isRunning ? (
                  <Button onClick={startCountdown}>
                    <Play className="h-4 w-4 mr-2" />
                    Start
                  </Button>
                ) : (
                  <Button onClick={pauseCountdown}>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </Button>
                )}
                <Button variant="outline" onClick={resetCountdown}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>

              {targetDate && (
                <div className="mt-6 text-sm text-muted-foreground">Counting down to: {format(targetDate, "PPpp")}</div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
