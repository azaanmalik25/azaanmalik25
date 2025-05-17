import type React from "react"
import { notFound } from "next/navigation"
import { allCalculators } from "@/lib/calculator-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Share2 } from "lucide-react"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// Import components with correct export types
import { AgeCalculator } from "@/components/calculators/age-calculator"
import { MortgageCalculator } from "@/components/calculators/mortgage-calculator"
import { BmiCalculator } from "@/components/calculators/bmi-calculator"
import { TipCalculator } from "@/components/calculators/tip-calculator"
import { PercentageCalculator } from "@/components/calculators/percentage-calculator"
import { UnitConverter } from "@/components/calculators/unit-converter"
import { ScientificCalculator } from "@/components/calculators/scientific-calculator"
import { LoanCalculator } from "@/components/calculators/loan-calculator"
import { InvestmentCalculator } from "@/components/calculators/investment-calculator"
import { DiscountCalculator } from "@/components/calculators/discount-calculator"
import { DateDifferenceCalculator } from "@/components/calculators/date-difference-calculator"
import { CalorieCalculator } from "@/components/calculators/calorie-calculator"
import { CurrencyConverter } from "@/components/calculators/currency-converter"
import { CompoundInterestCalculator } from "@/components/calculators/compound-interest-calculator"
import { AreaCalculator } from "@/components/calculators/area-calculator"
import { TimeCalculator } from "@/components/calculators/time-calculator"
import { FactorialCalculator } from "@/components/calculators/factorial-calculator"
import { TriangleCalculator } from "@/components/calculators/triangle-calculator"
import { TemperatureConverter } from "@/components/calculators/temperature-converter"
import { WorkingDaysCalculator } from "@/components/calculators/working-days-calculator"
import IncomeTaxCalculator from "@/components/calculators/income-tax-calculator"
import { BodyFatCalculator } from "@/components/calculators/body-fat-calculator"
import { PregnancyCalculator } from "@/components/calculators/pregnancy-calculator"
import { CarLoanCalculator } from "@/components/calculators/car-loan-calculator"
import { InflationCalculator } from "@/components/calculators/inflation-calculator"
import { CountdownTimer } from "@/components/calculators/countdown-timer"
import { FuelEconomyCalculator } from "@/components/calculators/fuel-economy-calculator"
import { GPACalculator } from "@/components/calculators/gpa-calculator"
import EcommerceExpenseCalculator from "@/components/calculators/ecommerce-expense-calculator"

export async function generateMetadata({ params }: { params: { id: string } }) {
  const calculator = allCalculators.find((calc) => calc.id === params.id)

  if (!calculator) {
    return {
      title: "Calculator Not Found",
    }
  }

  return {
    title: `${calculator.name} | Calculator Hub`,
    description: calculator.description,
  }
}

export default function CalculatorPage({ params }: { params: { id: string } }) {
  const calculator = allCalculators.find((calc) => calc.id === params.id)

  if (!calculator) {
    notFound()
  }

  // Map calculator ID to component
  const calculatorComponents: Record<string, React.ReactNode> = {
    age: <AgeCalculator />,
    mortgage: <MortgageCalculator />,
    bmi: <BmiCalculator />,
    tip: <TipCalculator />,
    percentage: <PercentageCalculator />,
    "unit-conversion": <UnitConverter />,
    scientific: <ScientificCalculator />,
    loan: <LoanCalculator />,
    investment: <InvestmentCalculator />,
    discount: <DiscountCalculator />,
    "date-difference": <DateDifferenceCalculator />,
    calorie: <CalorieCalculator />,
    currency: <CurrencyConverter />,
    "compound-interest": <CompoundInterestCalculator />,
    area: <AreaCalculator />,
    "time-calculator": <TimeCalculator />,
    factorial: <FactorialCalculator />,
    triangle: <TriangleCalculator />,
    temperature: <TemperatureConverter />,
    "working-days": <WorkingDaysCalculator />,
    tax: <IncomeTaxCalculator />,
    "body-fat": <BodyFatCalculator />,
    pregnancy: <PregnancyCalculator />,
    "car-loan": <CarLoanCalculator />,
    inflation: <InflationCalculator />,
    countdown: <CountdownTimer />,
    "fuel-economy": <FuelEconomyCalculator />,
    gpa: <GPACalculator />,
    "ecommerce-expense": <EcommerceExpenseCalculator />,
    // Add more calculator components as needed
  }

  // Render the appropriate calculator component based on the ID
  const renderCalculator = () => {
    return calculatorComponents[params.id] || <div>Calculator not implemented yet</div>
  }

  return (
    <div className="container py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/category/${calculator.categoryId}`}>{calculator.category}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/calculator/${calculator.id}`}>{calculator.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{calculator.name}</h1>
            <p className="text-muted-foreground mt-1">{calculator.description}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="bg-[#161645] p-8 rounded-lg flex items-center justify-center">
          <div className="text-indigo-400 transform scale-150">{calculator.icon}</div>
        </div>

        <Card>
          <CardContent className="p-6">
            {calculatorComponents[params.id] || (
              <div className="text-center py-12">
                <p className="text-muted-foreground">This calculator is coming soon!</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>How to use</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Enter your details in the calculator above to get accurate results. This calculator provides a simple
                way to {calculator.description.toLowerCase()}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Formula</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This calculator uses industry-standard formulas to ensure accurate results. All calculations are
                performed instantly in your browser.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Related Calculators</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {allCalculators
                  .filter((calc) => calc.categoryId === calculator.categoryId && calc.id !== calculator.id)
                  .slice(0, 3)
                  .map((relatedCalc) => (
                    <li key={relatedCalc.id}>
                      <Link href={`/calculator/${relatedCalc.id}`} className="text-sm text-primary hover:underline">
                        {relatedCalc.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
