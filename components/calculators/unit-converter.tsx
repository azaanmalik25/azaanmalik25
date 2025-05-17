"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRightLeft } from "lucide-react"

export function UnitConverter() {
  // Length conversion
  const [lengthValue, setLengthValue] = useState<number | "">("")
  const [fromLengthUnit, setFromLengthUnit] = useState("meter")
  const [toLengthUnit, setToLengthUnit] = useState("kilometer")
  const [lengthResult, setLengthResult] = useState<number | null>(null)

  // Weight conversion
  const [weightValue, setWeightValue] = useState<number | "">("")
  const [fromWeightUnit, setFromWeightUnit] = useState("kilogram")
  const [toWeightUnit, setToWeightUnit] = useState("pound")
  const [weightResult, setWeightResult] = useState<number | null>(null)

  // Temperature conversion
  const [tempValue, setTempValue] = useState<number | "">("")
  const [fromTempUnit, setFromTempUnit] = useState("celsius")
  const [toTempUnit, setToTempUnit] = useState("fahrenheit")
  const [tempResult, setTempResult] = useState<number | null>(null)

  // Volume conversion
  const [volumeValue, setVolumeValue] = useState<number | "">("")
  const [fromVolumeUnit, setFromVolumeUnit] = useState("liter")
  const [toVolumeUnit, setToVolumeUnit] = useState("gallon")
  const [volumeResult, setVolumeResult] = useState<number | null>(null)

  // Conversion factors
  const lengthUnits = {
    millimeter: 0.001,
    centimeter: 0.01,
    meter: 1,
    kilometer: 1000,
    inch: 0.0254,
    foot: 0.3048,
    yard: 0.9144,
    mile: 1609.34,
  }

  const weightUnits = {
    milligram: 0.000001,
    gram: 0.001,
    kilogram: 1,
    ton: 1000,
    ounce: 0.0283495,
    pound: 0.453592,
    stone: 6.35029,
  }

  const volumeUnits = {
    milliliter: 0.001,
    liter: 1,
    cubic_meter: 1000,
    gallon: 3.78541,
    quart: 0.946353,
    pint: 0.473176,
    cup: 0.236588,
    fluid_ounce: 0.0295735,
  }

  const swapLengthUnits = () => {
    const temp = fromLengthUnit
    setFromLengthUnit(toLengthUnit)
    setToLengthUnit(temp)
    convertLength()
  }

  const swapWeightUnits = () => {
    const temp = fromWeightUnit
    setFromWeightUnit(toWeightUnit)
    setToWeightUnit(temp)
    convertWeight()
  }

  const swapTempUnits = () => {
    const temp = fromTempUnit
    setFromTempUnit(toTempUnit)
    setToTempUnit(temp)
    convertTemperature()
  }

  const swapVolumeUnits = () => {
    const temp = fromVolumeUnit
    setFromVolumeUnit(toVolumeUnit)
    setToVolumeUnit(temp)
    convertVolume()
  }

  const convertLength = () => {
    if (lengthValue !== "") {
      // Convert to base unit (meters) then to target unit
      const valueInMeters = Number(lengthValue) * lengthUnits[fromLengthUnit as keyof typeof lengthUnits]
      const result = valueInMeters / lengthUnits[toLengthUnit as keyof typeof lengthUnits]
      setLengthResult(result)
    }
  }

  const convertWeight = () => {
    if (weightValue !== "") {
      // Convert to base unit (kilograms) then to target unit
      const valueInKg = Number(weightValue) * weightUnits[fromWeightUnit as keyof typeof weightUnits]
      const result = valueInKg / weightUnits[toWeightUnit as keyof typeof weightUnits]
      setWeightResult(result)
    }
  }

  const convertTemperature = () => {
    if (tempValue !== "") {
      let result = 0

      // Convert to Celsius first
      let celsius = 0
      if (fromTempUnit === "fahrenheit") {
        celsius = (Number(tempValue) - 32) * (5 / 9)
      } else if (fromTempUnit === "kelvin") {
        celsius = Number(tempValue) - 273.15
      } else {
        celsius = Number(tempValue)
      }

      // Convert from Celsius to target unit
      if (toTempUnit === "fahrenheit") {
        result = celsius * (9 / 5) + 32
      } else if (toTempUnit === "kelvin") {
        result = celsius + 273.15
      } else {
        result = celsius
      }

      setTempResult(result)
    }
  }

  const convertVolume = () => {
    if (volumeValue !== "") {
      // Convert to base unit (liters) then to target unit
      const valueInLiters = Number(volumeValue) * volumeUnits[fromVolumeUnit as keyof typeof volumeUnits]
      const result = valueInLiters / volumeUnits[toVolumeUnit as keyof typeof volumeUnits]
      setVolumeResult(result)
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="length" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="length">Length</TabsTrigger>
          <TabsTrigger value="weight">Weight</TabsTrigger>
          <TabsTrigger value="temperature">Temperature</TabsTrigger>
          <TabsTrigger value="volume">Volume</TabsTrigger>
        </TabsList>

        <TabsContent value="length" className="space-y-4">
          <div className="grid grid-cols-[1fr,auto,1fr] gap-2 items-end">
            <div className="space-y-2">
              <Label htmlFor="length-value">Value</Label>
              <Input
                id="length-value"
                type="number"
                placeholder="Enter value"
                value={lengthValue}
                onChange={(e) => setLengthValue(e.target.value ? Number(e.target.value) : "")}
              />
            </div>

            <Button variant="ghost" size="icon" onClick={swapLengthUnits} className="mb-0.5">
              <ArrowRightLeft className="h-4 w-4" />
            </Button>

            <div className="space-y-2">
              <Label htmlFor="length-result">Result</Label>
              <Input
                id="length-result"
                type="number"
                placeholder="Result"
                value={lengthResult !== null ? lengthResult : ""}
                readOnly
              />
            </div>
          </div>

          <div className="grid grid-cols-[1fr,auto,1fr] gap-2">
            <div className="space-y-2">
              <Label htmlFor="from-length-unit">From</Label>
              <Select value={fromLengthUnit} onValueChange={setFromLengthUnit}>
                <SelectTrigger id="from-length-unit">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="millimeter">Millimeter (mm)</SelectItem>
                  <SelectItem value="centimeter">Centimeter (cm)</SelectItem>
                  <SelectItem value="meter">Meter (m)</SelectItem>
                  <SelectItem value="kilometer">Kilometer (km)</SelectItem>
                  <SelectItem value="inch">Inch (in)</SelectItem>
                  <SelectItem value="foot">Foot (ft)</SelectItem>
                  <SelectItem value="yard">Yard (yd)</SelectItem>
                  <SelectItem value="mile">Mile (mi)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div></div>

            <div className="space-y-2">
              <Label htmlFor="to-length-unit">To</Label>
              <Select value={toLengthUnit} onValueChange={setToLengthUnit}>
                <SelectTrigger id="to-length-unit">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="millimeter">Millimeter (mm)</SelectItem>
                  <SelectItem value="centimeter">Centimeter (cm)</SelectItem>
                  <SelectItem value="meter">Meter (m)</SelectItem>
                  <SelectItem value="kilometer">Kilometer (km)</SelectItem>
                  <SelectItem value="inch">Inch (in)</SelectItem>
                  <SelectItem value="foot">Foot (ft)</SelectItem>
                  <SelectItem value="yard">Yard (yd)</SelectItem>
                  <SelectItem value="mile">Mile (mi)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={convertLength} className="w-full">
            Convert
          </Button>
        </TabsContent>

        <TabsContent value="weight" className="space-y-4">
          <div className="grid grid-cols-[1fr,auto,1fr] gap-2 items-end">
            <div className="space-y-2">
              <Label htmlFor="weight-value">Value</Label>
              <Input
                id="weight-value"
                type="number"
                placeholder="Enter value"
                value={weightValue}
                onChange={(e) => setWeightValue(e.target.value ? Number(e.target.value) : "")}
              />
            </div>

            <Button variant="ghost" size="icon" onClick={swapWeightUnits} className="mb-0.5">
              <ArrowRightLeft className="h-4 w-4" />
            </Button>

            <div className="space-y-2">
              <Label htmlFor="weight-result">Result</Label>
              <Input
                id="weight-result"
                type="number"
                placeholder="Result"
                value={weightResult !== null ? weightResult : ""}
                readOnly
              />
            </div>
          </div>

          <div className="grid grid-cols-[1fr,auto,1fr] gap-2">
            <div className="space-y-2">
              <Label htmlFor="from-weight-unit">From</Label>
              <Select value={fromWeightUnit} onValueChange={setFromWeightUnit}>
                <SelectTrigger id="from-weight-unit">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="milligram">Milligram (mg)</SelectItem>
                  <SelectItem value="gram">Gram (g)</SelectItem>
                  <SelectItem value="kilogram">Kilogram (kg)</SelectItem>
                  <SelectItem value="ton">Metric Ton (t)</SelectItem>
                  <SelectItem value="ounce">Ounce (oz)</SelectItem>
                  <SelectItem value="pound">Pound (lb)</SelectItem>
                  <SelectItem value="stone">Stone (st)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div></div>

            <div className="space-y-2">
              <Label htmlFor="to-weight-unit">To</Label>
              <Select value={toWeightUnit} onValueChange={setToWeightUnit}>
                <SelectTrigger id="to-weight-unit">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="milligram">Milligram (mg)</SelectItem>
                  <SelectItem value="gram">Gram (g)</SelectItem>
                  <SelectItem value="kilogram">Kilogram (kg)</SelectItem>
                  <SelectItem value="ton">Metric Ton (t)</SelectItem>
                  <SelectItem value="ounce">Ounce (oz)</SelectItem>
                  <SelectItem value="pound">Pound (lb)</SelectItem>
                  <SelectItem value="stone">Stone (st)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={convertWeight} className="w-full">
            Convert
          </Button>
        </TabsContent>

        <TabsContent value="temperature" className="space-y-4">
          <div className="grid grid-cols-[1fr,auto,1fr] gap-2 items-end">
            <div className="space-y-2">
              <Label htmlFor="temp-value">Value</Label>
              <Input
                id="temp-value"
                type="number"
                placeholder="Enter value"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value ? Number(e.target.value) : "")}
              />
            </div>

            <Button variant="ghost" size="icon" onClick={swapTempUnits} className="mb-0.5">
              <ArrowRightLeft className="h-4 w-4" />
            </Button>

            <div className="space-y-2">
              <Label htmlFor="temp-result">Result</Label>
              <Input
                id="temp-result"
                type="number"
                placeholder="Result"
                value={tempResult !== null ? tempResult : ""}
                readOnly
              />
            </div>
          </div>

          <div className="grid grid-cols-[1fr,auto,1fr] gap-2">
            <div className="space-y-2">
              <Label htmlFor="from-temp-unit">From</Label>
              <Select value={fromTempUnit} onValueChange={setFromTempUnit}>
                <SelectTrigger id="from-temp-unit">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="celsius">Celsius (°C)</SelectItem>
                  <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                  <SelectItem value="kelvin">Kelvin (K)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div></div>

            <div className="space-y-2">
              <Label htmlFor="to-temp-unit">To</Label>
              <Select value={toTempUnit} onValueChange={setToTempUnit}>
                <SelectTrigger id="to-temp-unit">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="celsius">Celsius (°C)</SelectItem>
                  <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                  <SelectItem value="kelvin">Kelvin (K)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={convertTemperature} className="w-full">
            Convert
          </Button>
        </TabsContent>

        <TabsContent value="volume" className="space-y-4">
          <div className="grid grid-cols-[1fr,auto,1fr] gap-2 items-end">
            <div className="space-y-2">
              <Label htmlFor="volume-value">Value</Label>
              <Input
                id="volume-value"
                type="number"
                placeholder="Enter value"
                value={volumeValue}
                onChange={(e) => setVolumeValue(e.target.value ? Number(e.target.value) : "")}
              />
            </div>

            <Button variant="ghost" size="icon" onClick={swapVolumeUnits} className="mb-0.5">
              <ArrowRightLeft className="h-4 w-4" />
            </Button>

            <div className="space-y-2">
              <Label htmlFor="volume-result">Result</Label>
              <Input
                id="volume-result"
                type="number"
                placeholder="Result"
                value={volumeResult !== null ? volumeResult : ""}
                readOnly
              />
            </div>
          </div>

          <div className="grid grid-cols-[1fr,auto,1fr] gap-2">
            <div className="space-y-2">
              <Label htmlFor="from-volume-unit">From</Label>
              <Select value={fromVolumeUnit} onValueChange={setFromVolumeUnit}>
                <SelectTrigger id="from-volume-unit">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="milliliter">Milliliter (ml)</SelectItem>
                  <SelectItem value="liter">Liter (L)</SelectItem>
                  <SelectItem value="cubic_meter">Cubic Meter (m³)</SelectItem>
                  <SelectItem value="gallon">Gallon (gal)</SelectItem>
                  <SelectItem value="quart">Quart (qt)</SelectItem>
                  <SelectItem value="pint">Pint (pt)</SelectItem>
                  <SelectItem value="cup">Cup (c)</SelectItem>
                  <SelectItem value="fluid_ounce">Fluid Ounce (fl oz)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div></div>

            <div className="space-y-2">
              <Label htmlFor="to-volume-unit">To</Label>
              <Select value={toVolumeUnit} onValueChange={setToVolumeUnit}>
                <SelectTrigger id="to-volume-unit">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="milliliter">Milliliter (ml)</SelectItem>
                  <SelectItem value="liter">Liter (L)</SelectItem>
                  <SelectItem value="cubic_meter">Cubic Meter (m³)</SelectItem>
                  <SelectItem value="gallon">Gallon (gal)</SelectItem>
                  <SelectItem value="quart">Quart (qt)</SelectItem>
                  <SelectItem value="pint">Pint (pt)</SelectItem>
                  <SelectItem value="cup">Cup (c)</SelectItem>
                  <SelectItem value="fluid_ounce">Fluid Ounce (fl oz)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={convertVolume} className="w-full">
            Convert
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  )
}
