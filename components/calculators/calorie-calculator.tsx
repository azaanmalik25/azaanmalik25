"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function CalorieCalculator() {
  const [gender, setGender] = useState("male")
  const [age, setAge] = useState<number | "">("")
  const [weight, setWeight] = useState<number | "">("")
  const [height, setHeight] = useState<number | "">("")
  const [activityLevel, setActivityLevel] = useState("moderate")
  const [goal, setGoal] = useState("maintain")
  const [unit, setUnit] = useState("metric")
  const [feet, setFeet] = useState<number | "">("")
  const [inches, setInches] = useState<number | "">("")
  const [pounds, setPounds] = useState<number | "">("")
  const [bmr, setBmr] = useState<number | null>(null)
  const [tdee, setTdee] = useState<number | null>(null)
  const [targetCalories, setTargetCalories] = useState<number | null>(null)

  const calculateCalories = () => {
    // Convert imperial to metric if needed
    let weightKg = weight
    let heightCm = height

    if (unit === "imperial") {
      weightKg = pounds !== "" ? Number(pounds) * 0.453592 : 0
      heightCm = feet !== "" && inches !== "" ? Number(feet) * 30.48 + Number(inches) * 2.54 : 0
    } else {
      weightKg = weight !== "" ? Number(weight) : 0
      heightCm = height !== "" ? Number(height) : 0
    }

    if (!weightKg || !heightCm || age === "") return

    // Calculate BMR using Mifflin-St Jeor Equation
    let calculatedBmr = 0
    if (gender === "male") {
      calculatedBmr = 10 * weightKg + 6.25 * heightCm - 5 * Number(age) + 5
    } else {
      calculatedBmr = 10 * weightKg + 6.25 * heightCm - 5 * Number(age) - 161
    }

    // Calculate TDEE based on activity level
    let activityMultiplier = 1.2 // Sedentary
    switch (activityLevel) {
      case "sedentary":
        activityMultiplier = 1.2
        break
      case "light":
        activityMultiplier = 1.375
        break
      case "moderate":
        activityMultiplier = 1.55
        break
      case "active":
        activityMultiplier = 1.725
        break
      case "very-active":
        activityMultiplier = 1.9
        break
    }

    const calculatedTdee = calculatedBmr * activityMultiplier

    // Calculate target calories based on goal
    let calculatedTarget = calculatedTdee
    switch (goal) {
      case "lose":
        calculatedTarget = calculatedTdee * 0.8 // 20% deficit
        break
      case "maintain":
        calculatedTarget = calculatedTdee
        break
      case "gain":
        calculatedTarget = calculatedTdee * 1.15 // 15% surplus
        break
    }

    setBmr(Math.round(calculatedBmr))
    setTdee(Math.round(calculatedTdee))
    setTargetCalories(Math.round(calculatedTarget))
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="metric" onValueChange={setUnit}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="metric">Metric</TabsTrigger>
          <TabsTrigger value="imperial">Imperial</TabsTrigger>
        </TabsList>

        <TabsContent value="metric" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="weight-kg">Weight (kg)</Label>
            <Input
              id="weight-kg"
              type="number"
              min="30"
              max="300"
              placeholder="e.g. 70"
              value={weight}
              onChange={(e) => setWeight(e.target.value ? Number(e.target.value) : "")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="height-cm">Height (cm)</Label>
            <Input
              id="height-cm"
              type="number"
              min="100"
              max="250"
              placeholder="e.g. 175"
              value={height}
              onChange={(e) => setHeight(e.target.value ? Number(e.target.value) : "")}
            />
          </div>
        </TabsContent>

        <TabsContent value="imperial" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="weight-lb">Weight (lb)</Label>
            <Input
              id="weight-lb"
              type="number"
              min="66"
              max="660"
              placeholder="e.g. 154"
              value={pounds}
              onChange={(e) => setPounds(e.target.value ? Number(e.target.value) : "")}
            />
          </div>

          <div className="space-y-2">
            <Label>Height</Label>
            <div className="flex gap-2">
              <div className="space-y-1 flex-1">
                <Label htmlFor="height-ft" className="text-xs">
                  Feet
                </Label>
                <Input
                  id="height-ft"
                  type="number"
                  min="3"
                  max="8"
                  placeholder="e.g. 5"
                  value={feet}
                  onChange={(e) => setFeet(e.target.value ? Number(e.target.value) : "")}
                />
              </div>
              <div className="space-y-1 flex-1">
                <Label htmlFor="height-in" className="text-xs">
                  Inches
                </Label>
                <Input
                  id="height-in"
                  type="number"
                  min="0"
                  max="11"
                  placeholder="e.g. 10"
                  value={inches}
                  onChange={(e) => setInches(e.target.value ? Number(e.target.value) : "")}
                />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="space-y-2">
        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          type="number"
          min="15"
          max="100"
          placeholder="e.g. 30"
          value={age}
          onChange={(e) => setAge(e.target.value ? Number(e.target.value) : "")}
        />
      </div>

      <div className="space-y-2">
        <Label>Gender</Label>
        <RadioGroup defaultValue="male" onValueChange={setGender} className="flex">
          <div className="flex items-center space-x-2 flex-1">
            <RadioGroupItem value="male" id="male" />
            <Label htmlFor="male" className="cursor-pointer">
              Male
            </Label>
          </div>
          <div className="flex items-center space-x-2 flex-1">
            <RadioGroupItem value="female" id="female" />
            <Label htmlFor="female" className="cursor-pointer">
              Female
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="activity-level">Activity Level</Label>
        <Select defaultValue="moderate" onValueChange={setActivityLevel}>
          <SelectTrigger id="activity-level">
            <SelectValue placeholder="Select activity level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
            <SelectItem value="light">Light (exercise 1-3 days/week)</SelectItem>
            <SelectItem value="moderate">Moderate (exercise 3-5 days/week)</SelectItem>
            <SelectItem value="active">Active (exercise 6-7 days/week)</SelectItem>
            <SelectItem value="very-active">Very Active (hard exercise daily)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="goal">Goal</Label>
        <Select defaultValue="maintain" onValueChange={setGoal}>
          <SelectTrigger id="goal">
            <SelectValue placeholder="Select your goal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lose">Lose Weight</SelectItem>
            <SelectItem value="maintain">Maintain Weight</SelectItem>
            <SelectItem value="gain">Gain Weight</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={calculateCalories} className="w-full">
        Calculate Calories
      </Button>

      {targetCalories !== null && (
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">BMR</p>
                <p className="text-xl font-bold">{bmr} kcal</p>
                <p className="text-xs text-muted-foreground">Basal Metabolic Rate</p>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">TDEE</p>
                <p className="text-xl font-bold">{tdee} kcal</p>
                <p className="text-xs text-muted-foreground">Total Daily Energy Expenditure</p>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">Daily Target</p>
                <p className="text-xl font-bold">{targetCalories} kcal</p>
                <p className="text-xs text-muted-foreground">
                  {goal === "lose" ? "Caloric Deficit" : goal === "gain" ? "Caloric Surplus" : "Maintenance"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
