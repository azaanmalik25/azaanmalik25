"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { getCurrencySymbol } from "@/components/ui/currency-select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"
import { RedBlackBanner } from "@/components/red-black-banner"

// Tax brackets for multiple years (US)
const TAX_BRACKETS = {
  2025: {
    single: [
      { rate: 0.1, min: 0, max: 12000 },
      { rate: 0.12, min: 12001, max: 48800 },
      { rate: 0.22, min: 48801, max: 104000 },
      { rate: 0.24, min: 104001, max: 199000 },
      { rate: 0.32, min: 199001, max: 252500 },
      { rate: 0.35, min: 252501, max: 631000 },
      { rate: 0.37, min: 631001, max: Number.POSITIVE_INFINITY },
    ],
    married: [
      { rate: 0.1, min: 0, max: 24000 },
      { rate: 0.12, min: 24001, max: 97600 },
      { rate: 0.22, min: 97601, max: 208000 },
      { rate: 0.24, min: 208001, max: 398000 },
      { rate: 0.32, min: 398001, max: 505000 },
      { rate: 0.35, min: 505001, max: 757000 },
      { rate: 0.37, min: 757001, max: Number.POSITIVE_INFINITY },
    ],
    head: [
      { rate: 0.1, min: 0, max: 17100 },
      { rate: 0.12, min: 17101, max: 65300 },
      { rate: 0.22, min: 65301, max: 104000 },
      { rate: 0.24, min: 104001, max: 199000 },
      { rate: 0.32, min: 199001, max: 252500 },
      { rate: 0.35, min: 252501, max: 631000 },
      { rate: 0.37, min: 631001, max: Number.POSITIVE_INFINITY },
    ],
  },
  2024: {
    single: [
      { rate: 0.1, min: 0, max: 11600 },
      { rate: 0.12, min: 11601, max: 47150 },
      { rate: 0.22, min: 47151, max: 100525 },
      { rate: 0.24, min: 100526, max: 191950 },
      { rate: 0.32, min: 191951, max: 243725 },
      { rate: 0.35, min: 243726, max: 609350 },
      { rate: 0.37, min: 609351, max: Number.POSITIVE_INFINITY },
    ],
    married: [
      { rate: 0.1, min: 0, max: 23200 },
      { rate: 0.12, min: 23201, max: 94300 },
      { rate: 0.22, min: 94301, max: 201050 },
      { rate: 0.24, min: 201051, max: 383900 },
      { rate: 0.32, min: 383901, max: 487450 },
      { rate: 0.35, min: 487451, max: 731200 },
      { rate: 0.37, min: 731201, max: Number.POSITIVE_INFINITY },
    ],
    head: [
      { rate: 0.1, min: 0, max: 16550 },
      { rate: 0.12, min: 16551, max: 63100 },
      { rate: 0.22, min: 63101, max: 100500 },
      { rate: 0.24, min: 100501, max: 191950 },
      { rate: 0.32, min: 191951, max: 243700 },
      { rate: 0.35, min: 243701, max: 609350 },
      { rate: 0.37, min: 609351, max: Number.POSITIVE_INFINITY },
    ],
  },
  2023: {
    single: [
      { rate: 0.1, min: 0, max: 11000 },
      { rate: 0.12, min: 11001, max: 44725 },
      { rate: 0.22, min: 44726, max: 95375 },
      { rate: 0.24, min: 95376, max: 182100 },
      { rate: 0.32, min: 182101, max: 231250 },
      { rate: 0.35, min: 231251, max: 578125 },
      { rate: 0.37, min: 578126, max: Number.POSITIVE_INFINITY },
    ],
    married: [
      { rate: 0.1, min: 0, max: 22000 },
      { rate: 0.12, min: 22001, max: 89450 },
      { rate: 0.22, min: 89451, max: 190750 },
      { rate: 0.24, min: 190751, max: 364200 },
      { rate: 0.32, min: 364201, max: 462500 },
      { rate: 0.35, min: 462501, max: 693750 },
      { rate: 0.37, min: 693751, max: Number.POSITIVE_INFINITY },
    ],
    head: [
      { rate: 0.1, min: 0, max: 15700 },
      { rate: 0.12, min: 15701, max: 59850 },
      { rate: 0.22, min: 59851, max: 95350 },
      { rate: 0.24, min: 95351, max: 182100 },
      { rate: 0.32, min: 182101, max: 231250 },
      { rate: 0.35, min: 231251, max: 578100 },
      { rate: 0.37, min: 578101, max: Number.POSITIVE_INFINITY },
    ],
  },
  2022: {
    single: [
      { rate: 0.1, min: 0, max: 10275 },
      { rate: 0.12, min: 10276, max: 41775 },
      { rate: 0.22, min: 41776, max: 89075 },
      { rate: 0.24, min: 89076, max: 170050 },
      { rate: 0.32, min: 170051, max: 215950 },
      { rate: 0.35, min: 215951, max: 539900 },
      { rate: 0.37, min: 539901, max: Number.POSITIVE_INFINITY },
    ],
    married: [
      { rate: 0.1, min: 0, max: 20550 },
      { rate: 0.12, min: 20551, max: 83550 },
      { rate: 0.22, min: 83551, max: 178150 },
      { rate: 0.24, min: 178151, max: 340100 },
      { rate: 0.32, min: 340101, max: 431900 },
      { rate: 0.35, min: 431901, max: 647850 },
      { rate: 0.37, min: 647851, max: Number.POSITIVE_INFINITY },
    ],
    head: [
      { rate: 0.1, min: 0, max: 14650 },
      { rate: 0.12, min: 14651, max: 55900 },
      { rate: 0.22, min: 55901, max: 89050 },
      { rate: 0.24, min: 89051, max: 170050 },
      { rate: 0.32, min: 170051, max: 215950 },
      { rate: 0.35, min: 215951, max: 539900 },
      { rate: 0.37, min: 539901, max: Number.POSITIVE_INFINITY },
    ],
  },
  2021: {
    single: [
      { rate: 0.1, min: 0, max: 9950 },
      { rate: 0.12, min: 9951, max: 40525 },
      { rate: 0.22, min: 40526, max: 86375 },
      { rate: 0.24, min: 86376, max: 164925 },
      { rate: 0.32, min: 164926, max: 209425 },
      { rate: 0.35, min: 209426, max: 523600 },
      { rate: 0.37, min: 523601, max: Number.POSITIVE_INFINITY },
    ],
    married: [
      { rate: 0.1, min: 0, max: 19900 },
      { rate: 0.12, min: 19901, max: 81050 },
      { rate: 0.22, min: 81051, max: 172750 },
      { rate: 0.24, min: 172751, max: 329850 },
      { rate: 0.32, min: 329851, max: 418850 },
      { rate: 0.35, min: 418851, max: 628300 },
      { rate: 0.37, min: 628301, max: Number.POSITIVE_INFINITY },
    ],
    head: [
      { rate: 0.1, min: 0, max: 14200 },
      { rate: 0.12, min: 14201, max: 54200 },
      { rate: 0.22, min: 54201, max: 86350 },
      { rate: 0.24, min: 86351, max: 164900 },
      { rate: 0.32, min: 164901, max: 209400 },
      { rate: 0.35, min: 209401, max: 523600 },
      { rate: 0.37, min: 523601, max: Number.POSITIVE_INFINITY },
    ],
  },
  2020: {
    single: [
      { rate: 0.1, min: 0, max: 9875 },
      { rate: 0.12, min: 9876, max: 40125 },
      { rate: 0.22, min: 40126, max: 85525 },
      { rate: 0.24, min: 85526, max: 163300 },
      { rate: 0.32, min: 163301, max: 207350 },
      { rate: 0.35, min: 207351, max: 518400 },
      { rate: 0.37, min: 518401, max: Number.POSITIVE_INFINITY },
    ],
    married: [
      { rate: 0.1, min: 0, max: 19750 },
      { rate: 0.12, min: 19751, max: 80250 },
      { rate: 0.22, min: 80251, max: 171050 },
      { rate: 0.24, min: 171051, max: 326600 },
      { rate: 0.32, min: 326601, max: 414700 },
      { rate: 0.35, min: 414701, max: 622050 },
      { rate: 0.37, min: 622051, max: Number.POSITIVE_INFINITY },
    ],
    head: [
      { rate: 0.1, min: 0, max: 14100 },
      { rate: 0.12, min: 14101, max: 53700 },
      { rate: 0.22, min: 53701, max: 85500 },
      { rate: 0.24, min: 85501, max: 163300 },
      { rate: 0.32, min: 163301, max: 207350 },
      { rate: 0.35, min: 207351, max: 518400 },
      { rate: 0.37, min: 518401, max: Number.POSITIVE_INFINITY },
    ],
  },
}

// Update Pakistan tax brackets with latest FBR rates (2023-2024)
const PAKISTAN_TAX_BRACKETS = {
  2023: [
    { rate: 0.0, min: 0, max: 600000 },
    { rate: 0.05, min: 600001, max: 1200000, base: 0, excess: 600000 },
    { rate: 0.1, min: 1200001, max: 2400000, base: 30000, excess: 1200000 },
    { rate: 0.15, min: 2400001, max: 3600000, base: 150000, excess: 2400000 },
    { rate: 0.2, min: 3600001, max: 6000000, base: 330000, excess: 3600000 },
    { rate: 0.25, min: 6000001, max: 12000000, base: 810000, excess: 6000000 },
    { rate: 0.325, min: 12000001, max: Number.POSITIVE_INFINITY, base: 2310000, excess: 12000000 },
  ],
}

// Standard deduction amounts for multiple years
const STANDARD_DEDUCTION = {
  2025: {
    single: 15400,
    married: 30800,
    head: 23100,
  },
  2024: {
    single: 14600,
    married: 29200,
    head: 21900,
  },
  2023: {
    single: 13850,
    married: 27700,
    head: 20800,
  },
  2022: {
    single: 12950,
    married: 25900,
    head: 19400,
  },
  2021: {
    single: 12550,
    married: 25100,
    head: 18800,
  },
  2020: {
    single: 12400,
    married: 24800,
    head: 18650,
  },
}

type FilingStatus = "single" | "married" | "head"
type TaxYear = string

export default function IncomeTaxCalculator() {
  const [income, setIncome] = useState<number | "">("")
  const [filingStatus, setFilingStatus] = useState<FilingStatus>("single")
  const [deductions, setDeductions] = useState<number | "">("")
  const [useStandardDeduction, setUseStandardDeduction] = useState(true)
  const [taxCredits, setTaxCredits] = useState<number | "">("")
  const [currency, setCurrency] = useState("USD")
  const [taxYear, setTaxYear] = useState<TaxYear>("2023")
  const [customYear, setCustomYear] = useState<number>(2030)
  const [state, setState] = useState("federal")

  // Add this to the component function, after the existing state variables
  const [country, setCountry] = useState<"us" | "pakistan">("us")
  const [salaryFrequency, setSalaryFrequency] = useState<"monthly" | "annual">("annual")

  const [taxableIncome, setTaxableIncome] = useState<number | null>(null)
  const [federalTax, setFederalTax] = useState<number | null>(null)
  const [effectiveRate, setEffectiveRate] = useState<number | null>(null)
  const [marginalRate, setMarginalRate] = useState<number | null>(null)
  const [takeHomeIncome, setTakeHomeIncome] = useState<number | null>(null)
  const [bracketBreakdown, setBracketBreakdown] = useState<Array<{ rate: number; amount: number }>>([])

  // Update the getTaxBracketsForYear function to handle Pakistan
  const getTaxBracketsForYear = (year: string | number): (typeof TAX_BRACKETS)["2023"] | null => {
    // If Pakistan is selected, return Pakistan tax brackets
    if (country === "pakistan") {
      return null // We'll handle Pakistan tax calculation differently
    }

    // Original US tax bracket logic
    const numericYear = typeof year === "string" ? Number.parseInt(year, 10) : year

    // If the year exists in our predefined brackets, use those
    if (numericYear <= 2025 && TAX_BRACKETS[numericYear as keyof typeof TAX_BRACKETS]) {
      return TAX_BRACKETS[numericYear as keyof typeof TAX_BRACKETS]
    }

    // For years after 2025, we need to project based on post-TCJA expiration
    // This is a simplified model assuming brackets revert to pre-TCJA with inflation adjustments

    // Base inflation factor (compound annual growth rate of ~2.5%)
    const baseYear = 2025
    const inflationFactor = Math.pow(1.025, numericYear - baseYear)

    // Project brackets based on 2025 with inflation adjustment
    return {
      single: [
        { rate: 0.1, min: 0, max: Math.round(12000 * inflationFactor) },
        { rate: 0.15, min: Math.round(12000 * inflationFactor) + 1, max: Math.round(50000 * inflationFactor) },
        { rate: 0.25, min: Math.round(50000 * inflationFactor) + 1, max: Math.round(100000 * inflationFactor) },
        { rate: 0.28, min: Math.round(100000 * inflationFactor) + 1, max: Math.round(200000 * inflationFactor) },
        { rate: 0.33, min: Math.round(200000 * inflationFactor) + 1, max: Math.round(400000 * inflationFactor) },
        { rate: 0.35, min: Math.round(400000 * inflationFactor) + 1, max: Math.round(600000 * inflationFactor) },
        { rate: 0.396, min: Math.round(600000 * inflationFactor) + 1, max: Number.POSITIVE_INFINITY },
      ],
      married: [
        { rate: 0.1, min: 0, max: Math.round(24000 * inflationFactor) },
        { rate: 0.15, min: Math.round(24000 * inflationFactor) + 1, max: Math.round(100000 * inflationFactor) },
        { rate: 0.25, min: Math.round(100000 * inflationFactor) + 1, max: Math.round(200000 * inflationFactor) },
        { rate: 0.28, min: Math.round(200000 * inflationFactor) + 1, max: Math.round(400000 * inflationFactor) },
        { rate: 0.33, min: Math.round(400000 * inflationFactor) + 1, max: Math.round(600000 * inflationFactor) },
        { rate: 0.35, min: Math.round(600000 * inflationFactor) + 1, max: Math.round(1000000 * inflationFactor) },
        { rate: 0.396, min: Math.round(1000000 * inflationFactor) + 1, max: Number.POSITIVE_INFINITY },
      ],
      head: [
        { rate: 0.1, min: 0, max: Math.round(17100 * inflationFactor) },
        { rate: 0.15, min: Math.round(17100 * inflationFactor) + 1, max: Math.round(75000 * inflationFactor) },
        { rate: 0.25, min: Math.round(75000 * inflationFactor) + 1, max: Math.round(150000 * inflationFactor) },
        { rate: 0.28, min: Math.round(150000 * inflationFactor) + 1, max: Math.round(300000 * inflationFactor) },
        { rate: 0.33, min: Math.round(300000 * inflationFactor) + 1, max: Math.round(500000 * inflationFactor) },
        { rate: 0.35, min: Math.round(500000 * inflationFactor) + 1, max: Math.round(800000 * inflationFactor) },
        { rate: 0.396, min: Math.round(800000 * inflationFactor) + 1, max: Number.POSITIVE_INFINITY },
      ],
    }
  }

  // Add a function to calculate Pakistan income tax
  const calculatePakistanIncomeTax = (income: number): number => {
    // If monthly salary, convert to annual for calculation
    const annualIncome = salaryFrequency === "monthly" ? income * 12 : income
    const brackets = PAKISTAN_TAX_BRACKETS[2023] // Using 2023 brackets
    let tax = 0

    for (const bracket of brackets) {
      if (annualIncome > bracket.min) {
        if (bracket.rate === 0) {
          // For 0% bracket, no tax
          continue
        } else if ("base" in bracket && "excess" in bracket) {
          // For brackets with base amount and excess calculation
          if (annualIncome <= bracket.max) {
            // Income falls within this bracket
            tax = bracket.base + bracket.rate * (annualIncome - bracket.excess)
            break
          }
        } else {
          // Fallback for simple rate calculation
          const taxableAmountInBracket = Math.min(annualIncome, bracket.max) - bracket.min
          tax += taxableAmountInBracket * bracket.rate
        }
      }
    }

    // If monthly salary, return monthly tax
    return salaryFrequency === "monthly" ? tax / 12 : tax
  }

  // Calculate taxes when inputs change
  useEffect(() => {
    if (income === "") return

    if (country === "pakistan") {
      // Pakistan tax calculation
      const incomeTax = calculatePakistanIncomeTax(Number(income))
      setFederalTax(incomeTax)

      // For display purposes, use the appropriate income amount
      const incomeForCalculation = salaryFrequency === "monthly" ? Number(income) * 12 : Number(income)
      const incomeForDisplay = Number(income)

      setTaxableIncome(incomeForDisplay) // In Pakistan's case, we're not handling deductions in this simplified model
      setEffectiveRate((incomeTax / incomeForDisplay) * 100)
      setTakeHomeIncome(incomeForDisplay - incomeTax)

      // Set bracket breakdown for Pakistan
      const brackets = PAKISTAN_TAX_BRACKETS[2023]
      const breakdown: Array<{ rate: number; amount: number }> = []

      for (const bracket of brackets) {
        if (Number(income) > bracket.min) {
          let taxForBracket = 0

          if (bracket.rate === 0) {
            // No tax for 0% bracket
            taxForBracket = 0
          } else if ("base" in bracket && "excess" in bracket) {
            if (Number(income) <= bracket.max) {
              // Income falls within this bracket
              taxForBracket = bracket.rate * (Number(income) - bracket.excess)
            } else {
              // Income exceeds this bracket
              taxForBracket = bracket.rate * (bracket.max - bracket.excess)
            }
          }

          if (taxForBracket > 0) {
            breakdown.push({
              rate: bracket.rate * 100,
              amount: taxForBracket,
            })
          }
        }
      }

      setBracketBreakdown(breakdown)

      // Find marginal rate (highest bracket rate that applies)
      for (let i = brackets.length - 1; i >= 0; i--) {
        if (Number(income) > brackets[i].min) {
          setMarginalRate(brackets[i].rate * 100)
          break
        }
      }

      return
    }

    // Original US tax calculation logic
    const yearToUse = taxYear === "custom" ? customYear.toString() : taxYear

    // Calculate taxable income
    const standardDeduction = getStandardDeductionForYear(yearToUse, filingStatus)
    const deductionAmount = useStandardDeduction ? standardDeduction : deductions || 0
    const calculatedTaxableIncome = Math.max(0, Number(income) - deductionAmount)
    setTaxableIncome(calculatedTaxableIncome)

    // Calculate federal tax
    const brackets = getTaxBracketsForYear(yearToUse)?.[filingStatus]
    if (!brackets) return

    let totalTax = 0
    const breakdown: Array<{ rate: number; amount: number }> = []

    for (let i = 0; i < brackets.length; i++) {
      const bracket = brackets[i]
      if (calculatedTaxableIncome > bracket.min) {
        const taxableAmountInBracket = Math.min(calculatedTaxableIncome, bracket.max) - bracket.min
        const taxForBracket = taxableAmountInBracket * bracket.rate
        totalTax += taxForBracket

        if (taxForBracket > 0) {
          breakdown.push({
            rate: bracket.rate * 100,
            amount: taxForBracket,
          })
        }
      }
    }

    // Apply tax credits
    const taxAfterCredits = Math.max(0, totalTax - (Number(taxCredits) || 0))
    setFederalTax(taxAfterCredits)
    setBracketBreakdown(breakdown)

    // Calculate rates
    if (calculatedTaxableIncome > 0) {
      setEffectiveRate((taxAfterCredits / Number(income)) * 100)

      // Find marginal rate (highest bracket rate that applies)
      for (let i = brackets.length - 1; i >= 0; i--) {
        if (calculatedTaxableIncome > brackets[i].min) {
          setMarginalRate(brackets[i].rate * 100)
          break
        }
      }
    } else {
      setEffectiveRate(0)
      setMarginalRate(0)
    }

    // Calculate take-home income
    setTakeHomeIncome(Number(income) - taxAfterCredits)
  }, [
    income,
    filingStatus,
    deductions,
    useStandardDeduction,
    taxCredits,
    taxYear,
    customYear,
    country,
    salaryFrequency,
  ])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Render tax year selector with custom year option
  const renderTaxYearSelector = () => {
    // Handle custom year input if "custom" is selected
    if (taxYear === "custom") {
      return (
        <div className="space-y-2">
          <Label htmlFor="custom-year">Enter Tax Year</Label>
          <Input
            id="custom-year"
            type="number"
            min="2026"
            max="2100"
            value={customYear}
            onChange={(e) => {
              const year = Number.parseInt(e.target.value)
              if (!isNaN(year) && year >= 2026) {
                setCustomYear(year)
              }
            }}
          />
        </div>
      )
    }

    // Otherwise show the dropdown
    return (
      <div className="space-y-2">
        <Label htmlFor="tax-year">Tax Year</Label>
        <Select
          value={taxYear}
          onValueChange={(value) => {
            setTaxYear(value)
            if (value === "custom") {
              // If custom is selected, initialize with a reasonable value
              setCustomYear(2030)
            }
          }}
        >
          <SelectTrigger id="tax-year">
            <SelectValue placeholder="Select tax year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2023">2023</SelectItem>
            <SelectItem value="2022">2022</SelectItem>
            <SelectItem value="2021">2021</SelectItem>
            <SelectItem value="2020">2020</SelectItem>
            <SelectItem value="2024">2024 (Projected)</SelectItem>
            <SelectItem value="2025">2025 (Projected)</SelectItem>
            <SelectItem value="2026">2026 (Projected)</SelectItem>
            <SelectItem value="2030">2030 (Projected)</SelectItem>
            <SelectItem value="2035">2035 (Projected)</SelectItem>
            <SelectItem value="2040">2040 (Projected)</SelectItem>
            <SelectItem value="2045">2045 (Projected)</SelectItem>
            <SelectItem value="2050">2050 (Projected)</SelectItem>
            <SelectItem value="custom">Custom Year...</SelectItem>
          </SelectContent>
        </Select>
      </div>
    )
  }

  // Function to get standard deduction for a given year
  const getStandardDeductionForYear = (year: string | number, filingStatus: FilingStatus): number => {
    const numericYear = typeof year === "string" ? Number.parseInt(year, 10) : year

    if (STANDARD_DEDUCTION[numericYear as keyof typeof STANDARD_DEDUCTION]) {
      return STANDARD_DEDUCTION[numericYear as keyof typeof STANDARD_DEDUCTION][filingStatus]
    }

    // If year is not found, return a default value or handle the case as needed
    // Here, we return the latest available standard deduction, adjusted for inflation
    const latestYear = Math.max(...Object.keys(STANDARD_DEDUCTION).map(Number))
    const inflationFactor = Math.pow(1.025, numericYear - latestYear) // Assuming 2.5% inflation

    return Math.round(STANDARD_DEDUCTION[latestYear as keyof typeof STANDARD_DEDUCTION][filingStatus] * inflationFactor)
  }

  return (
    <div className="space-y-6">
      <RedBlackBanner
        messages={[
          { text: "⚠️ IMPORTANT TAX NOTICE ⚠️", highlight: true },
          { text: "Latest FBR Tax Rates for 2023-2024 Included" },
          { text: "🇵🇰", highlight: true },
          { text: "Calculate Monthly or Annual Tax Obligations" },
          { text: "⚠️", highlight: true },
          { text: "Pakistan Tax Calculator Updated with Latest Rates" },
          { text: "💰", highlight: true },
          { text: "Plan Your Finances with Accurate Tax Calculations" },
        ]}
        speed={60}
      />
      <Tabs defaultValue="federal" onValueChange={setState}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="federal">Federal Tax</TabsTrigger>
          <TabsTrigger value="state">State Tax (Coming Soon)</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-2">
        <Label>Country</Label>
        <RadioGroup
          value={country}
          onValueChange={(value) => {
            setCountry(value as "us" | "pakistan")
            if (value === "pakistan") {
              setCurrency("PKR")
            } else {
              setCurrency("USD")
            }
          }}
          className="grid grid-cols-2 gap-2"
        >
          <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted">
            <RadioGroupItem value="us" id="us" />
            <Label htmlFor="us" className="cursor-pointer">
              United States
            </Label>
          </div>
          <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted">
            <RadioGroupItem value="pakistan" id="pakistan" />
            <Label htmlFor="pakistan" className="cursor-pointer">
              Pakistan
            </Label>
          </div>
        </RadioGroup>
      </div>

      {country === "pakistan" && (
        <div className="space-y-2">
          <Label>Salary Frequency</Label>
          <RadioGroup
            value={salaryFrequency}
            onValueChange={(value) => setSalaryFrequency(value as "monthly" | "annual")}
            className="grid grid-cols-2 gap-2"
          >
            <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted">
              <RadioGroupItem value="monthly" id="monthly" />
              <Label htmlFor="monthly" className="cursor-pointer">
                Monthly Salary
              </Label>
            </div>
            <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted">
              <RadioGroupItem value="annual" id="annual" />
              <Label htmlFor="annual" className="cursor-pointer">
                Annual Salary
              </Label>
            </div>
          </RadioGroup>
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="income">
            {country === "pakistan" && salaryFrequency === "monthly" ? "Monthly Salary" : "Annual Income"}
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-muted-foreground">{getCurrencySymbol(currency)}</span>
            <Input
              id="income"
              type="number"
              min="0"
              step="1000"
              placeholder="Enter your annual income"
              className="pl-7"
              value={income}
              onChange={(e) => setIncome(e.target.value ? Number(e.target.value) : "")}
            />
          </div>
          {income !== "" && (
            <Slider
              min={0}
              max={500000}
              step={1000}
              value={[Number(income)]}
              onValueChange={(value) => setIncome(value[0])}
              className="mt-2"
            />
          )}
        </div>

        {country === "us" && (
          <>
            <div className="space-y-2">
              <Label>Filing Status</Label>
              <RadioGroup
                value={filingStatus}
                onValueChange={(value) => setFilingStatus(value as FilingStatus)}
                className="grid grid-cols-3 gap-2"
              >
                <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted">
                  <RadioGroupItem value="single" id="single" />
                  <Label htmlFor="single" className="cursor-pointer">
                    Single
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted">
                  <RadioGroupItem value="married" id="married" />
                  <Label htmlFor="married" className="cursor-pointer">
                    Married Filing Jointly
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted">
                  <RadioGroupItem value="head" id="head" />
                  <Label htmlFor="head" className="cursor-pointer">
                    Head of Household
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Deductions</Label>
                <RadioGroup
                  value={useStandardDeduction ? "standard" : "itemized"}
                  onValueChange={(value) => setUseStandardDeduction(value === "standard")}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="cursor-pointer">
                      Standard (
                      {formatCurrency(
                        getStandardDeductionForYear(taxYear === "custom" ? customYear : taxYear, filingStatus),
                      )}
                      )
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="itemized" id="itemized" />
                    <Label htmlFor="itemized" className="cursor-pointer">
                      Itemized
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {!useStandardDeduction && (
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-muted-foreground">{getCurrencySymbol(currency)}</span>
                  <Input
                    id="deductions"
                    type="number"
                    min="0"
                    step="100"
                    placeholder="Enter itemized deductions"
                    className="pl-7"
                    value={deductions}
                    onChange={(e) => setDeductions(e.target.value ? Number(e.target.value) : "")}
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="tax-credits">Tax Credits</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-muted-foreground">{getCurrencySymbol(currency)}</span>
                <Input
                  id="tax-credits"
                  type="number"
                  min="0"
                  step="100"
                  placeholder="Enter tax credits"
                  className="pl-7"
                  value={taxCredits}
                  onChange={(e) => setTaxCredits(e.target.value ? Number(e.target.value) : "")}
                />
              </div>
            </div>

            {renderTaxYearSelector()}

            {(Number.parseInt(taxYear) > 2025 || taxYear === "custom") && (
              <Alert variant="warning" className="bg-amber-500/10 border-amber-500/20 text-amber-600">
                <InfoIcon className="h-4 w-4" />
                <AlertDescription>
                  Tax brackets for years after 2025 are highly speculative projections. The Tax Cuts and Jobs Act
                  provisions expire after 2025, which may significantly change tax rates and brackets.
                </AlertDescription>
              </Alert>
            )}
          </>
        )}

        {country === "pakistan" && (
          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertDescription>
              Pakistan tax calculation is based on 2023 tax rates for salaried individuals. The tax brackets are:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Up to 600,000 PKR: 0%</li>
                <li>600,001 – 1,200,000 PKR: 5% of the amount exceeding 600,000 PKR</li>
                <li>1,200,001 – 2,400,000 PKR: 30,000 PKR + 10% of the amount exceeding 1,200,000 PKR</li>
                <li>2,400,001 – 3,600,000 PKR: 150,000 PKR + 15% of the amount exceeding 2,400,000 PKR</li>
                <li>3,600,001 – 6,000,000 PKR: 330,000 PKR + 20% of the amount exceeding 3,600,000 PKR</li>
                <li>6,000,001 – 12,000,000 PKR: 810,000 PKR + 25% of the amount exceeding 6,000,000 PKR</li>
                <li>Above 12,000,000 PKR: 2,310,000 PKR + 32.5% of the amount exceeding 12,000,000 PKR</li>
              </ul>
            </AlertDescription>
          </Alert>
        )}
      </div>

      {income !== "" && taxableIncome !== null && federalTax !== null && (
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Federal Income Tax</p>
                <p className="text-2xl font-bold">{formatCurrency(federalTax)}</p>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">Take-Home Income</p>
                <p className="text-2xl font-bold">{formatCurrency(takeHomeIncome || 0)}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Effective Tax Rate</p>
                <p className="text-xl font-bold">{effectiveRate?.toFixed(2)}%</p>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">Marginal Tax Rate</p>
                <p className="text-xl font-bold">{marginalRate?.toFixed(2)}%</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Tax Breakdown</p>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>
                    {country === "pakistan" && salaryFrequency === "monthly"
                      ? "Monthly Gross Income:"
                      : "Gross Income:"}
                  </span>
                  <span>{formatCurrency(Number(income))}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Deductions:</span>
                  <span>
                    -
                    {formatCurrency(
                      useStandardDeduction
                        ? getStandardDeductionForYear(taxYear === "custom" ? customYear : taxYear, filingStatus)
                        : Number(deductions),
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Taxable Income:</span>
                  <span>{formatCurrency(taxableIncome)}</span>
                </div>
                {bracketBreakdown.map((bracket, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{bracket.rate.toFixed(1)}% Bracket:</span>
                    <span>{formatCurrency(bracket.amount)}</span>
                  </div>
                ))}
                {Number(taxCredits) > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Tax Credits:</span>
                    <span>-{formatCurrency(Number(taxCredits))}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-medium pt-2 border-t">
                  <span>
                    {country === "pakistan" && salaryFrequency === "monthly"
                      ? "Monthly Income Tax:"
                      : "Total Federal Tax:"}
                  </span>
                  <span>{formatCurrency(federalTax)}</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm font-medium mb-2">Income Allocation</p>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Take-Home Pay ({(100 - (effectiveRate || 0)).toFixed(1)}%)</span>
                  <span>Federal Tax ({effectiveRate?.toFixed(1)}%)</span>
                </div>
                <div className="h-4 rounded-full overflow-hidden bg-muted flex">
                  <div className="bg-green-500 h-full" style={{ width: `${100 - (effectiveRate || 0)}%` }}></div>
                  <div className="bg-red-500 h-full" style={{ width: `${effectiveRate || 0}%` }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {state === "state" && (
        <div className="text-center py-8 text-muted-foreground">
          <p>State tax calculator coming soon!</p>
          <p className="text-sm mt-2">We're working on adding state-specific tax calculations.</p>
        </div>
      )}
    </div>
  )
}
