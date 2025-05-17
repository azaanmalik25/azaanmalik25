"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"
import { Slider } from "@/components/ui/slider"

export function FactorialCalculator() {
  const [number, setNumber] = useState<number>(5)
  const [result, setResult] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [calculationMethod, setCalculationMethod] = useState<"recursive" | "iterative">("iterative")

  // Recursive factorial function
  const calculateFactorialRecursive = (n: number): number => {
    // Base case
    if (n === 0 || n === 1) {
      return 1
    }
    // Recursive case
    return n * calculateFactorialRecursive(n - 1)
  }

  // Iterative factorial function
  const calculateFactorialIterative = (n: number): number => {
    let result = 1
    for (let i = 2; i <= n; i++) {
      result *= i
    }
    return result
  }

  // BigInt factorial for large numbers
  const calculateFactorialBigInt = (n: number): bigint => {
    let result = BigInt(1)
    for (let i = 2; i <= n; i++) {
      result *= BigInt(i)
    }
    return result
  }

  const handleCalculate = () => {
    setError("")
    setResult("")

    // Input validation
    if (number < 0) {
      setError("Factorial is not defined for negative numbers")
      return
    }

    try {
      if (number <= 20) {
        // For small numbers, use the selected method
        const factorialResult =
          calculationMethod === "recursive" ? calculateFactorialRecursive(number) : calculateFactorialIterative(number)
        setResult(factorialResult.toString())
      } else if (number <= 170) {
        // For medium numbers, always use iterative to avoid stack overflow
        const factorialResult = calculateFactorialIterative(number)
        setResult(factorialResult.toString())
      } else if (number <= 500) {
        // For large numbers, use BigInt
        const factorialResult = calculateFactorialBigInt(number)
        setResult(factorialResult.toString())
      } else {
        setError("Value too large. For better performance, please use a number below 500.")
      }
    } catch (err) {
      setError("An error occurred during calculation")
    }
  }

  // Format the result for display if it's very long
  const formatResult = (result: string): string => {
    if (result.length > 50) {
      return result.substring(0, 25) + "..." + result.substring(result.length - 25)
    }
    return result
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Factorial Calculator</CardTitle>
        <CardDescription>Calculate the factorial of a number (n!)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <label htmlFor="number" className="text-sm font-medium">
              Enter a number
            </label>
            <span className="text-sm font-medium">{number}</span>
          </div>
          <Input
            id="number"
            type="number"
            min="0"
            max="500"
            value={number}
            onChange={(e) => setNumber(Number.parseInt(e.target.value) || 0)}
            placeholder="Enter a number (0-500)"
          />
          <Slider min={0} max={100} step={1} value={[number]} onValueChange={(value) => setNumber(value[0])} />
        </div>

        <div className="flex space-x-2">
          <Button
            variant={calculationMethod === "iterative" ? "default" : "outline"}
            onClick={() => setCalculationMethod("iterative")}
            className="flex-1"
          >
            Iterative
          </Button>
          <Button
            variant={calculationMethod === "recursive" ? "default" : "outline"}
            onClick={() => setCalculationMethod("recursive")}
            className="flex-1"
          >
            Recursive
          </Button>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {result && (
          <div className="p-4 bg-muted rounded-md">
            <p className="font-mono break-all">
              <span className="font-semibold">{number}! = </span>
              {formatResult(result)}
            </p>
            {result.length > 50 && (
              <p className="text-xs text-muted-foreground mt-1">Full result has {result.length} digits</p>
            )}
          </div>
        )}

        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertDescription>
            Factorial of n (written as n!) is the product of all positive integers less than or equal to n.
            <br />
            Example: 5! = 5 × 4 × 3 × 2 × 1 = 120
          </AlertDescription>
        </Alert>
      </CardContent>
      <CardFooter>
        <Button onClick={handleCalculate} className="w-full">
          Calculate
        </Button>
      </CardFooter>
    </Card>
  )
}
