'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { DollarSign, TrendingDown, Calculator } from 'lucide-react'

// Pakistan FBR Tax Brackets 2023-2026
const PAKISTAN_TAX_BRACKETS = {
  2026: [
    { rate: 0.0, min: 0, max: 700000 },
    { rate: 0.05, min: 700001, max: 1400000, base: 0, excess: 700000 },
    { rate: 0.1, min: 1400001, max: 2800000, base: 35000, excess: 1400000 },
    { rate: 0.15, min: 2800001, max: 4200000, base: 175000, excess: 2800000 },
    { rate: 0.2, min: 4200001, max: 7000000, base: 385000, excess: 4200000 },
    { rate: 0.25, min: 7000001, max: 14000000, base: 945000, excess: 7000000 },
    { rate: 0.32, min: 14000001, max: Number.POSITIVE_INFINITY, base: 2695000, excess: 14000000 },
  ],
  2025: [
    { rate: 0.0, min: 0, max: 650000 },
    { rate: 0.05, min: 650001, max: 1300000, base: 0, excess: 650000 },
    { rate: 0.1, min: 1300001, max: 2600000, base: 32500, excess: 1300000 },
    { rate: 0.15, min: 2600001, max: 3900000, base: 162500, excess: 2600000 },
    { rate: 0.2, min: 3900001, max: 6500000, base: 357500, excess: 3900000 },
    { rate: 0.25, min: 6500001, max: 13000000, base: 877500, excess: 6500000 },
    { rate: 0.32, min: 13000001, max: Number.POSITIVE_INFINITY, base: 2502500, excess: 13000000 },
  ],
  2024: [
    { rate: 0.0, min: 0, max: 600000 },
    { rate: 0.05, min: 600001, max: 1200000, base: 0, excess: 600000 },
    { rate: 0.1, min: 1200001, max: 2400000, base: 30000, excess: 1200000 },
    { rate: 0.15, min: 2400001, max: 3600000, base: 150000, excess: 2400000 },
    { rate: 0.2, min: 3600001, max: 6000000, base: 330000, excess: 3600000 },
    { rate: 0.25, min: 6000001, max: 12000000, base: 810000, excess: 6000000 },
    { rate: 0.32, min: 12000001, max: Number.POSITIVE_INFINITY, base: 2310000, excess: 12000000 },
  ],
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

export function PakistanIncomeTaxCalculator() {
  const [salary, setSalary] = useState<number>(100000)
  const [salaryFrequency, setSalaryFrequency] = useState<'monthly' | 'annual'>('monthly')
  const [taxYear, setTaxYear] = useState<'2026' | '2025' | '2024' | '2023'>('2026')
  const [allowances, setAllowances] = useState<number>(0)
  const [bonus, setBonus] = useState<number>(0)

  const [annualSalary, setAnnualSalary] = useState<number>(0)
  const [totalIncome, setTotalIncome] = useState<number>(0)
  const [incomeTax, setIncomeTax] = useState<number>(0)
  const [monthlyTax, setMonthlyTax] = useState<number>(0)
  const [netIncome, setNetIncome] = useState<number>(0)
  const [effectiveRate, setEffectiveRate] = useState<number>(0)
  const [marginalRate, setMarginalRate] = useState<number>(0)
  const [bracketBreakdown, setBracketBreakdown] = useState<Array<{ rate: number; amount: number }>([])

  // Calculate tax
  useEffect(() => {
    const baseAnnualSalary = salaryFrequency === 'monthly' ? salary * 12 : salary
    const annualAllowances = salaryFrequency === 'monthly' ? allowances * 12 : allowances
    const annualBonus = salaryFrequency === 'monthly' ? bonus * 12 : bonus
    const total = baseAnnualSalary + annualAllowances + annualBonus

    setAnnualSalary(baseAnnualSalary)
    setTotalIncome(total)

    // Get brackets for selected year
    const brackets = PAKISTAN_TAX_BRACKETS[taxYear]
    let tax = 0

    for (const bracket of brackets) {
      if (total > bracket.min) {
        if (bracket.rate === 0) {
          continue
        } else if ('base' in bracket && 'excess' in bracket) {
          if (total <= bracket.max) {
            tax = bracket.base + bracket.rate * (total - bracket.excess)
            break
          }
        }
      }
    }

    setIncomeTax(tax)
    setMonthlyTax(tax / 12)
    setNetIncome(salaryFrequency === 'monthly' ? salary - tax / 12 : salary - tax)
    setEffectiveRate(total > 0 ? (tax / total) * 100 : 0)

    // Find marginal rate
    for (let i = brackets.length - 1; i >= 0; i--) {
      if (total > brackets[i].min) {
        setMarginalRate(brackets[i].rate * 100)
        break
      }
    }

    // Build breakdown
    const breakdown: Array<{ rate: number; amount: number }> = []
    for (const bracket of brackets) {
      if (total > bracket.min && bracket.rate > 0) {
        let amount = 0
        if ('base' in bracket && 'excess' in bracket) {
          if (total <= bracket.max) {
            amount = bracket.rate * (total - bracket.excess)
          } else {
            amount = bracket.rate * (bracket.max - bracket.excess)
          }
        }
        if (amount > 0) {
          breakdown.push({ rate: bracket.rate * 100, amount })
        }
      }
    }
    setBracketBreakdown(breakdown)
  }, [salary, salaryFrequency, allowances, bonus, taxYear])

  const formatPKR = (amount: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-8 px-6 rounded-lg mb-6">
        <h1 className="text-3xl font-bold mb-2">Pakistan Income Tax Calculator</h1>
        <p className="text-blue-100 text-sm">
          Calculate your income tax obligations according to FBR 2026 tax brackets. This calculator helps you understand your tax liability and take-home income.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Form Section */}
        <div className="lg:col-span-3 space-y-6">
          {/* Salary Information Section */}
          <Card className="border-2">
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-blue-900">Salary Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <Label className="text-sm font-semibold">Basic Salary / Monthly Income</Label>
                <Input
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(Number(e.target.value))}
                  placeholder="Enter amount"
                  className="mt-2 text-lg font-semibold"
                />
              </div>

              <div>
                <Label className="text-sm font-semibold">Salary Frequency</Label>
                <RadioGroup value={salaryFrequency} onValueChange={(v) => setSalaryFrequency(v as 'monthly' | 'annual')}>
                  <div className="flex gap-4 mt-2">
                    <div className="flex items-center gap-2 p-3 border rounded hover:bg-gray-50">
                      <RadioGroupItem value="monthly" id="monthly" />
                      <Label htmlFor="monthly" className="cursor-pointer font-normal">Monthly</Label>
                    </div>
                    <div className="flex items-center gap-2 p-3 border rounded hover:bg-gray-50">
                      <RadioGroupItem value="annual" id="annual" />
                      <Label htmlFor="annual" className="cursor-pointer font-normal">Annual</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-semibold">Allowances ({salaryFrequency})</Label>
                  <Input
                    type="number"
                    value={allowances}
                    onChange={(e) => setAllowances(Number(e.target.value))}
                    placeholder="0"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label className="text-sm font-semibold">Bonus ({salaryFrequency})</Label>
                  <Input
                    type="number"
                    value={bonus}
                    onChange={(e) => setBonus(Number(e.target.value))}
                    placeholder="0"
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-semibold">Tax Year (FBR)</Label>
                <Select value={taxYear} onValueChange={(v) => setTaxYear(v as '2026' | '2025' | '2024' | '2023')}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2026">2026 (Latest)</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="border-2">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-green-900">Tax Calculation Results</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total {salaryFrequency === 'monthly' ? 'Monthly' : 'Annual'} Income</p>
                  <p className="text-2xl font-bold text-gray-900">{formatPKR(salaryFrequency === 'monthly' ? salary + allowances + bonus : totalIncome)}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Annual Income</p>
                  <p className="text-2xl font-bold text-gray-900">{formatPKR(totalIncome)}</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="text-sm text-red-600">Income Tax (Annual)</p>
                  <p className="text-2xl font-bold text-red-900">{formatPKR(incomeTax)}</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="text-sm text-red-600">Income Tax ({salaryFrequency === 'monthly' ? 'Monthly' : 'Annual'})</p>
                  <p className="text-2xl font-bold text-red-900">{formatPKR(salaryFrequency === 'monthly' ? monthlyTax : incomeTax)}</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-600">Net Income ({salaryFrequency === 'monthly' ? 'Monthly' : 'Annual'})</p>
                  <p className="text-2xl font-bold text-blue-900">{formatPKR(netIncome)}</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-600">Effective Tax Rate</p>
                  <p className="text-2xl font-bold text-purple-900">{effectiveRate.toFixed(2)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tax Bracket Information */}
          <Card className="border-2">
            <CardHeader className="bg-yellow-50">
              <CardTitle className="text-yellow-900">Tax Bracket Breakdown (FBR {taxYear})</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-3">Tax Rate</th>
                      <th className="text-right py-2 px-3">Tax Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bracketBreakdown.length > 0 ? (
                      bracketBreakdown.map((item, idx) => (
                        <tr key={idx} className="border-b hover:bg-gray-50">
                          <td className="py-2 px-3">{item.rate}%</td>
                          <td className="text-right py-2 px-3 font-semibold">{formatPKR(item.amount)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={2} className="py-4 text-center text-gray-500">
                          No tax applicable (income within tax-free threshold)
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {incomeTax > 0 && (
                <div className="mt-4 p-4 bg-blue-50 rounded">
                  <p className="text-sm text-gray-600">Marginal Tax Rate: <span className="font-bold text-blue-900">{marginalRate.toFixed(1)}%</span></p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4 border-2 bg-blue-50">
            <CardHeader className="bg-blue-100">
              <CardTitle className="text-blue-900 text-lg">Quick Summary</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="p-3 bg-white rounded border-l-4 border-blue-500">
                <p className="text-xs text-gray-600">Monthly Income</p>
                <p className="text-lg font-bold text-gray-900">{formatPKR(salaryFrequency === 'monthly' ? salary + allowances + bonus : (salary + allowances + bonus) / 12)}</p>
              </div>
              <div className="p-3 bg-white rounded border-l-4 border-red-500">
                <p className="text-xs text-gray-600">Monthly Tax</p>
                <p className="text-lg font-bold text-gray-900">{formatPKR(monthlyTax)}</p>
              </div>
              <div className="p-3 bg-white rounded border-l-4 border-green-500">
                <p className="text-xs text-gray-600">Monthly Net Income</p>
                <p className="text-lg font-bold text-gray-900">{formatPKR(salaryFrequency === 'monthly' ? netIncome : netIncome / 12)}</p>
              </div>
              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-900 mb-3">FBR Tax Brackets {taxYear}</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-2 bg-white rounded">
                    <span>0-700K</span>
                    <span className="font-semibold">0%</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white rounded">
                    <span>700K-1.4M</span>
                    <span className="font-semibold">5%</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white rounded">
                    <span>1.4M-2.8M</span>
                    <span className="font-semibold">10%</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white rounded">
                    <span>2.8M+</span>
                    <span className="font-semibold">15-32%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
