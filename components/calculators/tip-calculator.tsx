"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { CurrencySelect, getCurrencySymbol } from "@/components/ui/currency-select"

export function TipCalculator() {
  const [billAmount, setBillAmount] = useState<number | "">("")
  const [tipPercentage, setTipPercentage] = useState<number>(15)
  const [numberOfPeople, setNumberOfPeople] = useState<number | "">(1)
  const [tipAmount, setTipAmount] = useState<number>(0)
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const [amountPerPerson, setAmountPerPerson] = useState<number>(0)
  const [currency, setCurrency] = useState("USD")

  useEffect(() => {
    if (billAmount !== "" && tipPercentage && numberOfPeople !== "") {
      const bill = Number(billAmount)
      const people = Number(numberOfPeople)

      const tip = bill * (tipPercentage / 100)
      const total = bill + tip
      const perPerson = total / (people || 1)

      setTipAmount(tip)
      setTotalAmount(total)
      setAmountPerPerson(perPerson)
    } else {
      setTipAmount(0)
      setTotalAmount(0)
      setAmountPerPerson(0)
    }
  }, [billAmount, tipPercentage, numberOfPeople, currency])

  const handleQuickTip = (percentage: number) => {
    setTipPercentage(percentage)
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
        <Label htmlFor="bill-amount">Bill Amount</Label>
        <div className="relative">
          <span className="absolute left-3 top-2.5 text-muted-foreground">{getCurrencySymbol(currency)}</span>
          <Input
            id="bill-amount"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            className="pl-7"
            value={billAmount}
            onChange={(e) => setBillAmount(e.target.value ? Number(e.target.value) : "")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="tip-percentage">Tip Percentage</Label>
          <span className="text-sm font-medium">{tipPercentage}%</span>
        </div>
        <Slider
          id="tip-percentage"
          min={0}
          max={30}
          step={1}
          value={[tipPercentage]}
          onValueChange={(value) => setTipPercentage(value[0])}
        />
        <div className="flex justify-between gap-2 mt-2">
          {[10, 15, 20, 25].map((percentage) => (
            <Button
              key={percentage}
              variant={tipPercentage === percentage ? "default" : "outline"}
              size="sm"
              onClick={() => handleQuickTip(percentage)}
              className="flex-1"
            >
              {percentage}%
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="number-of-people">Number of People</Label>
        <Input
          id="number-of-people"
          type="number"
          min="1"
          placeholder="1"
          value={numberOfPeople}
          onChange={(e) => setNumberOfPeople(e.target.value ? Number(e.target.value) : "")}
        />
      </div>

      <CurrencySelect value={currency} onValueChange={setCurrency} label="Currency" />

      <div className="grid grid-cols-2 gap-4 pt-4">
        <div className="bg-muted p-4 rounded-md">
          <p className="text-sm text-muted-foreground">Tip Amount</p>
          <p className="text-2xl font-bold">{formatCurrency(tipAmount)}</p>
          {numberOfPeople && numberOfPeople > 1 && (
            <p className="text-xs text-muted-foreground">
              {formatCurrency(tipAmount / Number(numberOfPeople))} per person
            </p>
          )}
        </div>

        <div className="bg-primary/10 p-4 rounded-md">
          <p className="text-sm text-muted-foreground">Total Amount</p>
          <p className="text-2xl font-bold">{formatCurrency(totalAmount)}</p>
          {numberOfPeople && numberOfPeople > 1 && (
            <p className="text-xs text-muted-foreground">{formatCurrency(amountPerPerson)} per person</p>
          )}
        </div>
      </div>
    </div>
  )
}
