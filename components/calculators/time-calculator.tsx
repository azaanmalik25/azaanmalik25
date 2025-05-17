"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function TimeCalculator() {
  // Add/Subtract Time
  const [hours1, setHours1] = useState<number | "">("")
  const [minutes1, setMinutes1] = useState<number | "">("")
  const [seconds1, setSeconds1] = useState<number | "">("")
  const [hours2, setHours2] = useState<number | "">("")
  const [minutes2, setMinutes2] = useState<number | "">("")
  const [seconds2, setSeconds2] = useState<number | "">("")
  const [operation, setOperation] = useState("add")
  const [resultTime, setResultTime] = useState<{ hours: number; minutes: number; seconds: number } | null>(null)

  // Time Difference
  const [startHours, setStartHours] = useState<number | "">("")
  const [startMinutes, setStartMinutes] = useState<number | "">("")
  const [endHours, setEndHours] = useState<number | "">("")
  const [endMinutes, setEndMinutes] = useState<number | "">("")
  const [diffResult, setDiffResult] = useState<{ hours: number; minutes: number } | null>(null)

  // Time to Decimal
  const [timeHours, setTimeHours] = useState<number | "">("")
  const [timeMinutes, setTimeMinutes] = useState<number | "">("")
  const [decimalResult, setDecimalResult] = useState<number | null>(null)

  // Decimal to Time
  const [decimalHours, setDecimalHours] = useState<number | "">("")
  const [timeResult, setTimeResult] = useState<{ hours: number; minutes: number } | null>(null)

  const calculateTime = () => {
    if (hours1 === "" && minutes1 === "" && seconds1 === "") return

    const h1 = Number(hours1) || 0
    const m1 = Number(minutes1) || 0
    const s1 = Number(seconds1) || 0

    const h2 = Number(hours2) || 0
    const m2 = Number(minutes2) || 0
    const s2 = Number(seconds2) || 0

    let totalSeconds = 0

    if (operation === "add") {
      totalSeconds = h1 * 3600 + m1 * 60 + s1 + (h2 * 3600 + m2 * 60 + s2)
    } else {
      totalSeconds = h1 * 3600 + m1 * 60 + s1 - (h2 * 3600 + m2 * 60 + s2)
      if (totalSeconds < 0) totalSeconds = 0 // Prevent negative time
    }

    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    setResultTime({ hours, minutes, seconds })
  }

  const calculateTimeDifference = () => {
    if (startHours === "" && startMinutes === "" && endHours === "" && endMinutes === "") return

    const startTotalMinutes = (Number(startHours) || 0) * 60 + (Number(startMinutes) || 0)
    const endTotalMinutes = (Number(endHours) || 0) * 60 + (Number(endMinutes) || 0)

    let diffMinutes = endTotalMinutes - startTotalMinutes
    if (diffMinutes < 0) diffMinutes += 24 * 60 // Wrap around for next day

    const hours = Math.floor(diffMinutes / 60)
    const minutes = diffMinutes % 60

    setDiffResult({ hours, minutes })
  }

  const convertTimeToDecimal = () => {
    if (timeHours === "" && timeMinutes === "") return

    const hours = Number(timeHours) || 0
    const minutes = Number(timeMinutes) || 0

    const decimal = hours + minutes / 60

    setDecimalResult(decimal)
  }

  const convertDecimalToTime = () => {
    if (decimalHours === "") return

    const decimal = Number(decimalHours)

    const hours = Math.floor(decimal)
    const minutes = Math.round((decimal - hours) * 60)

    setTimeResult({ hours, minutes })
  }

  const formatTime = (time: { hours: number; minutes: number; seconds?: number }) => {
    const h = time.hours.toString().padStart(2, "0")
    const m = time.minutes.toString().padStart(2, "0")
    const s = time.seconds !== undefined ? time.seconds.toString().padStart(2, "0") : undefined

    return s !== undefined ? `${h}:${m}:${s}` : `${h}:${m}`
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="add-subtract" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="add-subtract">Add/Subtract</TabsTrigger>
          <TabsTrigger value="difference">Time Difference</TabsTrigger>
          <TabsTrigger value="to-decimal">Time to Decimal</TabsTrigger>
          <TabsTrigger value="from-decimal">Decimal to Time</TabsTrigger>
        </TabsList>

        <TabsContent value="add-subtract" className="space-y-4">
          <div className="space-y-2">
            <Label>First Time</Label>
            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1">
                <Label htmlFor="hours1" className="text-xs">
                  Hours
                </Label>
                <Input
                  id="hours1"
                  type="number"
                  min="0"
                  placeholder="HH"
                  value={hours1}
                  onChange={(e) => setHours1(e.target.value ? Number(e.target.value) : "")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="minutes1" className="text-xs">
                  Minutes
                </Label>
                <Input
                  id="minutes1"
                  type="number"
                  min="0"
                  max="59"
                  placeholder="MM"
                  value={minutes1}
                  onChange={(e) => setMinutes1(e.target.value ? Number(e.target.value) : "")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="seconds1" className="text-xs">
                  Seconds
                </Label>
                <Input
                  id="seconds1"
                  type="number"
                  min="0"
                  max="59"
                  placeholder="SS"
                  value={seconds1}
                  onChange={(e) => setSeconds1(e.target.value ? Number(e.target.value) : "")}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Operation</Label>
            <RadioGroup defaultValue="add" onValueChange={setOperation} className="flex">
              <div className="flex items-center space-x-2 flex-1">
                <RadioGroupItem value="add" id="add" />
                <Label htmlFor="add" className="cursor-pointer">
                  Add
                </Label>
              </div>
              <div className="flex items-center space-x-2 flex-1">
                <RadioGroupItem value="subtract" id="subtract" />
                <Label htmlFor="subtract" className="cursor-pointer">
                  Subtract
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Second Time</Label>
            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1">
                <Label htmlFor="hours2" className="text-xs">
                  Hours
                </Label>
                <Input
                  id="hours2"
                  type="number"
                  min="0"
                  placeholder="HH"
                  value={hours2}
                  onChange={(e) => setHours2(e.target.value ? Number(e.target.value) : "")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="minutes2" className="text-xs">
                  Minutes
                </Label>
                <Input
                  id="minutes2"
                  type="number"
                  min="0"
                  max="59"
                  placeholder="MM"
                  value={minutes2}
                  onChange={(e) => setMinutes2(e.target.value ? Number(e.target.value) : "")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="seconds2" className="text-xs">
                  Seconds
                </Label>
                <Input
                  id="seconds2"
                  type="number"
                  min="0"
                  max="59"
                  placeholder="SS"
                  value={seconds2}
                  onChange={(e) => setSeconds2(e.target.value ? Number(e.target.value) : "")}
                />
              </div>
            </div>
          </div>

          <Button onClick={calculateTime} className="w-full">
            Calculate
          </Button>

          {resultTime && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Result</p>
                  <p className="text-2xl font-bold">{formatTime(resultTime)}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="difference" className="space-y-4">
          <div className="space-y-2">
            <Label>Start Time</Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label htmlFor="start-hours" className="text-xs">
                  Hours
                </Label>
                <Input
                  id="start-hours"
                  type="number"
                  min="0"
                  max="23"
                  placeholder="HH"
                  value={startHours}
                  onChange={(e) => setStartHours(e.target.value ? Number(e.target.value) : "")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="start-minutes" className="text-xs">
                  Minutes
                </Label>
                <Input
                  id="start-minutes"
                  type="number"
                  min="0"
                  max="59"
                  placeholder="MM"
                  value={startMinutes}
                  onChange={(e) => setStartMinutes(e.target.value ? Number(e.target.value) : "")}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>End Time</Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label htmlFor="end-hours" className="text-xs">
                  Hours
                </Label>
                <Input
                  id="end-hours"
                  type="number"
                  min="0"
                  max="23"
                  placeholder="HH"
                  value={endHours}
                  onChange={(e) => setEndHours(e.target.value ? Number(e.target.value) : "")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="end-minutes" className="text-xs">
                  Minutes
                </Label>
                <Input
                  id="end-minutes"
                  type="number"
                  min="0"
                  max="59"
                  placeholder="MM"
                  value={endMinutes}
                  onChange={(e) => setEndMinutes(e.target.value ? Number(e.target.value) : "")}
                />
              </div>
            </div>
          </div>

          <Button onClick={calculateTimeDifference} className="w-full">
            Calculate
          </Button>

          {diffResult && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Time Difference</p>
                  <p className="text-2xl font-bold">{formatTime(diffResult)}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="to-decimal" className="space-y-4">
          <div className="space-y-2">
            <Label>Time</Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label htmlFor="time-hours" className="text-xs">
                  Hours
                </Label>
                <Input
                  id="time-hours"
                  type="number"
                  min="0"
                  placeholder="HH"
                  value={timeHours}
                  onChange={(e) => setTimeHours(e.target.value ? Number(e.target.value) : "")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="time-minutes" className="text-xs">
                  Minutes
                </Label>
                <Input
                  id="time-minutes"
                  type="number"
                  min="0"
                  max="59"
                  placeholder="MM"
                  value={timeMinutes}
                  onChange={(e) => setTimeMinutes(e.target.value ? Number(e.target.value) : "")}
                />
              </div>
            </div>
          </div>

          <Button onClick={convertTimeToDecimal} className="w-full">
            Convert
          </Button>

          {decimalResult !== null && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Decimal Hours</p>
                  <p className="text-2xl font-bold">{decimalResult.toFixed(2)}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="from-decimal" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="decimal-hours">Decimal Hours</Label>
            <Input
              id="decimal-hours"
              type="number"
              min="0"
              step="0.01"
              placeholder="e.g. 1.5"
              value={decimalHours}
              onChange={(e) => setDecimalHours(e.target.value ? Number(e.target.value) : "")}
            />
          </div>

          <Button onClick={convertDecimalToTime} className="w-full">
            Convert
          </Button>

          {timeResult && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="text-2xl font-bold">{formatTime(timeResult)}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
