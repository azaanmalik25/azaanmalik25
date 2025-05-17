"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRightLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function CurrencyConverter() {
  const [amount, setAmount] = useState<number | "">("")
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("EUR")
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null)
  const [exchangeRate, setExchangeRate] = useState<number | null>(null)

  // Mock exchange rates (in a real app, these would come from an API)
  const exchangeRates = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 150.59,
    CAD: 1.36,
    AUD: 1.52,
    CHF: 0.89,
    CNY: 7.24,
    INR: 83.42,
    PKR: 278.65,
    MXN: 16.73,
    BRL: 5.05,
    RUB: 91.75,
    KRW: 1345.78,
    TRY: 32.15,
    ZAR: 18.42,
    SGD: 1.34,
    HKD: 7.82,
    NZD: 1.64,
    THB: 35.78,
    SEK: 10.42,
    NOK: 10.65,
    DKK: 6.87,
    AED: 3.67,
    SAR: 3.75,
    QAR: 3.64,
    KWD: 0.31,
    MYR: 4.65,
    IDR: 15750.25,
    PHP: 56.82,
    VND: 25150.75,
  }

  useEffect(() => {
    if (amount !== "") {
      convertCurrency()
    }
  }, [amount, fromCurrency, toCurrency])

  const convertCurrency = () => {
    if (amount === "") return

    const baseRate = exchangeRates[fromCurrency as keyof typeof exchangeRates]
    const targetRate = exchangeRates[toCurrency as keyof typeof exchangeRates]

    const rate = targetRate / baseRate
    const result = Number(amount) * rate

    setExchangeRate(rate)
    setConvertedAmount(result)
  }

  const swapCurrencies = () => {
    const temp = fromCurrency
    setFromCurrency(toCurrency)
    setToCurrency(temp)
  }

  const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          min="0.01"
          step="0.01"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : "")}
        />
      </div>

      <div className="grid grid-cols-[1fr,auto,1fr] gap-2 items-end">
        <div className="space-y-2">
          <Label htmlFor="from-currency">From</Label>
          <Select value={fromCurrency} onValueChange={setFromCurrency}>
            <SelectTrigger id="from-currency">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">US Dollar (USD)</SelectItem>
              <SelectItem value="EUR">Euro (EUR)</SelectItem>
              <SelectItem value="GBP">British Pound (GBP)</SelectItem>
              <SelectItem value="JPY">Japanese Yen (JPY)</SelectItem>
              <SelectItem value="CAD">Canadian Dollar (CAD)</SelectItem>
              <SelectItem value="AUD">Australian Dollar (AUD)</SelectItem>
              <SelectItem value="CHF">Swiss Franc (CHF)</SelectItem>
              <SelectItem value="CNY">Chinese Yuan (CNY)</SelectItem>
              <SelectItem value="INR">Indian Rupee (INR)</SelectItem>
              <SelectItem value="PKR">Pakistani Rupee (PKR)</SelectItem>
              <SelectItem value="MXN">Mexican Peso (MXN)</SelectItem>
              <SelectItem value="BRL">Brazilian Real (BRL)</SelectItem>
              <SelectItem value="RUB">Russian Ruble (RUB)</SelectItem>
              <SelectItem value="KRW">South Korean Won (KRW)</SelectItem>
              <SelectItem value="TRY">Turkish Lira (TRY)</SelectItem>
              <SelectItem value="ZAR">South African Rand (ZAR)</SelectItem>
              <SelectItem value="SGD">Singapore Dollar (SGD)</SelectItem>
              <SelectItem value="HKD">Hong Kong Dollar (HKD)</SelectItem>
              <SelectItem value="NZD">New Zealand Dollar (NZD)</SelectItem>
              <SelectItem value="THB">Thai Baht (THB)</SelectItem>
              <SelectItem value="SEK">Swedish Krona (SEK)</SelectItem>
              <SelectItem value="NOK">Norwegian Krone (NOK)</SelectItem>
              <SelectItem value="DKK">Danish Krone (DKK)</SelectItem>
              <SelectItem value="AED">UAE Dirham (AED)</SelectItem>
              <SelectItem value="SAR">Saudi Riyal (SAR)</SelectItem>
              <SelectItem value="QAR">Qatari Riyal (QAR)</SelectItem>
              <SelectItem value="KWD">Kuwaiti Dinar (KWD)</SelectItem>
              <SelectItem value="MYR">Malaysian Ringgit (MYR)</SelectItem>
              <SelectItem value="IDR">Indonesian Rupiah (IDR)</SelectItem>
              <SelectItem value="PHP">Philippine Peso (PHP)</SelectItem>
              <SelectItem value="VND">Vietnamese Dong (VND)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="ghost" size="icon" onClick={swapCurrencies} className="mb-0.5">
          <ArrowRightLeft className="h-4 w-4" />
        </Button>

        <div className="space-y-2">
          <Label htmlFor="to-currency">To</Label>
          <Select value={toCurrency} onValueChange={setToCurrency}>
            <SelectTrigger id="to-currency">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">US Dollar (USD)</SelectItem>
              <SelectItem value="EUR">Euro (EUR)</SelectItem>
              <SelectItem value="GBP">British Pound (GBP)</SelectItem>
              <SelectItem value="JPY">Japanese Yen (JPY)</SelectItem>
              <SelectItem value="CAD">Canadian Dollar (CAD)</SelectItem>
              <SelectItem value="AUD">Australian Dollar (AUD)</SelectItem>
              <SelectItem value="CHF">Swiss Franc (CHF)</SelectItem>
              <SelectItem value="CNY">Chinese Yuan (CNY)</SelectItem>
              <SelectItem value="INR">Indian Rupee (INR)</SelectItem>
              <SelectItem value="PKR">Pakistani Rupee (PKR)</SelectItem>
              <SelectItem value="MXN">Mexican Peso (MXN)</SelectItem>
              <SelectItem value="BRL">Brazilian Real (BRL)</SelectItem>
              <SelectItem value="RUB">Russian Ruble (RUB)</SelectItem>
              <SelectItem value="KRW">South Korean Won (KRW)</SelectItem>
              <SelectItem value="TRY">Turkish Lira (TRY)</SelectItem>
              <SelectItem value="ZAR">South African Rand (ZAR)</SelectItem>
              <SelectItem value="SGD">Singapore Dollar (SGD)</SelectItem>
              <SelectItem value="HKD">Hong Kong Dollar (HKD)</SelectItem>
              <SelectItem value="NZD">New Zealand Dollar (NZD)</SelectItem>
              <SelectItem value="THB">Thai Baht (THB)</SelectItem>
              <SelectItem value="SEK">Swedish Krona (SEK)</SelectItem>
              <SelectItem value="NOK">Norwegian Krone (NOK)</SelectItem>
              <SelectItem value="DKK">Danish Krone (DKK)</SelectItem>
              <SelectItem value="AED">UAE Dirham (AED)</SelectItem>
              <SelectItem value="SAR">Saudi Riyal (SAR)</SelectItem>
              <SelectItem value="QAR">Qatari Riyal (QAR)</SelectItem>
              <SelectItem value="KWD">Kuwaiti Dinar (KWD)</SelectItem>
              <SelectItem value="MYR">Malaysian Ringgit (MYR)</SelectItem>
              <SelectItem value="IDR">Indonesian Rupiah (IDR)</SelectItem>
              <SelectItem value="PHP">Philippine Peso (PHP)</SelectItem>
              <SelectItem value="VND">Vietnamese Dong (VND)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button onClick={convertCurrency} className="w-full">
        Convert
      </Button>

      {convertedAmount !== null && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Result</p>
              <p className="text-2xl font-bold">{formatCurrency(convertedAmount, toCurrency)}</p>
              <p className="text-sm text-muted-foreground mt-2">
                {formatCurrency(Number(amount), fromCurrency)} = {formatCurrency(convertedAmount, toCurrency)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                1 {fromCurrency} = {exchangeRate?.toFixed(4)} {toCurrency}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
