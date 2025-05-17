"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { CurrencySelect, getCurrencySymbol } from "@/components/ui/currency-select"

export function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<number | "">(10000)
  const [interestRate, setInterestRate] = useState<number | "">(5)
  const [loanTerm, setLoanTerm] = useState<number | "">(3)
  const [paymentFrequency, setPaymentFrequency] = useState<string>("monthly")
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0)
  const [totalPayment, setTotalPayment] = useState<number>(0)
  const [totalInterest, setTotalInterest] = useState<number>(0)
  const [currency, setCurrency] = useState("USD")

  useEffect(() => {
    if (loanAmount !== "" && interestRate !== "" && loanTerm !== "") {
      calculateLoan()
    }
  }, [loanAmount, interestRate, loanTerm, paymentFrequency, currency])

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
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="loan-amount">Loan Amount</Label>
        <div className="relative">
          <span className="absolute left-3 top-2.5 text-muted-foreground">{getCurrencySymbol(currency)}</span>
          <Input
            id="loan-amount"
            type="number"
            min="1"
            step="100"
            placeholder="10000"
            className="pl-7"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value ? Number(e.target.value) : "")}
          />
        </div>
        <Slider
          min={1000}
          max={100000}
          step={1000}
          value={loanAmount !== "" ? [loanAmount] : [10000]}
          onValueChange={(value) => setLoanAmount(value[0])}
          className="mt-2"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="interest-rate">Interest Rate (%)</Label>
        <div className="relative">
          <Input
            id="interest-rate"
            type="number"
            min="0.1"
            step="0.1"
            placeholder="5"
            className="pr-7"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value ? Number(e.target.value) : "")}
          />
          <span className="absolute right-3 top-2.5 text-muted-foreground">%</span>
        </div>
        <Slider
          min={0.1}
          max={20}
          step={0.1}
          value={interestRate !== "" ? [interestRate] : [5]}
          onValueChange={(value) => setInterestRate(value[0])}
          className="mt-2"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="loan-term">Loan Term (Years)</Label>
        <Input
          id="loan-term"
          type="number"
          min="1"
          max="30"
          placeholder="3"
          value={loanTerm}
          onChange={(e) => setLoanTerm(e.target.value ? Number(e.target.value) : "")}
        />
        <Slider
          min={1}
          max={30}
          step={1}
          value={loanTerm !== "" ? [loanTerm] : [3]}
          onValueChange={(value) => setLoanTerm(value[0])}
          className="mt-2"
        />
      </div>

      <div className="space-y-2">
        <Label>Payment Frequency</Label>
        <Tabs defaultValue="monthly" onValueChange={setPaymentFrequency}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="biweekly">Biweekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
            <TabsTrigger value="annually">Annually</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <CurrencySelect value={currency} onValueChange={setCurrency} label="Currency" />

      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Payment Amount</p>
              <p className="text-xl font-bold">{formatCurrency(monthlyPayment)}</p>
              <p className="text-xs text-muted-foreground mt-1">per {paymentFrequency.slice(0, -2)}</p>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total Payment</p>
              <p className="text-xl font-bold">{formatCurrency(totalPayment)}</p>
              <p className="text-xs text-muted-foreground mt-1">over {loanTerm} years</p>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total Interest</p>
              <p className="text-xl font-bold">{formatCurrency(totalInterest)}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {((totalInterest / (loanAmount || 1)) * 100).toFixed(1)}% of principal
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
