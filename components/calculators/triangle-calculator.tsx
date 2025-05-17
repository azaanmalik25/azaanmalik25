"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

export function TriangleCalculator() {
  const [sideA, setSideA] = useState<number | "">("")
  const [sideB, setSideB] = useState<number | "">("")
  const [sideC, setSideC] = useState<number | "">("")
  const [base, setBase] = useState<number | "">("")
  const [height, setHeight] = useState<number | "">("")
  const [angleA, setAngleA] = useState<number | "">("")
  const [angleB, setAngleB] = useState<number | "">("")
  const [angleC, setAngleC] = useState<number | "">("")
  const [area, setArea] = useState<number | null>(null)
  const [perimeter, setPerimeter] = useState<number | null>(null)
  const [error, setError] = useState<string>("")

  // Calculate using sides
  const calculateBySides = () => {
    setError("")
    setArea(null)
    setPerimeter(null)

    if (sideA === "" || sideB === "" || sideC === "") {
      setError("Please enter all three sides")
      return
    }

    const a = Number(sideA)
    const b = Number(sideB)
    const c = Number(sideC)

    // Check if triangle is valid
    if (a + b <= c || a + c <= b || b + c <= a) {
      setError("Invalid triangle: sum of any two sides must be greater than the third side")
      return
    }

    // Calculate perimeter
    const p = a + b + c

    // Calculate area using Heron's formula
    const s = p / 2
    const areaValue = Math.sqrt(s * (s - a) * (s - b) * (s - c))

    setPerimeter(p)
    setArea(areaValue)
  }

  // Calculate using base and height
  const calculateByBaseHeight = () => {
    setError("")
    setArea(null)
    setPerimeter(null)

    if (base === "" || height === "") {
      setError("Please enter both base and height")
      return
    }

    const b = Number(base)
    const h = Number(height)

    if (b <= 0 || h <= 0) {
      setError("Base and height must be positive numbers")
      return
    }

    // Calculate area
    const areaValue = 0.5 * b * h

    setArea(areaValue)
  }

  // Calculate using angles and one side
  const calculateByAngles = () => {
    setError("")
    setArea(null)
    setPerimeter(null)

    if (angleA === "" || angleB === "" || sideC === "") {
      setError("Please enter two angles and one side")
      return
    }

    const alpha = Number(angleA)
    const beta = Number(angleB)
    const c = Number(sideC)

    if (alpha <= 0 || beta <= 0 || alpha + beta >= 180) {
      setError("Invalid angles: must be positive and sum less than 180°")
      return
    }

    // Calculate the third angle
    const gamma = 180 - alpha - beta
    setAngleC(gamma)

    // Convert angles to radians
    const alphaRad = (alpha * Math.PI) / 180
    const betaRad = (beta * Math.PI) / 180
    const gammaRad = (gamma * Math.PI) / 180

    // Calculate other sides using Law of Sines
    const a = (c * Math.sin(alphaRad)) / Math.sin(gammaRad)
    const b = (c * Math.sin(betaRad)) / Math.sin(gammaRad)

    setSideA(Number.parseFloat(a.toFixed(4)))
    setSideB(Number.parseFloat(b.toFixed(4)))

    // Calculate perimeter
    const p = a + b + c

    // Calculate area using sides
    const s = p / 2
    const areaValue = Math.sqrt(s * (s - a) * (s - b) * (s - c))

    setPerimeter(p)
    setArea(areaValue)
  }

  const resetCalculator = () => {
    setSideA("")
    setSideB("")
    setSideC("")
    setBase("")
    setHeight("")
    setAngleA("")
    setAngleB("")
    setAngleC("")
    setArea(null)
    setPerimeter(null)
    setError("")
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="sides" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sides">By Sides</TabsTrigger>
          <TabsTrigger value="base-height">Base & Height</TabsTrigger>
          <TabsTrigger value="angles">Angles & Side</TabsTrigger>
        </TabsList>

        <TabsContent value="sides" className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="side-a">Side a</Label>
              <Input
                id="side-a"
                type="number"
                min="0.1"
                step="0.1"
                placeholder="Enter length"
                value={sideA}
                onChange={(e) => setSideA(e.target.value ? Number(e.target.value) : "")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="side-b">Side b</Label>
              <Input
                id="side-b"
                type="number"
                min="0.1"
                step="0.1"
                placeholder="Enter length"
                value={sideB}
                onChange={(e) => setSideB(e.target.value ? Number(e.target.value) : "")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="side-c">Side c</Label>
              <Input
                id="side-c"
                type="number"
                min="0.1"
                step="0.1"
                placeholder="Enter length"
                value={sideC}
                onChange={(e) => setSideC(e.target.value ? Number(e.target.value) : "")}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={calculateBySides} className="flex-1">
              Calculate
            </Button>
            <Button variant="outline" onClick={resetCalculator}>
              Reset
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="base-height" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="base">Base</Label>
              <Input
                id="base"
                type="number"
                min="0.1"
                step="0.1"
                placeholder="Enter base length"
                value={base}
                onChange={(e) => setBase(e.target.value ? Number(e.target.value) : "")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                type="number"
                min="0.1"
                step="0.1"
                placeholder="Enter height"
                value={height}
                onChange={(e) => setHeight(e.target.value ? Number(e.target.value) : "")}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={calculateByBaseHeight} className="flex-1">
              Calculate
            </Button>
            <Button variant="outline" onClick={resetCalculator}>
              Reset
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="angles" className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="angle-a">Angle A (°)</Label>
              <Input
                id="angle-a"
                type="number"
                min="0.1"
                max="179.9"
                step="0.1"
                placeholder="Enter angle"
                value={angleA}
                onChange={(e) => setAngleA(e.target.value ? Number(e.target.value) : "")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="angle-b">Angle B (°)</Label>
              <Input
                id="angle-b"
                type="number"
                min="0.1"
                max="179.9"
                step="0.1"
                placeholder="Enter angle"
                value={angleB}
                onChange={(e) => setAngleB(e.target.value ? Number(e.target.value) : "")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="side-c-angle">Side c</Label>
              <Input
                id="side-c-angle"
                type="number"
                min="0.1"
                step="0.1"
                placeholder="Enter length"
                value={sideC}
                onChange={(e) => setSideC(e.target.value ? Number(e.target.value) : "")}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={calculateByAngles} className="flex-1">
              Calculate
            </Button>
            <Button variant="outline" onClick={resetCalculator}>
              Reset
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {(area !== null || perimeter !== null) && (
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-4">
              {area !== null && (
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Area</p>
                  <p className="text-2xl font-bold">{area.toFixed(2)} units²</p>
                </div>
              )}

              {perimeter !== null && (
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Perimeter</p>
                  <p className="text-2xl font-bold">{perimeter.toFixed(2)} units</p>
                </div>
              )}
            </div>

            {sideA !== "" && sideB !== "" && sideC !== "" && (
              <div className="mt-4 text-sm text-muted-foreground">
                <p>
                  Triangle with sides: a = {Number(sideA).toFixed(2)}, b = {Number(sideB).toFixed(2)}, c ={" "}
                  {Number(sideC).toFixed(2)}
                </p>
              </div>
            )}

            {angleA !== "" && angleB !== "" && angleC !== "" && (
              <div className="mt-2 text-sm text-muted-foreground">
                <p>
                  Angles: A = {Number(angleA).toFixed(1)}°, B = {Number(angleB).toFixed(1)}°, C ={" "}
                  {Number(angleC).toFixed(1)}°
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertDescription>
          A triangle is a polygon with three edges and three vertices. The sum of the angles in a triangle is always
          180°.
        </AlertDescription>
      </Alert>
    </div>
  )
}
