"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AreaCalculator() {
  const [shape, setShape] = useState("rectangle")
  const [length, setLength] = useState<number | "">("")
  const [width, setWidth] = useState<number | "">("")
  const [radius, setRadius] = useState<number | "">("")
  const [base, setBase] = useState<number | "">("")
  const [height, setHeight] = useState<number | "">("")
  const [side1, setSide1] = useState<number | "">("")
  const [side2, setSide2] = useState<number | "">("")
  const [side3, setSide3] = useState<number | "">("")
  const [unit, setUnit] = useState("m")
  const [area, setArea] = useState<number | null>(null)
  const [perimeter, setPerimeter] = useState<number | null>(null)

  const calculateArea = () => {
    let calculatedArea = 0
    let calculatedPerimeter = 0

    switch (shape) {
      case "rectangle":
        if (length !== "" && width !== "") {
          calculatedArea = Number(length) * Number(width)
          calculatedPerimeter = 2 * (Number(length) + Number(width))
        }
        break
      case "square":
        if (length !== "") {
          calculatedArea = Number(length) * Number(length)
          calculatedPerimeter = 4 * Number(length)
        }
        break
      case "circle":
        if (radius !== "") {
          calculatedArea = Math.PI * Number(radius) * Number(radius)
          calculatedPerimeter = 2 * Math.PI * Number(radius) // Circumference
        }
        break
      case "triangle":
        if (base !== "" && height !== "") {
          calculatedArea = 0.5 * Number(base) * Number(height)

          // If all sides are provided, calculate perimeter
          if (side1 !== "" && side2 !== "" && side3 !== "") {
            calculatedPerimeter = Number(side1) + Number(side2) + Number(side3)
          } else {
            calculatedPerimeter = 0 // Can't calculate perimeter without all sides
          }
        }
        break
      case "trapezoid":
        if (side1 !== "" && side2 !== "" && height !== "") {
          calculatedArea = 0.5 * (Number(side1) + Number(side2)) * Number(height)

          // If all sides are provided, calculate perimeter
          if (side3 !== "" && width !== "") {
            calculatedPerimeter = Number(side1) + Number(side2) + Number(side3) + Number(width)
          } else {
            calculatedPerimeter = 0 // Can't calculate perimeter without all sides
          }
        }
        break
    }

    setArea(calculatedArea)
    setPerimeter(calculatedPerimeter)
  }

  const formatNumber = (num: number) => {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })
  }

  const getUnitSquared = () => {
    return `${unit}²`
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="shape">Shape</Label>
        <Select value={shape} onValueChange={setShape}>
          <SelectTrigger id="shape">
            <SelectValue placeholder="Select shape" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rectangle">Rectangle</SelectItem>
            <SelectItem value="square">Square</SelectItem>
            <SelectItem value="circle">Circle</SelectItem>
            <SelectItem value="triangle">Triangle</SelectItem>
            <SelectItem value="trapezoid">Trapezoid</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="unit">Unit</Label>
        <Select value={unit} onValueChange={setUnit}>
          <SelectTrigger id="unit">
            <SelectValue placeholder="Select unit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mm">Millimeter (mm)</SelectItem>
            <SelectItem value="cm">Centimeter (cm)</SelectItem>
            <SelectItem value="m">Meter (m)</SelectItem>
            <SelectItem value="km">Kilometer (km)</SelectItem>
            <SelectItem value="in">Inch (in)</SelectItem>
            <SelectItem value="ft">Foot (ft)</SelectItem>
            <SelectItem value="yd">Yard (yd)</SelectItem>
            <SelectItem value="mi">Mile (mi)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {shape === "rectangle" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="length">Length</Label>
            <div className="relative">
              <Input
                id="length"
                type="number"
                min="0.01"
                step="0.01"
                placeholder={`Length (${unit})`}
                className="pr-8"
                value={length}
                onChange={(e) => setLength(e.target.value ? Number(e.target.value) : "")}
              />
              <span className="absolute right-3 top-2.5 text-muted-foreground">{unit}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="width">Width</Label>
            <div className="relative">
              <Input
                id="width"
                type="number"
                min="0.01"
                step="0.01"
                placeholder={`Width (${unit})`}
                className="pr-8"
                value={width}
                onChange={(e) => setWidth(e.target.value ? Number(e.target.value) : "")}
              />
              <span className="absolute right-3 top-2.5 text-muted-foreground">{unit}</span>
            </div>
          </div>
        </div>
      )}

      {shape === "square" && (
        <div className="space-y-2">
          <Label htmlFor="side">Side Length</Label>
          <div className="relative">
            <Input
              id="side"
              type="number"
              min="0.01"
              step="0.01"
              placeholder={`Side length (${unit})`}
              className="pr-8"
              value={length}
              onChange={(e) => setLength(e.target.value ? Number(e.target.value) : "")}
            />
            <span className="absolute right-3 top-2.5 text-muted-foreground">{unit}</span>
          </div>
        </div>
      )}

      {shape === "circle" && (
        <div className="space-y-2">
          <Label htmlFor="radius">Radius</Label>
          <div className="relative">
            <Input
              id="radius"
              type="number"
              min="0.01"
              step="0.01"
              placeholder={`Radius (${unit})`}
              className="pr-8"
              value={radius}
              onChange={(e) => setRadius(e.target.value ? Number(e.target.value) : "")}
            />
            <span className="absolute right-3 top-2.5 text-muted-foreground">{unit}</span>
          </div>
        </div>
      )}

      {shape === "triangle" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="base">Base</Label>
            <div className="relative">
              <Input
                id="base"
                type="number"
                min="0.01"
                step="0.01"
                placeholder={`Base (${unit})`}
                className="pr-8"
                value={base}
                onChange={(e) => setBase(e.target.value ? Number(e.target.value) : "")}
              />
              <span className="absolute right-3 top-2.5 text-muted-foreground">{unit}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="height">Height</Label>
            <div className="relative">
              <Input
                id="height"
                type="number"
                min="0.01"
                step="0.01"
                placeholder={`Height (${unit})`}
                className="pr-8"
                value={height}
                onChange={(e) => setHeight(e.target.value ? Number(e.target.value) : "")}
              />
              <span className="absolute right-3 top-2.5 text-muted-foreground">{unit}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sides">Sides (for perimeter)</Label>
            <div className="grid grid-cols-3 gap-2">
              <div className="relative">
                <Input
                  id="side1"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="Side 1"
                  className="pr-8"
                  value={side1}
                  onChange={(e) => setSide1(e.target.value ? Number(e.target.value) : "")}
                />
                <span className="absolute right-3 top-2.5 text-muted-foreground">{unit}</span>
              </div>
              <div className="relative">
                <Input
                  id="side2"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="Side 2"
                  className="pr-8"
                  value={side2}
                  onChange={(e) => setSide2(e.target.value ? Number(e.target.value) : "")}
                />
                <span className="absolute right-3 top-2.5 text-muted-foreground">{unit}</span>
              </div>
              <div className="relative">
                <Input
                  id="side3"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="Side 3"
                  className="pr-8"
                  value={side3}
                  onChange={(e) => setSide3(e.target.value ? Number(e.target.value) : "")}
                />
                <span className="absolute right-3 top-2.5 text-muted-foreground">{unit}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {shape === "trapezoid" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="parallel-side1">Parallel Side 1</Label>
            <div className="relative">
              <Input
                id="parallel-side1"
                type="number"
                min="0.01"
                step="0.01"
                placeholder={`Side 1 (${unit})`}
                className="pr-8"
                value={side1}
                onChange={(e) => setSide1(e.target.value ? Number(e.target.value) : "")}
              />
              <span className="absolute right-3 top-2.5 text-muted-foreground">{unit}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="parallel-side2">Parallel Side 2</Label>
            <div className="relative">
              <Input
                id="parallel-side2"
                type="number"
                min="0.01"
                step="0.01"
                placeholder={`Side 2 (${unit})`}
                className="pr-8"
                value={side2}
                onChange={(e) => setSide2(e.target.value ? Number(e.target.value) : "")}
              />
              <span className="absolute right-3 top-2.5 text-muted-foreground">{unit}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="trapezoid-height">Height</Label>
            <div className="relative">
              <Input
                id="trapezoid-height"
                type="number"
                min="0.01"
                step="0.01"
                placeholder={`Height (${unit})`}
                className="pr-8"
                value={height}
                onChange={(e) => setHeight(e.target.value ? Number(e.target.value) : "")}
              />
              <span className="absolute right-3 top-2.5 text-muted-foreground">{unit}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="other-sides">Other Sides (for perimeter)</Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <Input
                  id="side3"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="Side 3"
                  className="pr-8"
                  value={side3}
                  onChange={(e) => setSide3(e.target.value ? Number(e.target.value) : "")}
                />
                <span className="absolute right-3 top-2.5 text-muted-foreground">{unit}</span>
              </div>
              <div className="relative">
                <Input
                  id="side4"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="Side 4"
                  className="pr-8"
                  value={width}
                  onChange={(e) => setWidth(e.target.value ? Number(e.target.value) : "")}
                />
                <span className="absolute right-3 top-2.5 text-muted-foreground">{unit}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <Button onClick={calculateArea} className="w-full">
        Calculate
      </Button>

      {area !== null && (
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Area</p>
                <p className="text-xl font-bold">
                  {formatNumber(area)} {getUnitSquared()}
                </p>
              </div>

              {perimeter !== null && perimeter > 0 && (
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">{shape === "circle" ? "Circumference" : "Perimeter"}</p>
                  <p className="text-xl font-bold">
                    {formatNumber(perimeter)} {unit}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
