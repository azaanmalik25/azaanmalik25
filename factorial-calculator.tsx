"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

export default function FactorialCalculator() {
  const [number, setNumber] = useState<number>(0)
  const [result, setResult] = useState<string>("")
  const [error, setError] = useState<string>("")

  // Recursive factorial function
  const calculateFactorial = (n: number): number => {
    // Base case
    if (n === 0 || n === 1) {
      return 1
    }
    // Recursive case
    return n * calculateFactorial(n - 1)
  }

  const handleCalculate = () => {
    setError("")
    setResult("")

    // Input validation
    if (number < 0) {
      setError("Factorial is not defined for negative numbers")
      return
    }

    if (number > 170) {
      setError("Value too large. JavaScript can't represent factorials larger than 170 accurately")
      return
    }

    try {
      const factorialResult = calculateFactorial(number)
      setResult(factorialResult.toString())
    } catch (err) {
      setError("An error occurred during calculation")
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Factorial Calculator</CardTitle>
        <CardDescription>Calculate the factorial of a number using recursion</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="number" className="text-sm font-medium">
            Enter a number
          </label>
          <Input
            id="number"
            type="number"
            min="0"
            max="170"
            value={number}
            onChange={(e) => setNumber(Number.parseInt(e.target.value) || 0)}
            placeholder="Enter a number (0-170)"
          />
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
              {result}
            </p>
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
