'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type TaxYear = '2025-2026' | '2024-2025' | '2023-2024' | '2022-2023' | '2021-2022' | '2020-2021' | '2019-2020' | '2018-2019' | '2017-2018' | '2016-2017' | '2015-2016' | '2014-2015'

// Tax brackets for Pakistan FBR by tax year
const TAX_BRACKETS: Record<TaxYear, Array<{ min: number; max: number; baseAmount: number; rate: number }>> = {
  '2025-2026': [
    { min: 0, max: 600000, baseAmount: 0, rate: 0.0 },
    { min: 600001, max: 1200000, baseAmount: 0, rate: 0.02 },
    { min: 1200001, max: 2400000, baseAmount: 12000, rate: 0.04 },
    { min: 2400001, max: 3600000, baseAmount: 60000, rate: 0.06 },
    { min: 3600001, max: 6000000, baseAmount: 132000, rate: 0.08 },
    { min: 6000001, max: 12000000, baseAmount: 324000, rate: 0.10 },
    { min: 12000001, max: Infinity, baseAmount: 924000, rate: 0.15 },
  ],
  '2024-2025': [
    { min: 0, max: 600000, baseAmount: 0, rate: 0.0 },
    { min: 600001, max: 1200000, baseAmount: 0, rate: 0.02 },
    { min: 1200001, max: 2400000, baseAmount: 12000, rate: 0.04 },
    { min: 2400001, max: 3600000, baseAmount: 60000, rate: 0.06 },
    { min: 3600001, max: 6000000, baseAmount: 132000, rate: 0.08 },
    { min: 6000001, max: 12000000, baseAmount: 324000, rate: 0.10 },
    { min: 12000001, max: Infinity, baseAmount: 924000, rate: 0.15 },
  ],
  '2023-2024': [
    { min: 0, max: 600000, baseAmount: 0, rate: 0.0 },
    { min: 600001, max: 1200000, baseAmount: 0, rate: 0.02 },
    { min: 1200001, max: 2400000, baseAmount: 12000, rate: 0.04 },
    { min: 2400001, max: 3600000, baseAmount: 60000, rate: 0.06 },
    { min: 3600001, max: 6000000, baseAmount: 132000, rate: 0.08 },
    { min: 6000001, max: 12000000, baseAmount: 324000, rate: 0.10 },
    { min: 12000001, max: Infinity, baseAmount: 924000, rate: 0.15 },
  ],
  '2022-2023': [
    { min: 0, max: 500000, baseAmount: 0, rate: 0.0 },
    { min: 500001, max: 1000000, baseAmount: 0, rate: 0.02 },
    { min: 1000001, max: 2000000, baseAmount: 10000, rate: 0.04 },
    { min: 2000001, max: 3000000, baseAmount: 50000, rate: 0.05 },
    { min: 3000001, max: 5000000, baseAmount: 100000, rate: 0.075 },
    { min: 5000001, max: Infinity, baseAmount: 250000, rate: 0.10 },
  ],
  '2021-2022': [
    { min: 0, max: 500000, baseAmount: 0, rate: 0.0 },
    { min: 500001, max: 1000000, baseAmount: 0, rate: 0.02 },
    { min: 1000001, max: 2000000, baseAmount: 10000, rate: 0.04 },
    { min: 2000001, max: 3000000, baseAmount: 50000, rate: 0.05 },
    { min: 3000001, max: 5000000, baseAmount: 100000, rate: 0.075 },
    { min: 5000001, max: Infinity, baseAmount: 250000, rate: 0.10 },
  ],
  '2020-2021': [
    { min: 0, max: 400000, baseAmount: 0, rate: 0.0 },
    { min: 400001, max: 800000, baseAmount: 0, rate: 0.025 },
    { min: 800001, max: 1600000, baseAmount: 10000, rate: 0.05 },
    { min: 1600001, max: 2400000, baseAmount: 50000, rate: 0.075 },
    { min: 2400001, max: 4000000, baseAmount: 110000, rate: 0.10 },
    { min: 4000001, max: Infinity, baseAmount: 270000, rate: 0.15 },
  ],
  '2019-2020': [
    { min: 0, max: 400000, baseAmount: 0, rate: 0.0 },
    { min: 400001, max: 800000, baseAmount: 0, rate: 0.025 },
    { min: 800001, max: 1600000, baseAmount: 10000, rate: 0.05 },
    { min: 1600001, max: 2400000, baseAmount: 50000, rate: 0.075 },
    { min: 2400001, max: 4000000, baseAmount: 110000, rate: 0.10 },
    { min: 4000001, max: Infinity, baseAmount: 270000, rate: 0.15 },
  ],
  '2018-2019': [
    { min: 0, max: 400000, baseAmount: 0, rate: 0.0 },
    { min: 400001, max: 800000, baseAmount: 0, rate: 0.025 },
    { min: 800001, max: 1600000, baseAmount: 10000, rate: 0.05 },
    { min: 1600001, max: 2400000, baseAmount: 50000, rate: 0.075 },
    { min: 2400001, max: 4000000, baseAmount: 110000, rate: 0.10 },
    { min: 4000001, max: Infinity, baseAmount: 270000, rate: 0.15 },
  ],
  '2017-2018': [
    { min: 0, max: 400000, baseAmount: 0, rate: 0.0 },
    { min: 400001, max: 800000, baseAmount: 0, rate: 0.025 },
    { min: 800001, max: 1600000, baseAmount: 10000, rate: 0.05 },
    { min: 1600001, max: 2400000, baseAmount: 50000, rate: 0.075 },
    { min: 2400001, max: 4000000, baseAmount: 110000, rate: 0.10 },
    { min: 4000001, max: Infinity, baseAmount: 270000, rate: 0.15 },
  ],
  '2016-2017': [
    { min: 0, max: 400000, baseAmount: 0, rate: 0.0 },
    { min: 400001, max: 800000, baseAmount: 0, rate: 0.025 },
    { min: 800001, max: 1600000, baseAmount: 10000, rate: 0.05 },
    { min: 1600001, max: 2400000, baseAmount: 50000, rate: 0.075 },
    { min: 2400001, max: 4000000, baseAmount: 110000, rate: 0.10 },
    { min: 4000001, max: Infinity, baseAmount: 270000, rate: 0.15 },
  ],
  '2015-2016': [
    { min: 0, max: 400000, baseAmount: 0, rate: 0.0 },
    { min: 400001, max: 800000, baseAmount: 0, rate: 0.025 },
    { min: 800001, max: 1600000, baseAmount: 10000, rate: 0.05 },
    { min: 1600001, max: 2400000, baseAmount: 50000, rate: 0.075 },
    { min: 2400001, max: 4000000, baseAmount: 110000, rate: 0.10 },
    { min: 4000001, max: Infinity, baseAmount: 270000, rate: 0.15 },
  ],
  '2014-2015': [
    { min: 0, max: 400000, baseAmount: 0, rate: 0.0 },
    { min: 400001, max: 800000, baseAmount: 0, rate: 0.025 },
    { min: 800001, max: 1600000, baseAmount: 10000, rate: 0.05 },
    { min: 1600001, max: 2400000, baseAmount: 50000, rate: 0.075 },
    { min: 2400001, max: 4000000, baseAmount: 110000, rate: 0.10 },
    { min: 4000001, max: Infinity, baseAmount: 270000, rate: 0.15 },
  ],
}

function calculateTax(income: number, brackets: typeof TAX_BRACKETS['2025-2026']): number {
  const bracket = brackets.find(b => income >= b.min && income <= b.max)
  if (!bracket) return 0

  const excessIncome = income - bracket.min
  return bracket.baseAmount + excessIncome * bracket.rate
}

export function PakistanFBRTaxCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState<number>(70000)
  const [selectedYear, setSelectedYear] = useState<TaxYear>('2025-2026')

  const brackets = TAX_BRACKETS[selectedYear]

  const monthlyTax = useMemo(() => {
    return calculateTax(monthlyIncome, brackets)
  }, [monthlyIncome, brackets])

  const salaryAfterTaxMonthly = monthlyIncome - monthlyTax
  const yearlyIncome = monthlyIncome * 12
  const yearlyTax = monthlyTax * 12
  const yearlyAfterTax = salaryAfterTaxMonthly * 12

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Tax Calculator Pakistan 2025-2026
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          This is latest tax calculator as per 2025-2026 budget presented by government of Pakistan.
        </p>
      </div>

      <Card className="mb-6 border-2">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label htmlFor="year" className="text-sm font-semibold mb-2 block">
                Choose Year
              </Label>
              <Select value={selectedYear} onValueChange={(value) => setSelectedYear(value as TaxYear)}>
                <SelectTrigger id="year" className="w-full">
                  <SelectValue placeholder="Select tax year" />
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

            <div>
              <Label htmlFor="income" className="text-sm font-semibold mb-2 block">
                Monthly Income
              </Label>
              <Input
                id="income"
                type="number"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Number(e.target.value) || 0)}
                className="w-full text-lg font-semibold"
                placeholder="0"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border">
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">Monthly Tax</p>
          <p className="text-3xl font-bold text-red-600">{monthlyTax.toLocaleString('en-PK', { maximumFractionDigits: 0 })}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border">
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">Salary After Tax</p>
          <p className="text-3xl font-bold text-green-600">{salaryAfterTaxMonthly.toLocaleString('en-PK', { maximumFractionDigits: 0 })}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border">
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">Effective Tax Rate</p>
          <p className="text-3xl font-bold text-blue-600">
            {monthlyIncome > 0 ? ((monthlyTax / monthlyIncome) * 100).toFixed(2) : '0'}%
          </p>
        </div>
      </div>

      <Card className="border-2">
        <CardHeader className="bg-gray-100 dark:bg-slate-800 border-b">
          <CardTitle>Annual Summary</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Yearly Income</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {yearlyIncome.toLocaleString('en-PK', { maximumFractionDigits: 0 })}
              </p>
            </div>

            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Yearly Tax</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {yearlyTax.toLocaleString('en-PK', { maximumFractionDigits: 0 })}
              </p>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Yearly Income After Tax</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {yearlyAfterTax.toLocaleString('en-PK', { maximumFractionDigits: 0 })}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6 border-2">
        <CardHeader className="bg-gray-100 dark:bg-slate-800 border-b">
          <CardTitle>Tax Brackets for {selectedYear}</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 font-semibold">Income Range</th>
                  <th className="text-left py-2 font-semibold">Base Amount</th>
                  <th className="text-left py-2 font-semibold">Tax Rate</th>
                </tr>
              </thead>
              <tbody>
                {brackets.map((bracket, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50 dark:hover:bg-slate-800">
                    <td className="py-3">
                      {bracket.min.toLocaleString('en-PK')} - {bracket.max === Infinity ? '∞' : bracket.max.toLocaleString('en-PK')}
                    </td>
                    <td className="py-3">
                      {bracket.baseAmount.toLocaleString('en-PK')}
                    </td>
                    <td className="py-3 font-semibold">
                      {(bracket.rate * 100).toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
