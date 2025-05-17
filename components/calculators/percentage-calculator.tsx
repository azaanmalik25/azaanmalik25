"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

export function PercentageCalculator() {
  // Percentage of a number
  const [value1, setValue1] = useState<number | "">("")
  const [percentage1, setPercentage1] = useState<number | "">("")
  const [result1, setResult1] = useState<number | null>(null)

  // Percentage increase/decrease
  const [originalValue, setOriginalValue] = useState<number | "">("")
  const [newValue, setNewValue] = useState<number | "">("")
  const [percentageChange, setPercentageChange] = useState<number | null>(null)
  const [isIncrease, setIsIncrease] = useState<boolean>(true)

  // Percentage of total
  const [part, setPart] = useState<number | "">("")
  const [total, setTotal] = useState<number | "">("")
  const [percentageOfTotal, setPercentageOfTotal] = useState<number | null>(null)

  const calculatePercentageOfNumber = () => {
    if (value1 !== "" && percentage1 !== "") {
      const result = (Number(value1) * Number(percentage1)) / 100
      setResult1(result)
    }
  }

  const calculatePercentageChange = () => {
    if (originalValue !== "" && newValue !== "") {
      const original = Number(originalValue)
      const current = Number(newValue)
      const difference = current - original
      const percentChange = (difference / original) * 100

      setPercentageChange(Math.abs(percentChange))
      setIsIncrease(percentChange >= 0)
    }
  }

  const calculatePercentageOfTotal = () => {
    if (part !== "" && total !== "") {
      const percentage = (Number(part) / Number(total)) * 100
      setPercentageOfTotal(percentage)
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="percentage-of" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="percentage-of">Percentage Of</TabsTrigger>
          <TabsTrigger value="percentage-change">Percentage Change</TabsTrigger>
          <TabsTrigger value="percentage-total">Percentage of Total</TabsTrigger>
        </TabsList>

        <TabsContent value="percentage-of" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="value1">Value</Label>
            <Input
              id="value1"
              type="number"
              placeholder="Enter a number"
              value={value1}
              onChange={(e) => setValue1(e.target.value ? Number(e.target.value) : "")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="percentage1">Percentage</Label>
            <div className="relative">
              <Input
                id="percentage1"
                type="number"
                placeholder="Enter percentage"
                className="pr-8"
                value={percentage1}
                onChange={(e) => setPercentage1(e.target.value ? Number(e.target.value) : "")}
              />
              <span className="absolute right-3 top-2.5 text-muted-foreground">%</span>
            </div>
          </div>

          <Button onClick={calculatePercentageOfNumber} className="w-full">
            Calculate
          </Button>

          {result1 !== null && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Result</p>
                  <p className="text-2xl font-bold">{result1.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {percentage1}% of {value1.toLocaleString()} is {result1.toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="percentage-change" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="original-value">Original Value</Label>
            <Input
              id="original-value"
              type="number"
              placeholder="Enter original value"
              value={originalValue}
              onChange={(e) => setOriginalValue(e.target.value ? Number(e.target.value) : "")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-value">New Value</Label>
            <Input
              id="new-value"
              type="number"
              placeholder="Enter new value"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value ? Number(e.target.value) : "")}
            />
          </div>

          <Button onClick={calculatePercentageChange} className="w-full">
            Calculate
          </Button>

          {percentageChange !== null && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Result</p>
                  <p className="text-2xl font-bold">
                    {percentageChange.toFixed(2)}% {isIncrease ? "Increase" : "Decrease"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {isIncrease ? "Increased" : "Decreased"} from {originalValue.toLocaleString()} to{" "}
                    {newValue.toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="percentage-total" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="part">Part</Label>
            <Input
              id="part"
              type="number"
              placeholder="Enter part value"
              value={part}
              onChange={(e) => setPart(e.target.value ? Number(e.target.value) : "")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="total">Total</Label>
            <Input
              id="total"
              type="number"
              placeholder="Enter total value"
              value={total}
              onChange={(e) => setTotal(e.target.value ? Number(e.target.value) : "")}
            />
          </div>

          <Button onClick={calculatePercentageOfTotal} className="w-full">
            Calculate
          </Button>

          {percentageOfTotal !== null && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Result</p>
                  <p className="text-2xl font-bold">{percentageOfTotal.toFixed(2)}%</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {part.toLocaleString()} is {percentageOfTotal.toFixed(2)}% of {total.toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
