"\"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import { ShoppingBag, TrendingUp, PieChartIcon, BarChartIcon } from "lucide-react"

interface ExpenseItem {
  name: string
  amount: number
  category: string
}

interface Revenue {
  unitPrice: number
  quantity: number
  platformFee: number
  shippingCharged: number
}

export function EcommerceExpenseCalculator() {
  // Default expenses in PKR
  const defaultExpenses: ExpenseItem[] = [
    { name: "Product Cost", amount: 1000, category: "Product" },
    { name: "Packaging", amount: 200, category: "Product" },
    { name: "Shipping Cost", amount: 300, category: "Logistics" },
    { name: "Platform Fee", amount: 500, category: "Sales" },
    { name: "Marketing", amount: 1000, category: "Marketing" },
    { name: "Return Handling", amount: 200, category: "Logistics" },
  ]

  const [expenses, setExpenses] = useState<ExpenseItem[]>(defaultExpenses)
  const [newExpense, setNewExpense] = useState<ExpenseItem>({ name: "", amount: 0, category: "Product" })
  const [revenue, setRevenue] = useState<Revenue>({
    unitPrice: 3000,
    quantity: 10,
    platformFee: 5,
    shippingCharged: 250,
  })
  const [activeTab, setActiveTab] = useState("expenses")
  const [chartType, setChartType] = useState<"pie" | "bar">("pie")

  // Calculate totals
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const totalRevenue = revenue.unitPrice * revenue.quantity + revenue.shippingCharged * revenue.quantity
  const platformFeeAmount = (revenue.unitPrice * revenue.quantity * revenue.platformFee) / 100
  const netRevenue = totalRevenue - platformFeeAmount
  const profit = netRevenue - totalExpenses
  const profitMargin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0
  const breakEvenUnits =
    totalExpenses > 0
      ? Math.ceil(totalExpenses / (revenue.unitPrice - (revenue.unitPrice * revenue.platformFee) / 100))
      : 0

  // Expense by category
  const expensesByCategory = expenses.reduce(
    (acc, expense) => {
      if (!acc[expense.category]) {
        acc[expense.category] = 0
      }
      acc[expense.category] += expense.amount
      return acc
    },
    {} as Record<string, number>,
  )

  const categoryColors = {
    Product: "#8884d8",
    Logistics: "#82ca9d",
    Marketing: "#ffc658",
    Sales: "#ff8042",
    Other: "#a4de6c",
  }

  const pieChartData = Object.entries(expensesByCategory).map(([name, value]) => ({
    name,
    value,
    color: categoryColors[name as keyof typeof categoryColors] || "#8884d8",
  }))

  const barChartData = [
    { name: "Total Revenue", amount: totalRevenue },
    { name: "Platform Fee", amount: platformFeeAmount },
    { name: "Total Expenses", amount: totalExpenses },
    { name: "Profit", amount: profit },
  ]

  const handleAddExpense = () => {
    if (newExpense.name && newExpense.amount > 0) {
      setExpenses([...expenses, newExpense])
      setNewExpense({ name: "", amount: 0, category: "Product" })
    }
  }

  const handleRemoveExpense = (index: number) => {
    const updatedExpenses = [...expenses]
    updatedExpenses.splice(index, 1)
    setExpenses(updatedExpenses)
  }

  const formatCurrency = (amount: number) => {
    return `Rs. ${amount.toLocaleString("en-PK")}`
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">E-commerce Expense Calculator (PKR)</CardTitle>
        <CardDescription>
          Calculate your e-commerce business expenses, revenue, and profit in Pakistani Rupees
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="expenses">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Expenses
            </TabsTrigger>
            <TabsTrigger value="revenue">
              <TrendingUp className="mr-2 h-4 w-4" />
              Revenue
            </TabsTrigger>
            <TabsTrigger value="summary">
              {chartType === "pie" ? (
                <PieChartIcon className="mr-2 h-4 w-4" />
              ) : (
                <BarChartIcon className="mr-2 h-4 w-4" />
              )}
              Summary
            </TabsTrigger>
          </TabsList>

          <TabsContent value="expenses" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="expense-name">Expense Name</Label>
                <Input
                  id="expense-name"
                  value={newExpense.name}
                  onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
                  placeholder="e.g., Packaging"
                />
              </div>
              <div>
                <Label htmlFor="expense-amount">Amount (PKR)</Label>
                <Input
                  id="expense-amount"
                  type="number"
                  value={newExpense.amount || ""}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: Number(e.target.value) })}
                  placeholder="1000"
                />
              </div>
              <div>
                <Label htmlFor="expense-category">Category</Label>
                <Select
                  value={newExpense.category}
                  onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}
                >
                  <SelectTrigger id="expense-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Product">Product</SelectItem>
                    <SelectItem value="Logistics">Logistics</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleAddExpense}>Add Expense</Button>

            <div className="border rounded-md p-4 mt-4">
              <h3 className="text-lg font-medium mb-2">Expense List</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Amount (PKR)</TableHead>
                    <TableHead className="w-[100px]">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.map((expense, index) => (
                    <TableRow key={index}>
                      <TableCell>{expense.name}</TableCell>
                      <TableCell>{expense.category}</TableCell>
                      <TableCell>{formatCurrency(expense.amount)}</TableCell>
                      <TableCell>
                        <Button variant="destructive" size="sm" onClick={() => handleRemoveExpense(index)}>
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 text-right">
                <p className="text-lg font-bold">Total Expenses: {formatCurrency(totalExpenses)}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="unit-price">Unit Price (PKR)</Label>
                  <Input
                    id="unit-price"
                    type="number"
                    value={revenue.unitPrice}
                    onChange={(e) => setRevenue({ ...revenue, unitPrice: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="quantity">Quantity (Units)</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={revenue.quantity}
                    onChange={(e) => setRevenue({ ...revenue, quantity: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="platform-fee">Platform Fee (%)</Label>
                  <div className="flex items-center space-x-4">
                    <Slider
                      id="platform-fee"
                      min={0}
                      max={30}
                      step={0.5}
                      value={[revenue.platformFee]}
                      onValueChange={(value) => setRevenue({ ...revenue, platformFee: value[0] })}
                      className="flex-1"
                    />
                    <span className="w-12 text-right">{revenue.platformFee}%</span>
                  </div>
                </div>
                <div>
                  <Label htmlFor="shipping-charged">Shipping Charged (PKR per unit)</Label>
                  <Input
                    id="shipping-charged"
                    type="number"
                    value={revenue.shippingCharged}
                    onChange={(e) => setRevenue({ ...revenue, shippingCharged: Number(e.target.value) })}
                  />
                </div>
              </div>
            </div>

            <div className="border rounded-md p-4 mt-4">
              <h3 className="text-lg font-medium mb-2">Revenue Breakdown</h3>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Product Revenue</TableCell>
                    <TableCell>{formatCurrency(revenue.unitPrice * revenue.quantity)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Shipping Revenue</TableCell>
                    <TableCell>{formatCurrency(revenue.shippingCharged * revenue.quantity)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Platform Fee</TableCell>
                    <TableCell>{formatCurrency(platformFeeAmount)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Net Revenue</TableCell>
                    <TableCell className="font-bold">{formatCurrency(netRevenue)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="summary" className="space-y-4 pt-4">
            <div className="flex justify-end mb-4">
              <Select value={chartType} onValueChange={(value) => setChartType(value as "pie" | "bar")}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Chart Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pie">Pie Chart</SelectItem>
                  <SelectItem value="bar">Bar Chart</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-4">Financial Summary</h3>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Total Revenue</TableCell>
                      <TableCell>{formatCurrency(totalRevenue)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Total Expenses</TableCell>
                      <TableCell>{formatCurrency(totalExpenses)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Profit</TableCell>
                      <TableCell className={profit >= 0 ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                        {formatCurrency(profit)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Profit Margin</TableCell>
                      <TableCell className={profitMargin >= 0 ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                        {profitMargin.toFixed(2)}%
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Break-even Units</TableCell>
                      <TableCell>{breakEvenUnits} units</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-4">
                  {chartType === "pie" ? "Expenses by Category" : "Financial Overview"}
                </h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    {chartType === "pie" ? (
                      <PieChart>
                        <Pie
                          data={pieChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                        <Legend />
                      </PieChart>
                    ) : (
                      <BarChart
                        data={barChartData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                        <Bar dataKey="amount" fill="#8884d8" />
                      </BarChart>
                    )}
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="border rounded-md p-4 mt-4">
              <h3 className="text-lg font-medium mb-2">Recommendations</h3>
              <ul className="list-disc pl-5 space-y-2">
                {profit < 0 && (
                  <li className="text-red-600">
                    Your business is currently operating at a loss. Consider increasing your prices or reducing
                    expenses.
                  </li>
                )}
                {profitMargin < 15 && profitMargin >= 0 && (
                  <li className="text-yellow-600">
                    Your profit margin is below 15%. This is relatively low for e-commerce. Look for ways to increase
                    efficiency.
                  </li>
                )}
                {profitMargin >= 15 && (
                  <li className="text-green-600">
                    Your profit margin is healthy at {profitMargin.toFixed(2)}%. Continue monitoring expenses to
                    maintain profitability.
                  </li>
                )}
                {revenue.platformFee > 10 && (
                  <li>
                    Platform fees are relatively high at {revenue.platformFee}%. Consider exploring alternative
                    platforms or negotiating better rates.
                  </li>
                )}
                {Object.entries(expensesByCategory).map(([category, amount]) => {
                  const percentage = (amount / totalExpenses) * 100
                  if (percentage > 40) {
                    return (
                      <li key={category}>
                        {category} expenses account for {percentage.toFixed(2)}% of your total expenses. Look for ways
                        to optimize this category.
                      </li>
                    )
                  }
                  return null
                })}
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default EcommerceExpenseCalculator
