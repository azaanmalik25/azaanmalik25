"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CurrencySelect, getCurrencySymbol } from "@/components/ui/currency-select"

export function MortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState<number | "">(300000)
  const [downPayment, setDownPayment] = useState<number | "">(60000)
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20)
  const [loanTerm, setLoanTerm] = useState<number>(30)
  const [interestRate, setInterestRate] = useState<number | "">(4.5)
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0)
  const [totalPayment, setTotalPayment] = useState<number>(0)
  const [totalInterest, setTotalInterest] = useState<number>(0)
  const [currency, setCurrency] = useState("USD")

  const [homePrice, setHomePrice] = useState<number | "">(300000)
  const [paymentFrequency, setPaymentFrequency] = useState<string>("monthly")

  useEffect(() => {
    if (homePrice !== "" && downPayment !== "" && interestRate !== "") {
      calculateLoan()
    }
  }, [homePrice, downPayment, interestRate, loanTerm, paymentFrequency, currency])

  const calculateLoan = () => {
    if (loanAmount === "" || interestRate === "" || loanTerm === "") {
      return
    }

    // Convert annual interest rate to monthly
    let periodicRate = Number(interestRate) / 100
    let numberOfPayments = Number(loanTerm)

    // Adjust based on payment frequency
    switch (paymentFrequency) {
      case "weekly":
        periodicRate = periodicRate / 52
        numberOfPayments = numberOfPayments * 52
        break
      case "biweekly":
        periodicRate = periodicRate / 26
        numberOfPayments = numberOfPayments * 26
        break
      case "monthly":
        periodicRate = periodicRate / 12
        numberOfPayments = numberOfPayments * 12
        break
      case "quarterly":
        periodicRate = periodicRate / 4
        numberOfPayments = numberOfPayments * 4
        break
      case "annually":
        // No adjustment needed for annual payments
        break
    }

    // Calculate payment
    const payment = (Number(loanAmount) * periodicRate) / (1 - Math.pow(1 + periodicRate, -numberOfPayments))

    setMonthlyPayment(payment)
    setTotalPayment(payment * numberOfPayments)
    setTotalInterest(payment * numberOfPayments - Number(loanAmount))
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="home-price">Home Price</Label>
        <div className="relative">
          <span className="absolute left-3 top-2.5 text-muted-foreground">{getCurrencySymbol(currency)}</span>
          <Input
            id="home-price"
            type="number"
            min="0"
            step="1000"
            placeholder="300,000"
            className="pl-7"
            value={homePrice}
            onChange={(e) => setHomePrice(e.target.value ? Number(e.target.value) : "")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="down-payment">Down Payment</Label>
          <span className="text-sm font-medium">{downPaymentPercent}%</span>
        </div>
        <div className="relative">
          <span className="absolute left-3 top-2.5 text-muted-foreground">{getCurrencySymbol(currency)}</span>
          <Input
            id="down-payment"
            type="number"
            min="0"
            step="1000"
            placeholder="60,000"
            className="pl-7"
            value={downPayment}
            onChange={(e) => setDownPayment(e.target.value ? Number(e.target.value) : "")}
          />
        </div>
        <Slider
          min={0}
          max={50}
          step={1}
          value={[downPaymentPercent]}
          onValueChange={(value) => setDownPaymentPercent(value[0])}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="loan-term">Loan Term</Label>
          <Tabs defaultValue="30" onValueChange={(value) => setLoanTerm(Number(value))}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="15">15 yr</TabsTrigger>
              <TabsTrigger value="20">20 yr</TabsTrigger>
              <TabsTrigger value="30">30 yr</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="space-y-2">
          <Label htmlFor="interest-rate">Interest Rate</Label>
          <div className="relative">
            <Input
              id="interest-rate"
              type="number"
              min="0"
              step="0.1"
              placeholder="4.5"
              className="pr-7"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value ? Number(e.target.value) : "")}
            />
            <span className="absolute right-3 top-2.5 text-muted-foreground">%</span>
          </div>
        </div>
      </div>

      <CurrencySelect value={currency} onValueChange={setCurrency} label="Currency" />

      <div className="grid grid-cols-3 gap-4 pt-4">
        <div className="bg-primary/10 p-4 rounded-md">
          <p className="text-sm text-muted-foreground">Monthly Payment</p>
          <p className="text-2xl font-bold">{formatCurrency(monthlyPayment)}</p>
        </div>

        <div className="bg-muted p-4 rounded-md">
          <p className="text-sm text-muted-foreground">Total Payment</p>
          <p className="text-2xl font-bold">{formatCurrency(totalPayment)}</p>
        </div>

        <div className="bg-muted p-4 rounded-md">
          <p className="text-sm text-muted-foreground">Total Interest</p>
          <p className="text-2xl font-bold">{formatCurrency(totalInterest)}</p>
        </div>
      </div>
    </div>
  )
}
