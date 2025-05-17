"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InfoIcon as InfoCircle, DollarSign, Calendar, Percent, Car } from "lucide-react"

export function CarLoanCalculator() {
  // State for loan details
  const [carPrice, setCarPrice] = useState(25000)
  const [downPayment, setDownPayment] = useState(5000)
  const [loanTerm, setLoanTerm] = useState(60) // 60 months = 5 years
  const [interestRate, setInterestRate] = useState(4.5)
  const [tradeInValue, setTradeInValue] = useState(0)
  const [salesTax, setSalesTax] = useState(6)
  const [includesTax, setIncludesTax] = useState(false)

  // Calculated values
  const [monthlyPayment, setMonthlyPayment] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)
  const [totalCost, setTotalCost] = useState(0)
  const [loanAmount, setLoanAmount] = useState(0)

  // Calculate loan details
  useEffect(() => {
    // Calculate loan amount
    const taxAmount = includesTax ? 0 : (carPrice * salesTax) / 100
    const calculatedLoanAmount = carPrice + taxAmount - downPayment - tradeInValue
    setLoanAmount(calculatedLoanAmount > 0 ? calculatedLoanAmount : 0)

    // Calculate monthly payment
    const monthlyRate = interestRate / 100 / 12
    const numPayments = loanTerm

    if (monthlyRate === 0) {
      // No interest
      setMonthlyPayment(calculatedLoanAmount / numPayments)
      setTotalInterest(0)
    } else {
      // With interest (using the formula: P * r * (1+r)^n / ((1+r)^n - 1))
      const x = Math.pow(1 + monthlyRate, numPayments)
      const monthly = (calculatedLoanAmount * monthlyRate * x) / (x - 1)
      setMonthlyPayment(monthly > 0 ? monthly : 0)
      setTotalInterest(monthly * numPayments - calculatedLoanAmount)
    }

    // Calculate total cost
    setTotalCost(carPrice + (includesTax ? 0 : (carPrice * salesTax) / 100))
  }, [carPrice, downPayment, loanTerm, interestRate, tradeInValue, salesTax, includesTax])

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
          <CardTitle>Car Loan Calculator</CardTitle>
        </div>
        <CardDescription>Calculate your monthly car loan payments and total cost of ownership</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="results">Loan Summary</TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Car Price */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="car-price">Car Price</Label>
                  <div className="flex items-center border rounded-md px-2 py-1 bg-muted">
                    <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                    <Input
                      id="car-price"
                      type="number"
                      value={carPrice}
                      onChange={(e) => setCarPrice(Number(e.target.value))}
                      className="border-0 bg-transparent w-24 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </div>
                <Slider
                  value={[carPrice]}
                  min={1000}
                  max={100000}
                  step={500}
                  onValueChange={(value) => setCarPrice(value[0])}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>$1,000</span>
                  <span>$100,000</span>
                </div>
              </div>

              {/* Down Payment */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="down-payment">Down Payment</Label>
                  <div className="flex items-center border rounded-md px-2 py-1 bg-muted">
                    <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                    <Input
                      id="down-payment"
                      type="number"
                      value={downPayment}
                      onChange={(e) => setDownPayment(Number(e.target.value))}
                      className="border-0 bg-transparent w-24 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </div>
                <Slider
                  value={[downPayment]}
                  min={0}
                  max={carPrice * 0.9}
                  step={500}
                  onValueChange={(value) => setDownPayment(value[0])}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>$0</span>
                  <span>{formatCurrency(carPrice * 0.9)}</span>
                </div>
              </div>

              {/* Loan Term */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="loan-term">Loan Term (months)</Label>
                  <div className="flex items-center border rounded-md px-2 py-1 bg-muted">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    <Input
                      id="loan-term"
                      type="number"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      className="border-0 bg-transparent w-24 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </div>
                <Slider
                  value={[loanTerm]}
                  min={12}
                  max={84}
                  step={12}
                  onValueChange={(value) => setLoanTerm(value[0])}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>12 months</span>
                  <span>84 months</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="interest-rate">Interest Rate (%)</Label>
                  <div className="flex items-center border rounded-md px-2 py-1 bg-muted">
                    <Percent className="h-3.5 w-3.5 text-muted-foreground" />
                    <Input
                      id="interest-rate"
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="border-0 bg-transparent w-24 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      step={0.1}
                    />
                  </div>
                </div>
                <Slider
                  value={[interestRate]}
                  min={0}
                  max={20}
                  step={0.1}
                  onValueChange={(value) => setInterestRate(value[0])}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>20%</span>
                </div>
              </div>

              {/* Trade-in Value */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="trade-in">Trade-in Value</Label>
                  <div className="flex items-center border rounded-md px-2 py-1 bg-muted">
                    <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                    <Input
                      id="trade-in"
                      type="number"
                      value={tradeInValue}
                      onChange={(e) => setTradeInValue(Number(e.target.value))}
                      className="border-0 bg-transparent w-24 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </div>
                <Slider
                  value={[tradeInValue]}
                  min={0}
                  max={carPrice}
                  step={500}
                  onValueChange={(value) => setTradeInValue(value[0])}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>$0</span>
                  <span>{formatCurrency(carPrice)}</span>
                </div>
              </div>

              {/* Sales Tax */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="sales-tax">Sales Tax (%)</Label>
                  <div className="flex items-center border rounded-md px-2 py-1 bg-muted">
                    <Percent className="h-3.5 w-3.5 text-muted-foreground" />
                    <Input
                      id="sales-tax"
                      type="number"
                      value={salesTax}
                      onChange={(e) => setSalesTax(Number(e.target.value))}
                      className="border-0 bg-transparent w-24 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      step={0.1}
                    />
                  </div>
                </div>
                <Slider
                  value={[salesTax]}
                  min={0}
                  max={15}
                  step={0.1}
                  onValueChange={(value) => setSalesTax(value[0])}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>15%</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Input
                type="checkbox"
                id="includes-tax"
                checked={includesTax}
                onChange={(e) => setIncludesTax(e.target.checked)}
                className="w-4 h-4"
              />
              <Label htmlFor="includes-tax">Price includes sales tax</Label>
            </div>
          </TabsContent>

          <TabsContent value="results">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Monthly Payment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{formatCurrency(monthlyPayment)}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Loan Amount</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{formatCurrency(loanAmount)}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total Interest</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{formatCurrency(totalInterest)}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total Cost</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{formatCurrency(totalCost)}</div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <div className="flex items-start space-x-2">
                <InfoCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <p>
                    This calculation is an estimate. Your actual payment may vary based on the exact terms of your loan,
                    additional fees, and other factors.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
