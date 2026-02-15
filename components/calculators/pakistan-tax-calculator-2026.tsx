'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// Pakistan FBR Tax Brackets for different tax years
const TAX_BRACKETS = {
  '2025-2026': [
    { min: 0, max: 600000, base: 0, rate: 0 },
    { min: 600001, max: 1200000, base: 0, rate: 0.05 },
    { min: 1200001, max: 2400000, base: 30000, rate: 0.1 },
    { min: 2400001, max: 3600000, base: 150000, rate: 0.15 },
    { min: 3600001, max: 6000000, base: 330000, rate: 0.2 },
    { min: 6000001, max: 12000000, base: 810000, rate: 0.25 },
    { min: 12000001, max: Infinity, base: 2310000, rate: 0.32 },
  ],
  '2024-2025': [
    { min: 0, max: 600000, base: 0, rate: 0 },
    { min: 600001, max: 1200000, base: 0, rate: 0.05 },
    { min: 1200001, max: 2400000, base: 30000, rate: 0.1 },
    { min: 2400001, max: 3600000, base: 150000, rate: 0.15 },
    { min: 3600001, max: 6000000, base: 330000, rate: 0.2 },
    { min: 6000001, max: 12000000, base: 810000, rate: 0.25 },
    { min: 12000001, max: Infinity, base: 2310000, rate: 0.325 },
  ],
  '2023-2024': [
    { min: 0, max: 600000, base: 0, rate: 0 },
    { min: 600001, max: 1200000, base: 0, rate: 0.05 },
    { min: 1200001, max: 2400000, base: 30000, rate: 0.1 },
    { min: 2400001, max: 3600000, base: 150000, rate: 0.15 },
    { min: 3600001, max: 6000000, base: 330000, rate: 0.2 },
    { min: 6000001, max: 12000000, base: 810000, rate: 0.25 },
    { min: 12000001, max: Infinity, base: 2310000, rate: 0.325 },
  ],
  '2022-2023': [
    { min: 0, max: 600000, base: 0, rate: 0 },
    { min: 600001, max: 1200000, base: 0, rate: 0.05 },
    { min: 1200001, max: 2400000, base: 30000, rate: 0.1 },
    { min: 2400001, max: 3600000, base: 150000, rate: 0.15 },
    { min: 3600001, max: 6000000, base: 330000, rate: 0.2 },
    { min: 6000001, max: 12000000, base: 810000, rate: 0.25 },
    { min: 12000001, max: Infinity, base: 2310000, rate: 0.3 },
  ],
  '2021-2022': [
    { min: 0, max: 600000, base: 0, rate: 0 },
    { min: 600001, max: 1200000, base: 0, rate: 0.05 },
    { min: 1200001, max: 2400000, base: 30000, rate: 0.1 },
    { min: 2400001, max: 3600000, base: 150000, rate: 0.15 },
    { min: 3600001, max: 6000000, base: 330000, rate: 0.2 },
    { min: 6000001, max: 12000000, base: 810000, rate: 0.25 },
    { min: 12000001, max: Infinity, base: 2310000, rate: 0.3 },
  ],
  '2020-2021': [
    { min: 0, max: 600000, base: 0, rate: 0 },
    { min: 600001, max: 1200000, base: 0, rate: 0.05 },
    { min: 1200001, max: 2400000, base: 30000, rate: 0.1 },
    { min: 2400001, max: 3600000, base: 150000, rate: 0.15 },
    { min: 3600001, max: 6000000, base: 330000, rate: 0.2 },
    { min: 6000001, max: 12000000, base: 810000, rate: 0.25 },
    { min: 12000001, max: Infinity, base: 2310000, rate: 0.3 },
  ],
  '2019-2020': [
    { min: 0, max: 600000, base: 0, rate: 0 },
    { min: 600001, max: 1200000, base: 0, rate: 0.05 },
    { min: 1200001, max: 2400000, base: 30000, rate: 0.1 },
    { min: 2400001, max: 3600000, base: 150000, rate: 0.15 },
    { min: 3600001, max: 6000000, base: 330000, rate: 0.2 },
    { min: 6000001, max: 12000000, base: 810000, rate: 0.25 },
    { min: 12000001, max: Infinity, base: 2310000, rate: 0.3 },
  ],
  '2018-2019': [
    { min: 0, max: 600000, base: 0, rate: 0 },
    { min: 600001, max: 1200000, base: 0, rate: 0.05 },
    { min: 1200001, max: 2400000, base: 30000, rate: 0.1 },
    { min: 2400001, max: 3600000, base: 150000, rate: 0.15 },
    { min: 3600001, max: 6000000, base: 330000, rate: 0.2 },
    { min: 6000001, max: 12000000, base: 810000, rate: 0.25 },
    { min: 12000001, max: Infinity, base: 2310000, rate: 0.3 },
  ],
  '2017-2018': [
    { min: 0, max: 600000, base: 0, rate: 0 },
    { min: 600001, max: 1200000, base: 0, rate: 0.05 },
    { min: 1200001, max: 2400000, base: 30000, rate: 0.1 },
    { min: 2400001, max: 3600000, base: 150000, rate: 0.15 },
    { min: 3600001, max: 6000000, base: 330000, rate: 0.2 },
    { min: 6000001, max: 12000000, base: 810000, rate: 0.25 },
    { min: 12000001, max: Infinity, base: 2310000, rate: 0.3 },
  ],
  '2016-2017': [
    { min: 0, max: 600000, base: 0, rate: 0 },
    { min: 600001, max: 1200000, base: 0, rate: 0.05 },
    { min: 1200001, max: 2400000, base: 30000, rate: 0.1 },
    { min: 2400001, max: 3600000, base: 150000, rate: 0.15 },
    { min: 3600001, max: 6000000, base: 330000, rate: 0.2 },
    { min: 6000001, max: 12000000, base: 810000, rate: 0.25 },
    { min: 12000001, max: Infinity, base: 2310000, rate: 0.3 },
  ],
  '2015-2016': [
    { min: 0, max: 600000, base: 0, rate: 0 },
    { min: 600001, max: 1200000, base: 0, rate: 0.05 },
    { min: 1200001, max: 2400000, base: 30000, rate: 0.1 },
    { min: 2400001, max: 3600000, base: 150000, rate: 0.15 },
    { min: 3600001, max: 6000000, base: 330000, rate: 0.2 },
    { min: 6000001, max: 12000000, base: 810000, rate: 0.25 },
    { min: 12000001, max: Infinity, base: 2310000, rate: 0.3 },
  ],
  '2014-2015': [
    { min: 0, max: 600000, base: 0, rate: 0 },
    { min: 600001, max: 1200000, base: 0, rate: 0.05 },
    { min: 1200001, max: 2400000, base: 30000, rate: 0.1 },
    { min: 2400001, max: 3600000, base: 150000, rate: 0.15 },
    { min: 3600001, max: 6000000, base: 330000, rate: 0.2 },
    { min: 6000001, max: 12000000, base: 810000, rate: 0.25 },
    { min: 12000001, max: Infinity, base: 2310000, rate: 0.3 },
  ],
}

function calculateTax(monthlyIncome: number, brackets: typeof TAX_BRACKETS['2025-2026']): number {
  const annualIncome = monthlyIncome * 12
  
  for (const bracket of brackets) {
    if (annualIncome >= bracket.min && annualIncome <= bracket.max) {
      const taxableAmount = annualIncome - bracket.min
      const tax = bracket.base + taxableAmount * bracket.rate
      return Math.round(tax / 12) // Convert back to monthly
    }
  }
  
  return 0
}

export function PakistanTaxCalculator2026() {
  const [monthlyIncome, setMonthlyIncome] = useState(70000)
  const [selectedYear, setSelectedYear] = useState<keyof typeof TAX_BRACKETS>('2025-2026')

  const brackets = TAX_BRACKETS[selectedYear]
  
  const monthlyTax = useMemo(() => calculateTax(monthlyIncome, brackets), [monthlyIncome, brackets])
  const salaryAfterTax = monthlyIncome - monthlyTax
  const yearlyIncome = monthlyIncome * 12
  const yearlyTax = monthlyTax * 12
  const yearlyAfterTax = yearlyIncome - yearlyTax

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Tax Calculator Pakistan {selectedYear}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          This is latest tax calculator as per {selectedYear} budget presented by government of Pakistan.
        </p>
      </div>

      {/* Year Selection */}
      <div className="flex justify-center">
        <div className="w-full max-w-xs">
          <Label htmlFor="tax-year" className="text-sm font-semibold">
            Choose Year
          </Label>
          <Select value={selectedYear} onValueChange={(value) => setSelectedYear(value as keyof typeof TAX_BRACKETS)}>
            <SelectTrigger id="tax-year" className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025-2026">2025 to 2026</SelectItem>
              <SelectItem value="2024-2025">2024 to 2025</SelectItem>
              <SelectItem value="2023-2024">2023 to 2024</SelectItem>
              <SelectItem value="2022-2023">2022 to 2023</SelectItem>
              <SelectItem value="2021-2022">2021 to 2022</SelectItem>
              <SelectItem value="2020-2021">2020 to 2021</SelectItem>
              <SelectItem value="2019-2020">2019 to 2020</SelectItem>
              <SelectItem value="2018-2019">2018 to 2019</SelectItem>
              <SelectItem value="2017-2018">2017 to 2018</SelectItem>
              <SelectItem value="2016-2017">2016 to 2017</SelectItem>
              <SelectItem value="2015-2016">2015 to 2016</SelectItem>
              <SelectItem value="2014-2015">2014 to 2015</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Monthly Income Input */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
          <CardTitle className="text-xl">Monthly Income</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-500 font-semibold">Rs.</span>
            <Input
              type="number"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(Math.max(0, Number(e.target.value)))}
              className="pl-10 text-lg font-semibold h-12 border-2"
              placeholder="0"
            />
          </div>
        </CardContent>
      </Card>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Monthly Tax */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-red-50 dark:bg-red-900 pb-3">
            <CardTitle className="text-sm text-red-900 dark:text-red-100">Monthly Tax</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-red-600 dark:text-red-400">
              Rs. {monthlyTax.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        {/* Salary After Tax */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-green-50 dark:bg-green-900 pb-3">
            <CardTitle className="text-sm text-green-900 dark:text-green-100">Salary After Tax</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              Rs. {salaryAfterTax.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        {/* Tax Rate */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-blue-50 dark:bg-blue-900 pb-3">
            <CardTitle className="text-sm text-blue-900 dark:text-blue-100">Tax Rate</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {monthlyIncome > 0 ? ((monthlyTax / monthlyIncome) * 100).toFixed(2) : 0}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Annual Summary */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-t-lg">
          <CardTitle className="text-lg">Yearly Summary</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Yearly Income</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                Rs. {yearlyIncome.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Yearly Tax</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                Rs. {yearlyTax.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Yearly Income After Tax</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                Rs. {yearlyAfterTax.toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tax Brackets Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
          <CardTitle className="text-lg">Tax Brackets {selectedYear}</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-300 dark:border-gray-600">
                <th className="text-left py-3 px-2 font-semibold text-gray-700 dark:text-gray-300">Income Range</th>
                <th className="text-right py-3 px-2 font-semibold text-gray-700 dark:text-gray-300">Base Tax</th>
                <th className="text-right py-3 px-2 font-semibold text-gray-700 dark:text-gray-300">Tax Rate</th>
              </tr>
            </thead>
            <tbody>
              {brackets.map((bracket, idx) => (
                <tr 
                  key={idx} 
                  className={`border-b ${idx % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-700'}`}
                >
                  <td className="py-3 px-2 text-gray-700 dark:text-gray-300">
                    Rs. {bracket.min.toLocaleString()} - Rs. {bracket.max === Infinity ? 'Above' : bracket.max.toLocaleString()}
                  </td>
                  <td className="text-right py-3 px-2 text-gray-700 dark:text-gray-300">
                    Rs. {bracket.base.toLocaleString()}
                  </td>
                  <td className="text-right py-3 px-2 font-semibold text-blue-600 dark:text-blue-400">
                    {(bracket.rate * 100).toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
