"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { CurrencySelect, getCurrencySymbol } from "@/components/ui/currency-select"

export function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState<number | "">(1000)
  const [additionalContribution, setAdditionalContribution] = useState<number | "">("")
  const [contributionFrequency, setContributionFrequency] = useState("monthly")
  const [interestRate, setInterestRate] = useState<number | "">("")
  const [compoundFrequency, setCompoundFrequency] = useState("annually")
  const [timeYears, setTimeYears] = useState<number | "">("")
  const [futureValue, setFutureValue] = useState<number | null>(null)
  const [totalPrincipal, setTotalPrincipal] = useState<number | null>(null)
  const [totalInterest, setTotalInterest] = useState<number | null>(null)
  const [currency, setCurrency] = useState("USD")

  useEffect(() => {
    if (principal !== "" && interestRate !== "" && timeYears !== "") {
      calculateCompoundInterest()
    }
  }, [principal, additionalContribution, contributionFrequency, interestRate, compoundFrequency, timeYears, currency])

  const calculateCompoundInterest = () => {
    if (principal === "" || interestRate === "" || timeYears === "") {
      return
    }

    const p = Number(principal)
    const r = Number(interestRate) / 100
    const t = Number(timeYears)
    const pmt = Number(additionalContribution) || 0

    // Determine number of compounds per year
    let n = 1
    switch (compoundFrequency) {
      case "annually":
        n = 1
        break
      case "semiannually":
        n = 2
        break
      case "quarterly":
        n = 4
        break
      case "monthly":
        n = 12
        break
      case "daily":
        n = 365
        break
    }

    // Determine number of contributions per year
    let pmtFreq = 0
    switch (contributionFrequency) {
      case "monthly":
        pmtFreq = 12
        break
      case "quarterly":
        pmtFreq = 4
        break
      case "annually":
        pmtFreq = 1
        break
    }

    // Calculate future value
    let fv = p * Math.pow(1 + r / n, n * t)

    // Add contributions if any
    if (pmt > 0 && pmtFreq > 0) {
      const ratePerPeriod = r / pmtFreq
      fv += pmt * ((Math.pow(1 + ratePerPeriod, pmtFreq * t) - 1) / ratePerPeriod)
    }

    // Calculate total principal
    const totalPrincipalValue = p + pmt * pmtFreq * t

    setFutureValue(fv)
    setTotalPrincipal(totalPrincipalValue)
    setTotalInterest(fv - totalPrincipalValue)
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
        <Label htmlFor="principal">Initial Investment</Label>
        <div className="relative">
          <span className="absolute left-3 top-2.5 text-muted-foreground">{getCurrencySymbol(currency)}</span>
          <Input
            id="principal"
            type="number"
            min="0"
            step="100"
            placeholder="1000"
            className="pl-7"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value ? Number(e.target.value) : "")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="additional-contribution">Additional Contribution (Optional)</Label>
        <div className="relative">
          <span className="absolute left-3 top-2.5 text-muted-foreground">{getCurrencySymbol(currency)}</span>
          <Input
            id="additional-contribution"
            type="number"
            min="0"
            step="10"
            placeholder="0"
            className="pl-7"
            value={additionalContribution}
            onChange={(e) => setAdditionalContribution(e.target.value ? Number(e.target.value) : "")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Contribution Frequency</Label>
        <Tabs defaultValue="monthly" onValueChange={setContributionFrequency}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
            <TabsTrigger value="annually">Annually</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="interest-rate">Annual Interest Rate (%)</Label>
          <span className="text-sm font-medium">{interestRate}%</span>
        </div>
        <div className="relative">
          <Input
            id="interest-rate"
            type="number"
            min="0.1"
            max="30"
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
        <Label>Compound Frequency</Label>
        <Tabs defaultValue="annually" onValueChange={setCompoundFrequency}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="annually">Annually</TabsTrigger>
            <TabsTrigger value="semiannually">Semi-Annually</TabsTrigger>
            <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="daily">Daily</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="time-years">Time Period (Years)</Label>
          <span className="text-sm font-medium">{timeYears} years</span>
        </div>
        <Input
          id="time-years"
          type="number"
          min="1"
          max="50"
          placeholder="10"
          value={timeYears}
          onChange={(e) => setTimeYears(e.target.value ? Number(e.target.value) : "")}
        />
        <Slider
          min={1}
          max={40}
          step={1}
          value={timeYears !== "" ? [timeYears] : [10]}
          onValueChange={(value) => setTimeYears(value[0])}
          className="mt-2"
        />
      </div>

      <CurrencySelect value={currency} onValueChange={setCurrency} label="Currency" />

      <Button onClick={calculateCompoundInterest} className="w-full">
        Calculate
      </Button>

      {futureValue !== null && (
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Future Value</p>
                <p className="text-xl font-bold">{formatCurrency(futureValue)}</p>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">Total Principal</p>
                <p className="text-xl font-bold">{formatCurrency(totalPrincipal || 0)}</p>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">Total Interest</p>
                <p className="text-xl font-bold">{formatCurrency(totalInterest || 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
