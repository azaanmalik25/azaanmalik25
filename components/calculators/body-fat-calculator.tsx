"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function BodyFatCalculator() {
  // State for Navy method
  const [navyGender, setNavyGender] = useState<string>("male")
  const [navyHeight, setNavyHeight] = useState<string>("")
  const [navyWeight, setNavyWeight] = useState<string>("")
  const [navyWaist, setNavyWaist] = useState<string>("")
  const [navyNeck, setNavyNeck] = useState<string>("")
  const [navyHip, setNavyHip] = useState<string>("")
  const [navyResult, setNavyResult] = useState<number | null>(null)

  // State for Skinfold method
  const [skinfoldGender, setSkinfoldGender] = useState<string>("male")
  const [skinfoldAge, setSkinfoldAge] = useState<string>("")
  const [chest, setChest] = useState<string>("")
  const [abdomen, setAbdomen] = useState<string>("")
  const [thigh, setThigh] = useState<string>("")
  const [tricep, setTricep] = useState<string>("")
  const [suprailiac, setSuprailiac] = useState<string>("")
  const [skinfoldResult, setSkinfoldResult] = useState<number | null>(null)

  // State for BMI method
  const [bmiHeight, setBmiHeight] = useState<string>("")
  const [bmiWeight, setBmiWeight] = useState<string>("")
  const [bmiResult, setBmiResult] = useState<number | null>(null)

  // State for measurement units
  const [heightUnit, setHeightUnit] = useState<string>("cm")
  const [weightUnit, setWeightUnit] = useState<string>("kg")
  const [measurementUnit, setMeasurementUnit] = useState<string>("cm")

  // Calculate body fat using Navy method
  const calculateNavyMethod = () => {
    if (!navyHeight || !navyWeight || !navyWaist || !navyNeck || (navyGender === "female" && !navyHip)) {
      return
    }

    // Convert to cm if in inches
    const height = heightUnit === "in" ? Number.parseFloat(navyHeight) * 2.54 : Number.parseFloat(navyHeight)
    const waist = measurementUnit === "in" ? Number.parseFloat(navyWaist) * 2.54 : Number.parseFloat(navyWaist)
    const neck = measurementUnit === "in" ? Number.parseFloat(navyNeck) * 2.54 : Number.parseFloat(navyNeck)
    const hip =
      navyGender === "female"
        ? measurementUnit === "in"
          ? Number.parseFloat(navyHip) * 2.54
          : Number.parseFloat(navyHip)
        : 0

    let bodyFat = 0
    if (navyGender === "male") {
      bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450
    } else {
      bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.221 * Math.log10(height)) - 450
    }

    setNavyResult(Math.max(0, Math.min(bodyFat, 100)))
  }

  // Calculate body fat using Skinfold method
  const calculateSkinfoldMethod = () => {
    if (!skinfoldAge || (!chest && !tricep) || (!abdomen && !suprailiac) || (!thigh && !tricep)) {
      return
    }

    const age = Number.parseFloat(skinfoldAge)
    let sum = 0
    let bodyFat = 0

    if (skinfoldGender === "male") {
      // Jackson-Pollock 3-site formula for men (chest, abdomen, thigh)
      sum = Number.parseFloat(chest || "0") + Number.parseFloat(abdomen || "0") + Number.parseFloat(thigh || "0")
      bodyFat = 1.10938 - 0.0008267 * sum + 0.0000016 * sum * sum - 0.0002574 * age
      bodyFat = (4.95 / bodyFat - 4.5) * 100
    } else {
      // Jackson-Pollock 3-site formula for women (tricep, suprailiac, thigh)
      sum = Number.parseFloat(tricep || "0") + Number.parseFloat(suprailiac || "0") + Number.parseFloat(thigh || "0")
      bodyFat = 1.089733 - 0.0009245 * sum + 0.0000025 * sum * sum - 0.0000979 * age
      bodyFat = (4.95 / bodyFat - 4.5) * 100
    }

    setSkinfoldResult(Math.max(0, Math.min(bodyFat, 100)))
  }

  // Calculate body fat using BMI method
  const calculateBmiMethod = () => {
    if (!bmiHeight || !bmiWeight) {
      return
    }

    // Convert to metric if needed
    const height = heightUnit === "in" ? Number.parseFloat(bmiHeight) * 0.0254 : Number.parseFloat(bmiHeight) / 100
    const weight = weightUnit === "lb" ? Number.parseFloat(bmiWeight) * 0.453592 : Number.parseFloat(bmiWeight)

    // Calculate BMI
    const bmi = weight / (height * height)

    // Estimate body fat from BMI (Deurenberg formula)
    const bodyFat = 1.2 * bmi + 0.23 * 30 - 5.4

    setBmiResult(Math.max(0, Math.min(bodyFat, 100)))
  }

  // Get body fat category
  const getBodyFatCategory = (bodyFat: number, gender: string) => {
    if (gender === "male") {
      if (bodyFat < 6) return "Essential Fat"
      if (bodyFat < 14) return "Athletic"
      if (bodyFat < 18) return "Fitness"
      if (bodyFat < 25) return "Average"
      return "Obese"
    } else {
      if (bodyFat < 14) return "Essential Fat"
      if (bodyFat < 21) return "Athletic"
      if (bodyFat < 25) return "Fitness"
      if (bodyFat < 32) return "Average"
      return "Obese"
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="navy" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="navy">Navy Method</TabsTrigger>
          <TabsTrigger value="skinfold">Skinfold Method</TabsTrigger>
          <TabsTrigger value="bmi">BMI Method</TabsTrigger>
        </TabsList>

        {/* Navy Method */}
        <TabsContent value="navy" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <Label>Gender</Label>
                <RadioGroup value={navyGender} onValueChange={setNavyGender} className="flex space-x-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="navy-male" />
                    <Label htmlFor="navy-male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="navy-female" />
                    <Label htmlFor="navy-female">Female</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="height-unit">Height Unit</Label>
                  <Select value={heightUnit} onValueChange={setHeightUnit}>
                    <SelectTrigger id="height-unit">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cm">Centimeters</SelectItem>
                      <SelectItem value="in">Inches</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="weight-unit">Weight Unit</Label>
                  <Select value={weightUnit} onValueChange={setWeightUnit}>
                    <SelectTrigger id="weight-unit">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">Kilograms</SelectItem>
                      <SelectItem value="lb">Pounds</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="measurement-unit">Measurement Unit</Label>
                <Select value={measurementUnit} onValueChange={setMeasurementUnit}>
                  <SelectTrigger id="measurement-unit">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cm">Centimeters</SelectItem>
                    <SelectItem value="in">Inches</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="navy-height">Height</Label>
                  <Input
                    id="navy-height"
                    type="number"
                    placeholder={heightUnit === "cm" ? "Height in cm" : "Height in inches"}
                    value={navyHeight}
                    onChange={(e) => setNavyHeight(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="navy-weight">Weight</Label>
                  <Input
                    id="navy-weight"
                    type="number"
                    placeholder={weightUnit === "kg" ? "Weight in kg" : "Weight in pounds"}
                    value={navyWeight}
                    onChange={(e) => setNavyWeight(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="navy-waist">Waist</Label>
                  <Input
                    id="navy-waist"
                    type="number"
                    placeholder={`Waist in ${measurementUnit}`}
                    value={navyWaist}
                    onChange={(e) => setNavyWaist(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="navy-neck">Neck</Label>
                  <Input
                    id="navy-neck"
                    type="number"
                    placeholder={`Neck in ${measurementUnit}`}
                    value={navyNeck}
                    onChange={(e) => setNavyNeck(e.target.value)}
                  />
                </div>
              </div>

              {navyGender === "female" && (
                <div>
                  <Label htmlFor="navy-hip">Hip</Label>
                  <Input
                    id="navy-hip"
                    type="number"
                    placeholder={`Hip in ${measurementUnit}`}
                    value={navyHip}
                    onChange={(e) => setNavyHip(e.target.value)}
                  />
                </div>
              )}

              <Button onClick={calculateNavyMethod} className="w-full">
                Calculate Body Fat
              </Button>
            </div>

            <Card>
              <CardContent className="p-6">
                {navyResult !== null ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold">{navyResult.toFixed(1)}%</h3>
                      <p className="text-muted-foreground">Body Fat Percentage</p>
                    </div>

                    <div className="space-y-2">
                      <div className="bg-gray-200 h-4 rounded-full overflow-hidden">
                        <div className="bg-primary h-full" style={{ width: `${Math.min(navyResult, 100)}%` }}></div>
                      </div>
                      <p className="text-sm text-center font-medium">
                        Category: {getBodyFatCategory(navyResult, navyGender)}
                      </p>
                    </div>

                    <div className="text-sm space-y-2">
                      <p>
                        <strong>How to measure:</strong>
                      </p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Waist: Measure at the narrowest point</li>
                        <li>Neck: Measure just below the larynx</li>
                        {navyGender === "female" && <li>Hip: Measure at the widest point</li>}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Enter your measurements to calculate body fat percentage</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Skinfold Method */}
        <TabsContent value="skinfold" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <Label>Gender</Label>
                <RadioGroup value={skinfoldGender} onValueChange={setSkinfoldGender} className="flex space-x-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="skinfold-male" />
                    <Label htmlFor="skinfold-male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="skinfold-female" />
                    <Label htmlFor="skinfold-female">Female</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="skinfold-age">Age</Label>
                <Input
                  id="skinfold-age"
                  type="number"
                  placeholder="Age in years"
                  value={skinfoldAge}
                  onChange={(e) => setSkinfoldAge(e.target.value)}
                />
              </div>

              {skinfoldGender === "male" ? (
                <>
                  <div>
                    <Label htmlFor="chest">Chest Skinfold (mm)</Label>
                    <Input
                      id="chest"
                      type="number"
                      placeholder="Chest measurement in mm"
                      value={chest}
                      onChange={(e) => setChest(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="abdomen">Abdomen Skinfold (mm)</Label>
                    <Input
                      id="abdomen"
                      type="number"
                      placeholder="Abdomen measurement in mm"
                      value={abdomen}
                      onChange={(e) => setAbdomen(e.target.value)}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <Label htmlFor="tricep">Tricep Skinfold (mm)</Label>
                    <Input
                      id="tricep"
                      type="number"
                      placeholder="Tricep measurement in mm"
                      value={tricep}
                      onChange={(e) => setTricep(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="suprailiac">Suprailiac Skinfold (mm)</Label>
                    <Input
                      id="suprailiac"
                      type="number"
                      placeholder="Suprailiac measurement in mm"
                      value={suprailiac}
                      onChange={(e) => setSuprailiac(e.target.value)}
                    />
                  </div>
                </>
              )}

              <div>
                <Label htmlFor="thigh">Thigh Skinfold (mm)</Label>
                <Input
                  id="thigh"
                  type="number"
                  placeholder="Thigh measurement in mm"
                  value={thigh}
                  onChange={(e) => setThigh(e.target.value)}
                />
              </div>

              <Button onClick={calculateSkinfoldMethod} className="w-full">
                Calculate Body Fat
              </Button>
            </div>

            <Card>
              <CardContent className="p-6">
                {skinfoldResult !== null ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold">{skinfoldResult.toFixed(1)}%</h3>
                      <p className="text-muted-foreground">Body Fat Percentage</p>
                    </div>

                    <div className="space-y-2">
                      <div className="bg-gray-200 h-4 rounded-full overflow-hidden">
                        <div className="bg-primary h-full" style={{ width: `${Math.min(skinfoldResult, 100)}%` }}></div>
                      </div>
                      <p className="text-sm text-center font-medium">
                        Category: {getBodyFatCategory(skinfoldResult, skinfoldGender)}
                      </p>
                    </div>

                    <div className="text-sm space-y-2">
                      <p>
                        <strong>How to measure:</strong>
                      </p>
                      <p>
                        Use a skinfold caliper to measure the thickness of a fold of skin with its underlying layer of
                        fat.
                      </p>
                      <ul className="list-disc pl-5 space-y-1">
                        {skinfoldGender === "male" ? (
                          <>
                            <li>Chest: Diagonal fold halfway between the nipple and anterior axillary fold</li>
                            <li>Abdomen: Vertical fold 2cm to the right of the umbilicus</li>
                          </>
                        ) : (
                          <>
                            <li>Tricep: Vertical fold on the back of the upper arm</li>
                            <li>Suprailiac: Diagonal fold above the iliac crest</li>
                          </>
                        )}
                        <li>Thigh: Vertical fold on the front of the thigh</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      Enter your skinfold measurements to calculate body fat percentage
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* BMI Method */}
        <TabsContent value="bmi" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bmi-height-unit">Height Unit</Label>
                  <Select value={heightUnit} onValueChange={setHeightUnit}>
                    <SelectTrigger id="bmi-height-unit">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cm">Centimeters</SelectItem>
                      <SelectItem value="in">Inches</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="bmi-weight-unit">Weight Unit</Label>
                  <Select value={weightUnit} onValueChange={setWeightUnit}>
                    <SelectTrigger id="bmi-weight-unit">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">Kilograms</SelectItem>
                      <SelectItem value="lb">Pounds</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="bmi-height">Height</Label>
                <Input
                  id="bmi-height"
                  type="number"
                  placeholder={heightUnit === "cm" ? "Height in cm" : "Height in inches"}
                  value={bmiHeight}
                  onChange={(e) => setBmiHeight(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="bmi-weight">Weight</Label>
                <Input
                  id="bmi-weight"
                  type="number"
                  placeholder={weightUnit === "kg" ? "Weight in kg" : "Weight in pounds"}
                  value={bmiWeight}
                  onChange={(e) => setBmiWeight(e.target.value)}
                />
              </div>

              <Button onClick={calculateBmiMethod} className="w-full">
                Calculate Body Fat
              </Button>

              <div className="text-sm text-muted-foreground">
                <p>
                  Note: The BMI method is less accurate than other methods. It provides only a rough estimate of body
                  fat percentage.
                </p>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                {bmiResult !== null ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold">{bmiResult.toFixed(1)}%</h3>
                      <p className="text-muted-foreground">Estimated Body Fat Percentage</p>
                    </div>

                    <div className="space-y-2">
                      <div className="bg-gray-200 h-4 rounded-full overflow-hidden">
                        <div className="bg-primary h-full" style={{ width: `${Math.min(bmiResult, 100)}%` }}></div>
                      </div>
                      <p className="text-sm text-center font-medium">
                        Category: {getBodyFatCategory(bmiResult, "male")}
                      </p>
                    </div>

                    <div className="text-sm space-y-2">
                      <p>
                        <strong>Limitations:</strong>
                      </p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Does not account for muscle mass</li>
                        <li>Less accurate for athletes and elderly</li>
                        <li>Does not consider body composition</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      Enter your height and weight to estimate body fat percentage
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
