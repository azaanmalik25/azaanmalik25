"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Car, DollarSign } from "lucide-react"

export function FuelEconomyCalculator() {
  // State for fuel economy details
  const [distance, setDistance] = useState(100)
  const [fuelUsed, setFuelUsed] = useState(10)
  const [fuelPrice, setFuelPrice] = useState(3.5)
  const [distanceUnit, setDistanceUnit] = useState("miles")
  const [fuelUnit, setFuelUnit] = useState("gallons")
  const [calculationType, setCalculationType] = useState("economy")

  // Trip details
  const [tripDistance, setTripDistance] = useState(500)
  const [fuelEconomy, setFuelEconomy] = useState(25)

  // Calculated values
  const [economyResult, setEconomyResult] = useState(0)
  const [economyUnit, setEconomyUnit] = useState("")
  const [fuelCost, setFuelCost] = useState(0)
  const [tripFuelNeeded, setTripFuelNeeded] = useState(0)
  const [tripCost, setTripCost] = useState(0)

  // Calculate fuel economy
  useEffect(() => {
    if (calculationType === "economy") {
      let result = 0
      let unit = ""

      if (distanceUnit === "miles" && fuelUnit === "gallons") {
        // MPG (US)
        result = distance / fuelUsed
        unit = "mpg"
      } else if (distanceUnit === "miles" && fuelUnit === "liters") {
        // Miles per liter
        result = distance / fuelUsed
        unit = "miles/L"
      } else if (distanceUnit === "kilometers" && fuelUnit === "liters") {
        // L/100km (European standard)
        result = (fuelUsed * 100) / distance
        unit = "L/100km"
      } else if (distanceUnit === "kilometers" && fuelUnit === "gallons") {
        // Km per gallon
        result = distance / fuelUsed
        unit = "km/gal"
      }

      setEconomyResult(result)
      setEconomyUnit(unit)

      // Calculate cost per distance unit
      const costPerUnit = (fuelPrice * fuelUsed) / distance
      setFuelCost(costPerUnit)
    } else {
      // Trip calculation
      let fuelNeeded = 0

      if (distanceUnit === "miles" && fuelUnit === "gallons") {
        // MPG to gallons needed
        fuelNeeded = tripDistance / fuelEconomy
      } else if (distanceUnit === "miles" && fuelUnit === "liters") {
        // Miles per liter to liters needed
        fuelNeeded = tripDistance / fuelEconomy
      } else if (distanceUnit === "kilometers" && fuelUnit === "liters") {
        // L/100km to liters needed
        fuelNeeded = (fuelEconomy * tripDistance) / 100
      } else if (distanceUnit === "kilometers" && fuelUnit === "gallons") {
        // Km per gallon to gallons needed
        fuelNeeded = tripDistance / fuelEconomy
      }

      setTripFuelNeeded(fuelNeeded)
      setTripCost(fuelNeeded * fuelPrice)
    }
  }, [calculationType, distance, fuelUsed, fuelPrice, distanceUnit, fuelUnit, tripDistance, fuelEconomy])

  // Format number with 2 decimal places
  const formatNumber = (value: number) => {
    return value.toFixed(2)
  }

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Car className="h-6 w-6 text-primary" />
          <CardTitle>Fuel Economy Calculator</CardTitle>
        </div>
        <CardDescription>Calculate fuel consumption, costs, and plan your trips</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="calculation-type">Calculation Type</Label>
                <Select value={calculationType} onValueChange={setCalculationType}>
                  <SelectTrigger id="calculation-type">
                    <SelectValue placeholder="Select calculation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="economy">Calculate Fuel Economy</SelectItem>
                    <SelectItem value="trip">Plan a Trip</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="distance-unit">Distance Unit</Label>
                  <Select value={distanceUnit} onValueChange={setDistanceUnit}>
                    <SelectTrigger id="distance-unit">
                      <SelectValue placeholder="Select distance unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="miles">Miles</SelectItem>
                      <SelectItem value="kilometers">Kilometers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fuel-unit">Fuel Unit</Label>
                  <Select value={fuelUnit} onValueChange={setFuelUnit}>
                    <SelectTrigger id="fuel-unit">
                      <SelectValue placeholder="Select fuel unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gallons">Gallons</SelectItem>
                      <SelectItem value="liters">Liters</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {calculationType === "economy" ? (
                <>
                  {/* Distance */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="distance">Distance ({distanceUnit})</Label>
                      <div className="flex items-center border rounded-md px-2 py-1 bg-muted">
                        <Input
                          id="distance"
                          type="number"
                          value={distance}
                          onChange={(e) => setDistance(Number(e.target.value))}
                          className="border-0 bg-transparent w-24 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                      </div>
                    </div>
                    <Slider
                      value={[distance]}
                      min={1}
                      max={1000}
                      step={1}
                      onValueChange={(value) => setDistance(value[0])}
                      className="py-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1 {distanceUnit}</span>
                      <span>1000 {distanceUnit}</span>
                    </div>
                  </div>

                  {/* Fuel Used */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="fuel-used">Fuel Used ({fuelUnit})</Label>
                      <div className="flex items-center border rounded-md px-2 py-1 bg-muted">
                        <Input
                          id="fuel-used"
                          type="number"
                          value={fuelUsed}
                          onChange={(e) => setFuelUsed(Number(e.target.value))}
                          className="border-0 bg-transparent w-24 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                      </div>
                    </div>
                    <Slider
                      value={[fuelUsed]}
                      min={0.1}
                      max={100}
                      step={0.1}
                      onValueChange={(value) => setFuelUsed(value[0])}
                      className="py-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0.1 {fuelUnit}</span>
                      <span>100 {fuelUnit}</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Trip Distance */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="trip-distance">Trip Distance ({distanceUnit})</Label>
                      <div className="flex items-center border rounded-md px-2 py-1 bg-muted">
                        <Input
                          id="trip-distance"
                          type="number"
                          value={tripDistance}
                          onChange={(e) => setTripDistance(Number(e.target.value))}
                          className="border-0 bg-transparent w-24 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                      </div>
                    </div>
                    <Slider
                      value={[tripDistance]}
                      min={1}
                      max={2000}
                      step={10}
                      onValueChange={(value) => setTripDistance(value[0])}
                      className="py-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1 {distanceUnit}</span>
                      <span>2000 {distanceUnit}</span>
                    </div>
                  </div>

                  {/* Fuel Economy */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="fuel-economy">
                        {distanceUnit === "miles" && fuelUnit === "gallons" && "Fuel Economy (mpg)"}
                        {distanceUnit === "miles" && fuelUnit === "liters" && "Fuel Economy (miles/L)"}
                        {distanceUnit === "kilometers" && fuelUnit === "liters" && "Fuel Economy (L/100km)"}
                        {distanceUnit === "kilometers" && fuelUnit === "gallons" && "Fuel Economy (km/gal)"}
                      </Label>
                      <div className="flex items-center border rounded-md px-2 py-1 bg-muted">
                        <Input
                          id="fuel-economy"
                          type="number"
                          value={fuelEconomy}
                          onChange={(e) => setFuelEconomy(Number(e.target.value))}
                          className="border-0 bg-transparent w-24 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                      </div>
                    </div>
                    <Slider
                      value={[fuelEconomy]}
                      min={1}
                      max={distanceUnit === "kilometers" && fuelUnit === "liters" ? 30 : 100}
                      step={0.1}
                      onValueChange={(value) => setFuelEconomy(value[0])}
                      className="py-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1</span>
                      <span>{distanceUnit === "kilometers" && fuelUnit === "liters" ? 30 : 100}</span>
                    </div>
                  </div>
                </>
              )}

              {/* Fuel Price */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="fuel-price">Fuel Price (per {fuelUnit})</Label>
                  <div className="flex items-center border rounded-md px-2 py-1 bg-muted">
                    <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                    <Input
                      id="fuel-price"
                      type="number"
                      value={fuelPrice}
                      onChange={(e) => setFuelPrice(Number(e.target.value))}
                      className="border-0 bg-transparent w-24 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      step={0.01}
                    />
                  </div>
                </div>
                <Slider
                  value={[fuelPrice]}
                  min={0.1}
                  max={10}
                  step={0.1}
                  onValueChange={(value) => setFuelPrice(value[0])}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>$0.10</span>
                  <span>$10.00</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="results">
            {calculationType === "economy" ? (
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Fuel Economy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {formatNumber(economyResult)} {economyUnit}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {distanceUnit === "miles" && fuelUnit === "gallons" && "Miles per gallon"}
                      {distanceUnit === "miles" && fuelUnit === "liters" && "Miles per liter"}
                      {distanceUnit === "kilometers" && fuelUnit === "liters" && "Liters per 100 kilometers"}
                      {distanceUnit === "kilometers" && fuelUnit === "gallons" && "Kilometers per gallon"}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Cost per {distanceUnit}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{formatCurrency(fuelCost)}</div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Cost per{" "}
                      {distanceUnit === "kilometers" && fuelUnit === "liters" ? "100 kilometers" : distanceUnit}
                    </p>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Distance traveled:</span>
                        <span className="font-medium">
                          {distance} {distanceUnit}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Fuel used:</span>
                        <span className="font-medium">
                          {fuelUsed} {fuelUnit}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Fuel cost:</span>
                        <span className="font-medium">{formatCurrency(fuelUsed * fuelPrice)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Fuel Needed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {formatNumber(tripFuelNeeded)} {fuelUnit}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      For a trip of {tripDistance} {distanceUnit}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Trip Cost</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{formatCurrency(tripCost)}</div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Based on {formatCurrency(fuelPrice)} per {fuelUnit}
                    </p>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Trip Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Trip distance:</span>
                        <span className="font-medium">
                          {tripDistance} {distanceUnit}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Fuel economy:</span>
                        <span className="font-medium">
                          {fuelEconomy}{" "}
                          {distanceUnit === "miles" && fuelUnit === "gallons"
                            ? "mpg"
                            : distanceUnit === "miles" && fuelUnit === "liters"
                              ? "miles/L"
                              : distanceUnit === "kilometers" && fuelUnit === "liters"
                                ? "L/100km"
                                : "km/gal"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Fuel price:</span>
                        <span className="font-medium">
                          {formatCurrency(fuelPrice)} per {fuelUnit}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
