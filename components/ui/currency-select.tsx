"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export interface CurrencySelectProps {
  value: string
  onValueChange: (value: string) => void
  label?: string
  id?: string
}

// Make sure the currency symbols are properly escaped
// For example, replace any problematic symbols if needed

// For PKR, ensure the symbol is properly encoded
export const currencies = {
  USD: { symbol: "$", name: "US Dollar" },
  EUR: { symbol: "€", name: "Euro" },
  GBP: { symbol: "£", name: "British Pound" },
  JPY: { symbol: "¥", name: "Japanese Yen" },
  CAD: { symbol: "C$", name: "Canadian Dollar" },
  AUD: { symbol: "A$", name: "Australian Dollar" },
  CHF: { symbol: "CHF", name: "Swiss Franc" },
  CNY: { symbol: "¥", name: "Chinese Yuan" },
  INR: { symbol: "₹", name: "Indian Rupee" },
  PKR: { symbol: "Rs", name: "Pakistani Rupee" }, // Using "Rs" instead of "₨" to avoid encoding issues
  MXN: { symbol: "$", name: "Mexican Peso" },
  BRL: { symbol: "R$", name: "Brazilian Real" },
  RUB: { symbol: "₽", name: "Russian Ruble" },
  KRW: { symbol: "₩", name: "South Korean Won" },
  TRY: { symbol: "₺", name: "Turkish Lira" },
  ZAR: { symbol: "R", name: "South African Rand" },
  SGD: { symbol: "S$", name: "Singapore Dollar" },
  HKD: { symbol: "HK$", name: "Hong Kong Dollar" },
  NZD: { symbol: "NZ$", name: "New Zealand Dollar" },
  THB: { symbol: "฿", name: "Thai Baht" },
  SEK: { symbol: "kr", name: "Swedish Krona" },
  NOK: { symbol: "kr", name: "Norwegian Krone" },
  DKK: { symbol: "kr", name: "Danish Krone" },
  AED: { symbol: "د.إ", name: "UAE Dirham" },
  SAR: { symbol: "﷼", name: "Saudi Riyal" },
  QAR: { symbol: "﷼", name: "Qatari Riyal" },
  KWD: { symbol: "د.ك", name: "Kuwaiti Dinar" },
  MYR: { symbol: "RM", name: "Malaysian Ringgit" },
  IDR: { symbol: "Rp", name: "Indonesian Rupiah" },
  PHP: { symbol: "₱", name: "Philippine Peso" },
  VND: { symbol: "₫", name: "Vietnamese Dong" },
}

export function CurrencySelect({ value, onValueChange, label, id = "currency" }: CurrencySelectProps) {
  return (
    <div className="space-y-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger id={id}>
          <SelectValue placeholder="Select currency" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(currencies).map(([code, { name }]) => (
            <SelectItem key={code} value={code}>
              {code} - {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export function getCurrencySymbol(currencyCode: string): string {
  return currencies[currencyCode as keyof typeof currencies]?.symbol || "$"
}
