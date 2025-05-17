"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CurrencySelect, getCurrencySymbol } from "@/components/ui/currency-select"

export function InvestmentCalculator() {
  const [initialInvestment, setInitialInvestment] = useState<number | "">(10000)
  const [monthlyContribution, setMonthlyContribution] = useState<number | "">(200)
  const [annualReturn, setAnnualReturn] = useState<number | "">(7)
  const [investmentLength, setInvestmentLength] = useState<number | "">(10)
  const [compoundFrequency, setCompoundFrequency] = useState<string>("annually")
  const [contributionTiming, setContributionTiming] = useState<string>("end")
  const [futureValue, setFutureValue] = useState<number>(0)
  const [totalContributions, setTotalContributions] = useState<number>(0)
  const [totalInterest, setTotalInterest] = useState<number>(0)
  const [currency, setCurrency] = useState("USD")

  useEffect(() => {
    if (initialInvestment !== "" && annualReturn !== "" && investmentLength !== "") {
      calculateInvestment()
    }
  }, [
    initialInvestment,
    monthlyContribution,
    annualReturn,
    investmentLength,
    compoundFrequency,
    contributionTiming,
    currency,
  ])

  const calculateInvestment = () => {
    if (initialInvestment === "" || annualReturn === "" || investmentLength === "") {
      return
    }

    const principal = Number(initialInvestment)
    const monthlyDeposit = Number(monthlyContribution)
    const rate = Number(annualReturn) / 100
    const years = Number(investmentLength)

    // Determine number of compounds per year
    let compoundsPerYear = 1
    switch (compoundFrequency) {
      case "monthly":
        compoundsPerYear = 12
        break
      case "quarterly":
        compoundsPerYear = 4
        break
      case "semiannually":
        compoundsPerYear = 2
        break
      case "annually":
        compoundsPerYear = 1
        break
    }

    // Calculate future value
    const periodicRate = rate / compoundsPerYear
    const totalCompounds = compoundsPerYear * years

    // Calculate future value of initial investment
    let futureVal = principal * Math.pow(1 + periodicRate, totalCompounds)

    // Calculate future value of periodic deposits
    if (monthlyDeposit > 0) {
      const depositsPerYear = 12
      const periodicDeposit = monthlyDeposit * (12 / depositsPerYear)

      // Calculate based on timing of contributions
      const depositRate = rate / depositsPerYear
      const totalDeposits = depositsPerYear * years

      if (contributionTiming === "beginning") {
        // Contributions made at the beginning of each period
        futureVal +=
          periodicDeposit * ((Math.pow(1 + depositRate, totalDeposits) - 1) / depositRate) * (1 + depositRate)
      } else {
        // Contributions made at the end of each period
        futureVal += periodicDeposit * ((Math.pow(1 + depositRate, totalDeposits) - 1) / depositRate)
      }
    }

    // Calculate total contributions
    const totalContrib = principal + monthlyDeposit * 12 * years

    setFutureValue(futureVal)
    setTotalContributions(totalContrib)
    setTotalInterest(futureVal - totalContrib)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="initial-investment">Initial Investment</Label>
        <div className="relative">
          <span className="absolute left-3 top-2.5 text-muted-foreground">{getCurrencySymbol(currency)}</span>
          <Input
            id="initial-investment"
            type="number"
            min="0"
            step="100"
            placeholder="10000"
            className="pl-7"
            value={initialInvestment}
            onChange={(e) => setInitialInvestment(e.target.value ? Number(e.target.value) : "")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="monthly-contribution">Monthly Contribution</Label>
        <div className="relative">
          <span className="absolute left-3 top-2.5 text-muted-foreground">{getCurrencySymbol(currency)}</span>
          <Input
            id="monthly-contribution"
            type="number"
            min="0"
            step="10"
            placeholder="200"
            className="pl-7"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(e.target.value ? Number(e.target.value) : "")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="annual-return">Annual Return (%)</Label>
          <span className="text-sm font-medium">{annualReturn}%</span>
        </div>
        <div className="relative">
          <Input
            id="annual-return"
            type="number"
            min="0.1"
            max="30"
            step="0.1"
            placeholder="7"
            className="pr-7"
            value={annualReturn}
            onChange={(e) => setAnnualReturn(e.target.value ? Number(e.target.value) : "")}
          />
          <span className="absolute right-3 top-2.5 text-muted-foreground">%</span>
        </div>
        <Slider
          min={0.1}
          max={20}
          step={0.1}
          value={annualReturn !== "" ? [annualReturn] : [7]}
          onValueChange={(value) => setAnnualReturn(value[0])}
          className="mt-2"
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="investment-length">Investment Length (Years)</Label>
          <span className="text-sm font-medium">{investmentLength} years</span>
        </div>
        <Input
          id="investment-length"
          type="number"
          min="1"
          max="50"
          placeholder="10"
          value={investmentLength}
          onChange={(e) => setInvestmentLength(e.target.value ? Number(e.target.value) : "")}
        />
        <Slider
          min={1}
          max={40}
          step={1}
          value={investmentLength !== "" ? [investmentLength] : [10]}
          onValueChange={(value) => setInvestmentLength(value[0])}
          className="mt-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Compound Frequency</Label>
          <Tabs defaultValue="annually" onValueChange={setCompoundFrequency}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
              <TabsTrigger value="semiannually">Semi-Annual</TabsTrigger>
              <TabsTrigger value="annually">Annual</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="space-y-2">
          <Label>Contribution Timing</Label>
          <RadioGroup defaultValue="end" onValueChange={setContributionTiming} className="flex">
            <div className="flex items-center space-x-2 flex-1">
              <RadioGroupItem value="beginning" id="beginning" />
              <Label htmlFor="beginning" className="cursor-pointer">
                Beginning
              </Label>
            </div>
            <div className="flex items-center space-x-2 flex-1">
              <RadioGroupItem value="end" id="end" />
              <Label htmlFor="end" className="cursor-pointer">
                End
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <CurrencySelect value={currency} onValueChange={setCurrency} label="Currency" />

      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Future Value</p>
              <p className="text-xl font-bold">{formatCurrency(futureValue)}</p>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total Contributions</p>
              <p className="text-xl font-bold">{formatCurrency(totalContributions)}</p>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total Interest</p>
              <p className="text-xl font-bold">{formatCurrency(totalInterest)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
