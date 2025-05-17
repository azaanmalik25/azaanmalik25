"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRightLeft } from "lucide-react"

export function TemperatureConverter() {
  const [celsius, setCelsius] = useState<number | "">("")
  const [fahrenheit, setFahrenheit] = useState<number | "">("")
  const [kelvin, setKelvin] = useState<number | "">("")
  const [activeTab, setActiveTab] = useState<string>("celsius")
  const [conversionHistory, setConversionHistory] = useState<
    Array<{ from: string; to: string; value: number; result: number }>
  >([])

  // Convert from the active tab to other units
  useEffect(() => {
    if (activeTab === "celsius" && celsius !== "") {
      const c = Number(celsius)
      const f = (c * 9) / 5 + 32
      const k = c + 273.15

      setFahrenheit(Number.parseFloat(f.toFixed(2)))
      setKelvin(Number.parseFloat(k.toFixed(2)))
    } else if (activeTab === "fahrenheit" && fahrenheit !== "") {
      const f = Number(fahrenheit)
      const c = ((f - 32) * 5) / 9
      const k = c + 273.15

      setCelsius(Number.parseFloat(c.toFixed(2)))
      setKelvin(Number.parseFloat(k.toFixed(2)))
    } else if (activeTab === "kelvin" && kelvin !== "") {
      const k = Number(kelvin)
      const c = k - 273.15
      const f = (c * 9) / 5 + 32

      setCelsius(Number.parseFloat(c.toFixed(2)))
      setFahrenheit(Number.parseFloat(f.toFixed(2)))
    }
  }, [celsius, fahrenheit, kelvin, activeTab])

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  // Handle input change
  const handleInputChange = (value: string, unit: string) => {
    const numValue = value === "" ? "" : Number(value)

    if (unit === "celsius") {
      setCelsius(numValue)

      if (numValue !== "") {
        const oldFahrenheit = fahrenheit !== "" ? Number(fahrenheit) : 0
        const newFahrenheit = (Number(numValue) * 9) / 5 + 32

        // Add to history if there's a significant change
        if (Math.abs(newFahrenheit - oldFahrenheit) > 0.01) {
          addToHistory("Celsius", "Fahrenheit", Number(numValue), newFahrenheit)
        }
      }
    } else if (unit === "fahrenheit") {
      setFahrenheit(numValue)

      if (numValue !== "") {
        const oldCelsius = celsius !== "" ? Number(celsius) : 0
        const newCelsius = ((Number(numValue) - 32) * 5) / 9

        // Add to history if there's a significant change
        if (Math.abs(newCelsius - oldCelsius) > 0.01) {
          addToHistory("Fahrenheit", "Celsius", Number(numValue), newCelsius)
        }
      }
    } else if (unit === "kelvin") {
      setKelvin(numValue)

      if (numValue !== "") {
        const oldCelsius = celsius !== "" ? Number(celsius) : 0
        const newCelsius = Number(numValue) - 273.15

        // Add to history if there's a significant change
        if (Math.abs(newCelsius - oldCelsius) > 0.01) {
          addToHistory("Kelvin", "Celsius", Number(numValue), newCelsius)
        }
      }
    }
  }

  // Add conversion to history
  const addToHistory = (from: string, to: string, value: number, result: number) => {
    const newHistory = [{ from, to, value, result }, ...conversionHistory].slice(0, 5) // Keep only the last 5 conversions

    setConversionHistory(newHistory)
  }

  // Swap between Celsius and Fahrenheit
  const swapCelsiusFahrenheit = () => {
    if (activeTab === "celsius") {
      setActiveTab("fahrenheit")
    } else if (activeTab === "fahrenheit") {
      setActiveTab("celsius")
    }
  }

  // Reset all values
  const resetValues = () => {
    setCelsius("")
    setFahrenheit("")
    setKelvin("")
  }

  // Format temperature with unit
  const formatTemp = (temp: number | string, unit: string) => {
    if (temp === "") return "-"

    const symbols = {
      celsius: "°C",
      fahrenheit: "°F",
      kelvin: "K",
    }

    return `${Number(temp).toFixed(2)} ${symbols[unit as keyof typeof symbols]}`
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="celsius">Celsius (°C)</TabsTrigger>
          <TabsTrigger value="fahrenheit">Fahrenheit (°F)</TabsTrigger>
          <TabsTrigger value="kelvin">Kelvin (K)</TabsTrigger>
        </TabsList>

        <TabsContent value="celsius" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="celsius-input">Temperature in Celsius</Label>
            <div className="flex gap-2">
              <Input
                id="celsius-input"
                type="number"
                step="0.01"
                placeholder="Enter temperature"
                value={celsius}
                onChange={(e) => handleInputChange(e.target.value, "celsius")}
              />
              <Button variant="outline" size="icon" onClick={swapCelsiusFahrenheit}>
                <ArrowRightLeft className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Fahrenheit</p>
                  <p className="text-2xl font-bold">{formatTemp(fahrenheit, "fahrenheit")}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Kelvin</p>
                  <p className="text-2xl font-bold">{formatTemp(kelvin, "kelvin")}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="fahrenheit" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fahrenheit-input">Temperature in Fahrenheit</Label>
            <div className="flex gap-2">
              <Input
                id="fahrenheit-input"
                type="number"
                step="0.01"
                placeholder="Enter temperature"
                value={fahrenheit}
                onChange={(e) => handleInputChange(e.target.value, "fahrenheit")}
              />
              <Button variant="outline" size="icon" onClick={swapCelsiusFahrenheit}>
                <ArrowRightLeft className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Celsius</p>
                  <p className="text-2xl font-bold">{formatTemp(celsius, "celsius")}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Kelvin</p>
                  <p className="text-2xl font-bold">{formatTemp(kelvin, "kelvin")}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="kelvin" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="kelvin-input">Temperature in Kelvin</Label>
            <Input
              id="kelvin-input"
              type="number"
              min="0"
              step="0.01"
              placeholder="Enter temperature"
              value={kelvin}
              onChange={(e) => handleInputChange(e.target.value, "kelvin")}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Celsius</p>
                  <p className="text-2xl font-bold">{formatTemp(celsius, "celsius")}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Fahrenheit</p>
                  <p className="text-2xl font-bold">{formatTemp(fahrenheit, "fahrenheit")}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Button onClick={resetValues} variant="outline" className="w-full">
        Reset
      </Button>

      {conversionHistory.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-sm font-medium mb-2">Recent Conversions</h3>
            <div className="space-y-2">
              {conversionHistory.map((item, index) => (
                <div key={index} className="text-sm text-muted-foreground">
                  {item.value.toFixed(2)} {item.from} = {item.result.toFixed(2)} {item.to}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-2 text-sm">
        <h3 className="font-medium">Conversion Formulas:</h3>
        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
          <li>Celsius to Fahrenheit: °F = (°C × 9/5) + 32</li>
          <li>Fahrenheit to Celsius: °C = (°F - 32) × 5/9</li>
          <li>Celsius to Kelvin: K = °C + 273.15</li>
          <li>Kelvin to Celsius: °C = K - 273.15</li>
        </ul>
      </div>
    </div>
  )
}
