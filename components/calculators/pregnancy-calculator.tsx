"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { format, addDays, addWeeks, differenceInDays, isBefore } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export function PregnancyCalculator() {
  // State for LMP method
  const [lmpDate, setLmpDate] = useState<Date | undefined>(undefined)
  const [lmpCycleLength, setLmpCycleLength] = useState<string>("28")
  const [lmpResults, setLmpResults] = useState<any>(null)

  // State for Conception method
  const [conceptionDate, setConceptionDate] = useState<Date | undefined>(undefined)
  const [conceptionResults, setConceptionResults] = useState<any>(null)

  // State for Due Date method
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined)
  const [dueDateResults, setDueDateResults] = useState<any>(null)

  // State for Ultrasound method
  const [ultrasoundDate, setUltrasoundDate] = useState<Date | undefined>(undefined)
  const [measurementType, setMeasurementType] = useState<string>("weeks")
  const [weeksValue, setWeeksValue] = useState<string>("")
  const [daysValue, setDaysValue] = useState<string>("")
  const [ultrasoundResults, setUltrasoundResults] = useState<any>(null)

  // Calculate due date from LMP
  const calculateFromLMP = () => {
    if (!lmpDate) return

    const cycleLength = Number.parseInt(lmpCycleLength) || 28
    const ovulationDay = cycleLength - 14

    // Naegele's rule with cycle length adjustment
    const dueDate = addDays(addWeeks(lmpDate, 40), ovulationDay - 14)
    const conception = addDays(lmpDate, ovulationDay)

    calculateMilestones(lmpDate, dueDate, conception, "lmp")
  }

  // Calculate due date from conception date
  const calculateFromConception = () => {
    if (!conceptionDate) return

    const dueDate = addWeeks(conceptionDate, 38)
    const lmp = addDays(conceptionDate, -14)

    calculateMilestones(lmp, dueDate, conceptionDate, "conception")
  }

  // Calculate from known due date
  const calculateFromDueDate = () => {
    if (!dueDate) return

    const lmp = addWeeks(dueDate, -40)
    const conception = addWeeks(dueDate, -38)

    calculateMilestones(lmp, dueDate, conception, "dueDate")
  }

  // Calculate from ultrasound measurements
  const calculateFromUltrasound = () => {
    if (!ultrasoundDate || (!weeksValue && !daysValue)) return

    const weeks = Number.parseInt(weeksValue) || 0
    const days = Number.parseInt(daysValue) || 0

    let gestationalAge
    if (measurementType === "weeks") {
      gestationalAge = weeks * 7 + days
    } else {
      // CRL in mm to days (approximate formula)
      const crl = Number.parseInt(weeksValue)
      gestationalAge = Math.round(8.052 * Math.sqrt(crl) + 23.73)
    }

    const lmp = addDays(ultrasoundDate, -gestationalAge)
    const dueDate = addWeeks(lmp, 40)
    const conception = addWeeks(lmp, 2)

    calculateMilestones(lmp, dueDate, conception, "ultrasound")
  }

  // Calculate pregnancy milestones
  const calculateMilestones = (lmp: Date, dueDate: Date, conception: Date, method: string) => {
    const today = new Date()

    // Calculate current gestational age
    const daysPregnant = differenceInDays(today, lmp)
    const weeksPregnant = Math.floor(daysPregnant / 7)
    const daysRemainder = daysPregnant % 7

    // Calculate days remaining
    const daysRemaining = differenceInDays(dueDate, today)

    // Calculate trimesters
    const firstTrimesterEnd = addWeeks(lmp, 13)
    const secondTrimesterEnd = addWeeks(lmp, 26)

    // Key milestones
    const milestones = [
      { name: "Heartbeat Detectable", date: addWeeks(lmp, 6), description: "Baby's heartbeat can be detected" },
      {
        name: "End of First Trimester",
        date: firstTrimesterEnd,
        description: "Risk of miscarriage decreases significantly",
      },
      { name: "Gender Visible", date: addWeeks(lmp, 18), description: "Baby's gender may be visible on ultrasound" },
      { name: "Viability", date: addWeeks(lmp, 24), description: "Baby has a chance of survival if born prematurely" },
      { name: "Third Trimester Begins", date: addWeeks(lmp, 27), description: "Final stage of pregnancy begins" },
      { name: "Full Term", date: addWeeks(lmp, 37), description: "Baby is considered full term" },
      { name: "Due Date", date: dueDate, description: "Estimated date of delivery" },
    ]

    // Current trimester
    let currentTrimester = 1
    if (isBefore(firstTrimesterEnd, today) && isBefore(today, secondTrimesterEnd)) {
      currentTrimester = 2
    } else if (isBefore(secondTrimesterEnd, today)) {
      currentTrimester = 3
    }

    const results = {
      lmpDate: lmp,
      conceptionDate: conception,
      dueDate,
      gestationalAge: {
        weeks: weeksPregnant,
        days: daysRemainder,
      },
      daysRemaining,
      currentTrimester,
      milestones: milestones.filter((m) => isBefore(today, m.date)),
      completed: daysPregnant > 0 ? Math.min(Math.round((daysPregnant / 280) * 100), 100) : 0,
    }

    // Set results based on calculation method
    if (method === "lmp") {
      setLmpResults(results)
    } else if (method === "conception") {
      setConceptionResults(results)
    } else if (method === "dueDate") {
      setDueDateResults(results)
    } else if (method === "ultrasound") {
      setUltrasoundResults(results)
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="lmp" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="lmp">Last Period</TabsTrigger>
          <TabsTrigger value="conception">Conception</TabsTrigger>
          <TabsTrigger value="duedate">Due Date</TabsTrigger>
          <TabsTrigger value="ultrasound">Ultrasound</TabsTrigger>
        </TabsList>

        {/* LMP Method */}
        <TabsContent value="lmp" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="lmp-date">First day of last menstrual period</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal mt-1",
                        !lmpDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {lmpDate ? format(lmpDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={lmpDate} onSelect={setLmpDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label htmlFor="cycle-length">Average menstrual cycle length (days)</Label>
                <Select value={lmpCycleLength} onValueChange={setLmpCycleLength}>
                  <SelectTrigger id="cycle-length">
                    <SelectValue placeholder="Select cycle length" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 15 }, (_, i) => i + 21).map((days) => (
                      <SelectItem key={days} value={days.toString()}>
                        {days} days
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={calculateFromLMP} className="w-full">
                Calculate Due Date
              </Button>
            </div>

            <Card>
              <CardContent className="p-6">
                {lmpResults ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold">{format(lmpResults.dueDate, "MMMM d, yyyy")}</h3>
                      <p className="text-muted-foreground">Estimated Due Date</p>
                    </div>

                    <div className="space-y-2">
                      <p>
                        <strong>Current gestational age:</strong> {lmpResults.gestationalAge.weeks} weeks and{" "}
                        {lmpResults.gestationalAge.days} days
                      </p>
                      <p>
                        <strong>Conception date:</strong> {format(lmpResults.conceptionDate, "MMMM d, yyyy")}
                      </p>
                      <p>
                        <strong>Current trimester:</strong> {lmpResults.currentTrimester}
                      </p>
                      <p>
                        <strong>Days remaining:</strong> {lmpResults.daysRemaining}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="font-medium">Pregnancy progress:</p>
                      <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-primary h-full" style={{ width: `${lmpResults.completed}%` }}></div>
                      </div>
                      <p className="text-sm text-right">{lmpResults.completed}% complete</p>
                    </div>

                    {lmpResults.milestones.length > 0 && (
                      <div className="space-y-2">
                        <p className="font-medium">Upcoming milestones:</p>
                        <ul className="space-y-1">
                          {lmpResults.milestones.slice(0, 3).map((milestone, index) => (
                            <li key={index} className="text-sm">
                              <span className="font-medium">{milestone.name}:</span> {format(milestone.date, "MMM d")} -{" "}
                              {milestone.description}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Enter your last period date to calculate your due date</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Conception Method */}
        <TabsContent value="conception" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="conception-date">Conception date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal mt-1",
                        !conceptionDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {conceptionDate ? format(conceptionDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={conceptionDate} onSelect={setConceptionDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <Button onClick={calculateFromConception} className="w-full">
                Calculate Due Date
              </Button>
            </div>

            <Card>
              <CardContent className="p-6">
                {conceptionResults ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold">{format(conceptionResults.dueDate, "MMMM d, yyyy")}</h3>
                      <p className="text-muted-foreground">Estimated Due Date</p>
                    </div>

                    <div className="space-y-2">
                      <p>
                        <strong>Current gestational age:</strong> {conceptionResults.gestationalAge.weeks} weeks and{" "}
                        {conceptionResults.gestationalAge.days} days
                      </p>
                      <p>
                        <strong>Last menstrual period:</strong> {format(conceptionResults.lmpDate, "MMMM d, yyyy")}
                      </p>
                      <p>
                        <strong>Current trimester:</strong> {conceptionResults.currentTrimester}
                      </p>
                      <p>
                        <strong>Days remaining:</strong> {conceptionResults.daysRemaining}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="font-medium">Pregnancy progress:</p>
                      <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-primary h-full" style={{ width: `${conceptionResults.completed}%` }}></div>
                      </div>
                      <p className="text-sm text-right">{conceptionResults.completed}% complete</p>
                    </div>

                    {conceptionResults.milestones.length > 0 && (
                      <div className="space-y-2">
                        <p className="font-medium">Upcoming milestones:</p>
                        <ul className="space-y-1">
                          {conceptionResults.milestones.slice(0, 3).map((milestone, index) => (
                            <li key={index} className="text-sm">
                              <span className="font-medium">{milestone.name}:</span> {format(milestone.date, "MMM d")} -{" "}
                              {milestone.description}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Enter your conception date to calculate your due date</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Due Date Method */}
        <TabsContent value="duedate" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="due-date">Known due date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal mt-1",
                        !dueDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dueDate ? format(dueDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <Button onClick={calculateFromDueDate} className="w-full">
                Calculate Pregnancy Details
              </Button>
            </div>

            <Card>
              <CardContent className="p-6">
                {dueDateResults ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold">{format(dueDateResults.dueDate, "MMMM d, yyyy")}</h3>
                      <p className="text-muted-foreground">Confirmed Due Date</p>
                    </div>

                    <div className="space-y-2">
                      <p>
                        <strong>Current gestational age:</strong> {dueDateResults.gestationalAge.weeks} weeks and{" "}
                        {dueDateResults.gestationalAge.days} days
                      </p>
                      <p>
                        <strong>Last menstrual period:</strong> {format(dueDateResults.lmpDate, "MMMM d, yyyy")}
                      </p>
                      <p>
                        <strong>Conception date:</strong> {format(dueDateResults.conceptionDate, "MMMM d, yyyy")}
                      </p>
                      <p>
                        <strong>Current trimester:</strong> {dueDateResults.currentTrimester}
                      </p>
                      <p>
                        <strong>Days remaining:</strong> {dueDateResults.daysRemaining}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="font-medium">Pregnancy progress:</p>
                      <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-primary h-full" style={{ width: `${dueDateResults.completed}%` }}></div>
                      </div>
                      <p className="text-sm text-right">{dueDateResults.completed}% complete</p>
                    </div>

                    {dueDateResults.milestones.length > 0 && (
                      <div className="space-y-2">
                        <p className="font-medium">Upcoming milestones:</p>
                        <ul className="space-y-1">
                          {dueDateResults.milestones.slice(0, 3).map((milestone, index) => (
                            <li key={index} className="text-sm">
                              <span className="font-medium">{milestone.name}:</span> {format(milestone.date, "MMM d")} -{" "}
                              {milestone.description}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Enter your known due date to calculate pregnancy details</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Ultrasound Method */}
        <TabsContent value="ultrasound" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="ultrasound-date">Ultrasound date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal mt-1",
                        !ultrasoundDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {ultrasoundDate ? format(ultrasoundDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={ultrasoundDate} onSelect={setUltrasoundDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label>Measurement type</Label>
                <RadioGroup value={measurementType} onValueChange={setMeasurementType} className="flex space-x-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="weeks" id="weeks" />
                    <Label htmlFor="weeks">Gestational Age</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="crl" id="crl" />
                    <Label htmlFor="crl">Crown-Rump Length (mm)</Label>
                  </div>
                </RadioGroup>
              </div>

              {measurementType === "weeks" ? (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="weeks-value">Weeks</Label>
                    <Input
                      id="weeks-value"
                      type="number"
                      placeholder="Weeks"
                      value={weeksValue}
                      onChange={(e) => setWeeksValue(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="days-value">Days</Label>
                    <Input
                      id="days-value"
                      type="number"
                      placeholder="Days"
                      value={daysValue}
                      onChange={(e) => setDaysValue(e.target.value)}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <Label htmlFor="crl-value">Crown-Rump Length (mm)</Label>
                  <Input
                    id="crl-value"
                    type="number"
                    placeholder="Length in mm"
                    value={weeksValue}
                    onChange={(e) => setWeeksValue(e.target.value)}
                  />
                </div>
              )}

              <Button onClick={calculateFromUltrasound} className="w-full">
                Calculate Due Date
              </Button>
            </div>

            <Card>
              <CardContent className="p-6">
                {ultrasoundResults ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold">{format(ultrasoundResults.dueDate, "MMMM d, yyyy")}</h3>
                      <p className="text-muted-foreground">Estimated Due Date</p>
                    </div>

                    <div className="space-y-2">
                      <p>
                        <strong>Current gestational age:</strong> {ultrasoundResults.gestationalAge.weeks} weeks and{" "}
                        {ultrasoundResults.gestationalAge.days} days
                      </p>
                      <p>
                        <strong>Last menstrual period:</strong> {format(ultrasoundResults.lmpDate, "MMMM d, yyyy")}
                      </p>
                      <p>
                        <strong>Conception date:</strong> {format(ultrasoundResults.conceptionDate, "MMMM d, yyyy")}
                      </p>
                      <p>
                        <strong>Current trimester:</strong> {ultrasoundResults.currentTrimester}
                      </p>
                      <p>
                        <strong>Days remaining:</strong> {ultrasoundResults.daysRemaining}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="font-medium">Pregnancy progress:</p>
                      <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-primary h-full" style={{ width: `${ultrasoundResults.completed}%` }}></div>
                      </div>
                      <p className="text-sm text-right">{ultrasoundResults.completed}% complete</p>
                    </div>

                    {ultrasoundResults.milestones.length > 0 && (
                      <div className="space-y-2">
                        <p className="font-medium">Upcoming milestones:</p>
                        <ul className="space-y-1">
                          {ultrasoundResults.milestones.slice(0, 3).map((milestone, index) => (
                            <li key={index} className="text-sm">
                              <span className="font-medium">{milestone.name}:</span> {format(milestone.date, "MMM d")} -{" "}
                              {milestone.description}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      Enter your ultrasound measurements to calculate your due date
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
