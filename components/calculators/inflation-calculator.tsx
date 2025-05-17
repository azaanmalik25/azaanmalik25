"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, Calendar, Percent, TrendingUp } from "lucide-react"

export function InflationCalculator() {
  // State for inflation details
  const [startAmount, setStartAmount] = useState(1000)
  const [inflationRate, setInflationRate] = useState(2.5)
  const [years, setYears] = useState(10)
  const [calculationType, setCalculationType] = useState("future")

  // Calculated values
  const [futureAmount, setFutureAmount] = useState(0)
  const [pastAmount, setPastAmount] = useState(0)
  const [purchasingPowerLoss, setPurchasingPowerLoss] = useState(0)
  const [yearlyBreakdown, setYearlyBreakdown] = useState<{ year: number; value: number }[]>([])

  // Calculate inflation effects
  useEffect(() => {
    if (calculationType === "future") {
      // Calculate future value with inflation
      const futureValue = startAmount * Math.pow(1 + inflationRate / 100, years)
      setFutureAmount(futureValue)
      setPurchasingPowerLoss(((futureValue - startAmount) / startAmount) * 100)

      // Generate yearly breakdown
      const breakdown = []
      for (let i = 0; i <= years; i++) {
        breakdown.push({
          year: new Date().getFullYear() + i,
          value: startAmount * Math.pow(1 + inflationRate / 100, i),
        })
      }
      setYearlyBreakdown(breakdown)
    } else {
      // Calculate past value (what money was worth in the past)
      const pastValue = startAmount / Math.pow(1 + inflationRate / 100, years)
      setPastAmount(pastValue)
      setPurchasingPowerLoss(((startAmount - pastValue) / startAmount) * 100)

      // Generate yearly breakdown
      const breakdown = []
      const currentYear = new Date().getFullYear()
      for (let i = 0; i <= years; i++) {
        breakdown.push({
          year: currentYear - (years - i),
          value: startAmount / Math.pow(1 + inflationRate / 100, years - i),
        })
      }
      setYearlyBreakdown(breakdown)
    }
  }, [startAmount, inflationRate, years, calculationType])

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
          <TrendingUp className="h-6 w-6 text-primary" />
          <CardTitle>Inflation Calculator</CardTitle>
        </div>
        <CardDescription>Calculate the effects of inflation on your money over time</CardDescription>
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
                    <SelectItem value="future">Future Value (Inflation Effect)</SelectItem>
                    <SelectItem value="past">Past Value (What Money Was Worth)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="amount">{calculationType === "future" ? "Current Amount" : "Current Amount"}</Label>
                  <div className="flex items-center border rounded-md px-2 py-1 bg-muted">
                    <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                    <Input
                      id="amount"
                      type="number"
                      value={startAmount}
                      onChange={(e) => setStartAmount(Number(e.target.value))}
                      className="border-0 bg-transparent w-24 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </div>
                <Slider
                  value={[startAmount]}
                  min={100}
                  max={10000}
                  step={100}
                  onValueChange={(value) => setStartAmount(value[0])}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>$100</span>
                  <span>$10,000</span>
                </div>
              </div>

              {/* Inflation Rate */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="inflation-rate">Average Inflation Rate (%)</Label>
                  <div className="flex items-center border rounded-md px-2 py-1 bg-muted">
                    <Percent className="h-3.5 w-3.5 text-muted-foreground" />
                    <Input
                      id="inflation-rate"
                      type="number"
                      value={inflationRate}
                      onChange={(e) => setInflationRate(Number(e.target.value))}
                      className="border-0 bg-transparent w-24 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      step={0.1}
                    />
                  </div>
                </div>
                <Slider
                  value={[inflationRate]}
                  min={0}
                  max={15}
                  step={0.1}
                  onValueChange={(value) => setInflationRate(value[0])}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>15%</span>
                </div>
              </div>

              {/* Years */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="years">Number of Years</Label>
                  <div className="flex items-center border rounded-md px-2 py-1 bg-muted">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    <Input
                      id="years"
                      type="number"
                      value={years}
                      onChange={(e) => setYears(Number(e.target.value))}
                      className="border-0 bg-transparent w-24 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </div>
                <Slider
                  value={[years]}
                  min={1}
                  max={50}
                  step={1}
                  onValueChange={(value) => setYears(value[0])}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1 year</span>
                  <span>50 years</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="results">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">
                    {calculationType === "future" ? "Future Value" : "Past Value"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {formatCurrency(calculationType === "future" ? futureAmount : pastAmount)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {calculationType === "future"
                      ? `In ${years} years, ${formatCurrency(startAmount)} will be worth ${formatCurrency(futureAmount)}`
                      : `${formatCurrency(startAmount)} today was worth ${formatCurrency(pastAmount)} ${years} years ago`}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Purchasing Power Change</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{purchasingPowerLoss.toFixed(2)}%</div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {calculationType === "future"
                      ? `Your money will lose ${purchasingPowerLoss.toFixed(2)}% of its purchasing power`
                      : `Your money has gained ${purchasingPowerLoss.toFixed(2)}% in purchasing power`}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Year-by-Year Breakdown</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-4">Year</th>
                      <th className="text-right py-2 px-4">Value</th>
                      <th className="text-right py-2 px-4">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearlyBreakdown.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2 px-4">{item.year}</td>
                        <td className="text-right py-2 px-4">{formatCurrency(item.value)}</td>
                        <td className="text-right py-2 px-4">
                          {index === 0
                            ? "-"
                            : `${(((item.value - yearlyBreakdown[index - 1].value) / yearlyBreakdown[index - 1].value) * 100).toFixed(2)}%`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
