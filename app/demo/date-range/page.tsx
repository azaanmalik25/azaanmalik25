import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DateDifferenceCalculator } from "@/components/calculators/date-difference-calculator"

export default function DateRangeDemo() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Improved Date Range Picker</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Our improved date range picker makes it easy to select date ranges with intuitive controls and preset options.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Date Difference Calculator</CardTitle>
            <CardDescription>
              Calculate the difference between two dates with our improved date range picker.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DateDifferenceCalculator />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Features</CardTitle>
            <CardDescription>What makes our date range picker better</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 list-disc pl-5">
              <li>Intuitive calendar interface with range highlighting</li>
              <li>Preset date ranges for quick selection (Today, Yesterday, Last 7 days, etc.)</li>
              <li>Clear visual feedback when selecting start and end dates</li>
              <li>Mobile-friendly design that works on all screen sizes</li>
              <li>Easy month/year navigation</li>
              <li>Clear button to reset selection</li>
              <li>Apply button to confirm selection</li>
              <li>Compact display of selected date range</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
