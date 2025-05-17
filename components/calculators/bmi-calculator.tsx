"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

export function BmiCalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric")
  const [height, setHeight] = useState<number | "">("")
  const [weight, setWeight] = useState<number | "">("")
  const [feet, setFeet] = useState<number | "">("")
  const [inches, setInches] = useState<number | "">("")
  const [pounds, setPounds] = useState<number | "">("")
  const [bmi, setBmi] = useState<number | null>(null)
  const [category, setCategory] = useState<string>("")

  const calculateBMI = () => {
    let calculatedBMI: number | null = null

    if (unit === "metric" && height && weight) {
      // Metric formula: weight (kg) / [height (m)]^2
      const heightInMeters = Number(height) / 100
      calculatedBMI = Number(weight) / (heightInMeters * heightInMeters)
    } else if (unit === "imperial" && feet && inches && pounds) {
      // Imperial formula: [weight (lbs) / height (in)^2] × 703
      const heightInInches = Number(feet) * 12 + Number(inches)
      calculatedBMI = (Number(pounds) / (heightInInches * heightInInches)) * 703
    }

    if (calculatedBMI !== null) {
      setBmi(calculatedBMI)

      // Determine BMI category
      if (calculatedBMI < 18.5) {
        setCategory("Underweight")
      } else if (calculatedBMI < 25) {
        setCategory("Normal weight")
      } else if (calculatedBMI < 30) {
        setCategory("Overweight")
      } else {
        setCategory("Obesity")
      }
    }
  }

  const resetCalculator = () => {
    setHeight("")
    setWeight("")
    setFeet("")
    setInches("")
    setPounds("")
    setBmi(null)
    setCategory("")
  }

  const getBmiColor = () => {
    if (!bmi) return "bg-primary"
    if (bmi < 18.5) return "bg-blue-500"
    if (bmi < 25) return "bg-green-500"
    if (bmi < 30) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getBmiProgress = () => {
    if (!bmi) return 0
    if (bmi < 10) return 10
    if (bmi > 40) return 100
    return (bmi / 40) * 100
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="metric" onValueChange={(value) => setUnit(value as "metric" | "imperial")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="metric">Metric</TabsTrigger>
          <TabsTrigger value="imperial">Imperial</TabsTrigger>
        </TabsList>

        <TabsContent value="metric" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              placeholder="e.g. 175"
              value={height}
              onChange={(e) => setHeight(e.target.value ? Number(e.target.value) : "")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              placeholder="e.g. 70"
              value={weight}
              onChange={(e) => setWeight(e.target.value ? Number(e.target.value) : "")}
            />
          </div>
        </TabsContent>

        <TabsContent value="imperial" className="space-y-4">
          <div className="space-y-2">
            <Label>Height</Label>
            <div className="flex gap-2">
              <div className="space-y-1 flex-1">
                <Label htmlFor="feet" className="text-xs">
                  Feet
                </Label>
                <Input
                  id="feet"
                  type="number"
                  placeholder="e.g. 5"
                  value={feet}
                  onChange={(e) => setFeet(e.target.value ? Number(e.target.value) : "")}
                />
              </div>
              <div className="space-y-1 flex-1">
                <Label htmlFor="inches" className="text-xs">
                  Inches
                </Label>
                <Input
                  id="inches"
                  type="number"
                  placeholder="e.g. 10"
                  value={inches}
                  onChange={(e) => setInches(e.target.value ? Number(e.target.value) : "")}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pounds">Weight (lbs)</Label>
            <Input
              id="pounds"
              type="number"
              placeholder="e.g. 160"
              value={pounds}
              onChange={(e) => setPounds(e.target.value ? Number(e.target.value) : "")}
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex gap-2">
        <Button onClick={calculateBMI} className="flex-1">
          Calculate BMI
        </Button>
        <Button variant="outline" onClick={resetCalculator}>
          Reset
        </Button>
      </div>

      {bmi !== null && (
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Your BMI</span>
              <span className="text-sm font-medium">{bmi.toFixed(1)}</span>
            </div>
            <Progress value={getBmiProgress()} className={`h-2 ${getBmiColor()}`} />
          </div>

          <div className="bg-muted p-4 rounded-md">
            <p className="font-medium">Category: {category}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {category === "Underweight" && "BMI less than 18.5 - You may need to gain weight."}
              {category === "Normal weight" && "BMI between 18.5 and 24.9 - You have a healthy weight."}
              {category === "Overweight" && "BMI between 25 and 29.9 - You may need to lose weight."}
              {category === "Obesity" && "BMI 30 or greater - You may need to lose weight for health reasons."}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
