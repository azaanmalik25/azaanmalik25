"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { CurrencySelect, getCurrencySymbol } from "@/components/ui/currency-select"

export function DiscountCalculator() {
  // Original price and discount percentage
  const [originalPrice, setOriginalPrice] = useState<number | "">("")
  const [discountPercent, setDiscountPercent] = useState<number | "">("")
  const [discountAmount, setDiscountAmount] = useState<number | null>(null)
  const [finalPrice, setFinalPrice] = useState<number | null>(null)
  const [saved, setSaved] = useState<number | null>(null)

  // Calculate from final price
  const [finalPriceInput, setFinalPriceInput] = useState<number | "">("")
  const [originalPriceInput, setOriginalPriceInput] = useState<number | "">("")
  const [calculatedDiscount, setCalculatedDiscount] = useState<number | null>(null)
  const [calculatedSavings, setCalculatedSavings] = useState<number | null>(null)

  // Currency
  const [currency, setCurrency] = useState("USD")

  useEffect(() => {
    if (originalPrice !== "" && discountPercent !== "") {
      calculateDiscount()
    }
  }, [originalPrice, discountPercent, currency])

  useEffect(() => {
    if (finalPriceInput !== "" && originalPriceInput !== "") {
      calculateDiscountFromFinal()
    }
  }, [finalPriceInput, originalPriceInput, currency])

  const calculateDiscount = () => {
    if (originalPrice === "" || discountPercent === "") {
      return
    }

    const original = Number(originalPrice)
    const discount = Number(discountPercent)

    const discountAmt = original * (discount / 100)
    const final = original - discountAmt

    setDiscountAmount(discountAmt)
    setFinalPrice(final)
    setSaved(discountAmt)
  }

  const calculateDiscountFromFinal = () => {
    if (finalPriceInput === "" || originalPriceInput === "") {
      return
    }

    const final = Number(finalPriceInput)
    const original = Number(originalPriceInput)

    if (final >= original) {
      setCalculatedDiscount(0)
      setCalculatedSavings(0)
      return
    }

    const savings = original - final
    const discountPct = (savings / original) * 100

    setCalculatedDiscount(discountPct)
    setCalculatedSavings(savings)
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
      <Tabs defaultValue="calculate-price" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calculate-price">Calculate Sale Price</TabsTrigger>
          <TabsTrigger value="calculate-discount">Calculate Discount</TabsTrigger>
        </TabsList>

        <TabsContent value="calculate-price" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="original-price">Original Price</Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-muted-foreground">{getCurrencySymbol(currency)}</span>
              <Input
                id="original-price"
                type="number"
                min="0.01"
                step="0.01"
                placeholder="100.00"
                className="pl-7"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value ? Number(e.target.value) : "")}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="discount-percent">Discount Percentage</Label>
            <div className="relative">
              <Input
                id="discount-percent"
                type="number"
                min="0"
                max="100"
                step="0.1"
                placeholder="20"
                className="pr-7"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e.target.value ? Number(e.target.value) : "")}
              />
              <span className="absolute right-3 top-2.5 text-muted-foreground">%</span>
            </div>
          </div>

          <CurrencySelect value={currency} onValueChange={setCurrency} label="Currency" />

          <Button onClick={calculateDiscount} className="w-full">
            Calculate
          </Button>

          {finalPrice !== null && (
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Original Price</p>
                    <p className="text-xl font-bold">{formatCurrency(Number(originalPrice))}</p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Discount Amount</p>
                    <p className="text-xl font-bold">{formatCurrency(discountAmount || 0)}</p>
                    <p className="text-xs text-muted-foreground">{discountPercent}% off</p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Final Price</p>
                    <p className="text-xl font-bold">{formatCurrency(finalPrice)}</p>
                    <p className="text-xs text-muted-foreground">You save {formatCurrency(saved || 0)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="calculate-discount" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="original-price-input">Original Price</Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-muted-foreground">{getCurrencySymbol(currency)}</span>
              <Input
                id="original-price-input"
                type="number"
                min="0.01"
                step="0.01"
                placeholder="100.00"
                className="pl-7"
                value={originalPriceInput}
                onChange={(e) => setOriginalPriceInput(e.target.value ? Number(e.target.value) : "")}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="final-price-input">Sale Price</Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-muted-foreground">{getCurrencySymbol(currency)}</span>
              <Input
                id="final-price-input"
                type="number"
                min="0"
                step="0.01"
                placeholder="80.00"
                className="pl-7"
                value={finalPriceInput}
                onChange={(e) => setFinalPriceInput(e.target.value ? Number(e.target.value) : "")}
              />
            </div>
          </div>

          <CurrencySelect value={currency} onValueChange={setCurrency} label="Currency" />

          <Button onClick={calculateDiscountFromFinal} className="w-full">
            Calculate
          </Button>

          {calculatedDiscount !== null && (
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Discount Percentage</p>
                    <p className="text-xl font-bold">{calculatedDiscount.toFixed(2)}%</p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">You Save</p>
                    <p className="text-xl font-bold">{formatCurrency(calculatedSavings || 0)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
