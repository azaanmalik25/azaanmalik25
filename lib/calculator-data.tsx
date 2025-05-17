import type React from "react"
import {
  CalculatorIcon,
  Calendar,
  DollarSign,
  Heart,
  Percent,
  Clock,
  Scale,
  Ruler,
  Thermometer,
  BarChart,
  Home,
  Car,
  Lightbulb,
  Dumbbell,
  Utensils,
  Baby,
  Briefcase,
  Landmark,
  Coins,
  CreditCard,
  PiggyBank,
  TrendingUp,
  Gauge,
  Hourglass,
  CalendarDays,
  Divide,
  X,
  Square,
  SquareIcon as SquareRoot,
  Sigma,
  Pi,
  Hash,
  ShoppingBag,
} from "lucide-react"

export interface Calculator {
  id: string
  name: string
  description: string
  category: string
  categoryId: string
  icon: React.ReactNode
  isPopular?: boolean
  isNew?: boolean
}

export interface Category {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  calculators: Calculator[]
}

// Finance Calculators
const financeCalculators: Calculator[] = [
  {
    id: "mortgage",
    name: "Mortgage Calculator",
    description: "Calculate monthly mortgage payments, interest, and amortization schedule.",
    category: "Finance",
    categoryId: "finance",
    icon: <Home className="h-8 w-8 text-primary" />,
    isPopular: true,
  },
  {
    id: "loan",
    name: "Loan Calculator",
    description: "Calculate loan payments, interest, and total cost of borrowing.",
    category: "Finance",
    categoryId: "finance",
    icon: <DollarSign className="h-8 w-8 text-primary" />,
    isPopular: true,
  },
  {
    id: "investment",
    name: "Investment Calculator",
    description: "Calculate investment growth, returns, and compound interest.",
    category: "Finance",
    categoryId: "finance",
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
  },
  {
    id: "compound-interest",
    name: "Compound Interest",
    description: "Calculate how your investments grow over time with compound interest.",
    category: "Finance",
    categoryId: "finance",
    icon: <PiggyBank className="h-8 w-8 text-primary" />,
  },
  {
    id: "retirement",
    name: "Retirement Calculator",
    description: "Plan your retirement savings and estimate future income needs.",
    category: "Finance",
    categoryId: "finance",
    icon: <Briefcase className="h-8 w-8 text-primary" />,
  },
  {
    id: "tax",
    name: "Income Tax Calculator",
    description: "Estimate your income tax based on your earnings and deductions.",
    category: "Finance",
    categoryId: "finance",
    icon: <Landmark className="h-8 w-8 text-primary" />,
  },
  {
    id: "currency",
    name: "Currency Converter",
    description: "Convert between different currencies using up-to-date exchange rates.",
    category: "Finance",
    categoryId: "finance",
    icon: <Coins className="h-8 w-8 text-primary" />,
  },
  {
    id: "credit-card-payoff",
    name: "Credit Card Payoff",
    description: "Calculate how long it will take to pay off your credit card balance.",
    category: "Finance",
    categoryId: "finance",
    icon: <CreditCard className="h-8 w-8 text-primary" />,
  },
  {
    id: "car-loan",
    name: "Car Loan Calculator",
    description: "Calculate monthly car payments, interest, and total cost.",
    category: "Finance",
    categoryId: "finance",
    icon: <Car className="h-8 w-8 text-primary" />,
    isNew: true,
  },
  {
    id: "inflation",
    name: "Inflation Calculator",
    description: "Calculate the effect of inflation on your money over time.",
    category: "Finance",
    categoryId: "finance",
    icon: <BarChart className="h-8 w-8 text-primary" />,
    isNew: true,
  },
  {
    id: "ecommerce-expense",
    name: "E-commerce Expense Calculator (PKR)",
    description: "Calculate your e-commerce business expenses, revenue, and profit in Pakistani Rupees.",
    category: "Finance",
    categoryId: "finance",
    icon: <ShoppingBag className="h-8 w-8 text-primary" />,
    isNew: true,
  },
]

// Health Calculators
const healthCalculators: Calculator[] = [
  {
    id: "bmi",
    name: "BMI Calculator",
    description: "Calculate your Body Mass Index (BMI) to assess your weight relative to your height.",
    category: "Health",
    categoryId: "health",
    icon: <Scale className="h-8 w-8 text-primary" />,
    isPopular: true,
  },
  {
    id: "calorie",
    name: "Calorie Calculator",
    description: "Calculate your daily calorie needs based on your activity level and goals.",
    category: "Health",
    categoryId: "health",
    icon: <Utensils className="h-8 w-8 text-primary" />,
  },
  {
    id: "body-fat",
    name: "Body Fat Calculator",
    description: "Estimate your body fat percentage using various measurement methods.",
    category: "Health",
    categoryId: "health",
    icon: <Dumbbell className="h-8 w-8 text-primary" />,
  },
  {
    id: "pregnancy",
    name: "Pregnancy Calculator",
    description: "Calculate your due date and track important pregnancy milestones.",
    category: "Health",
    categoryId: "health",
    icon: <Baby className="h-8 w-8 text-primary" />,
  },
  {
    id: "bmr",
    name: "BMR Calculator",
    description: "Calculate your Basal Metabolic Rate (BMR) to understand your base calorie needs.",
    category: "Health",
    categoryId: "health",
    icon: <Gauge className="h-8 w-8 text-primary" />,
  },
  {
    id: "macro",
    name: "Macro Calculator",
    description: "Calculate your macronutrient needs based on your goals and body composition.",
    category: "Health",
    categoryId: "health",
    icon: <BarChart className="h-8 w-8 text-primary" />,
  },
]

// Math Calculators
const mathCalculators: Calculator[] = [
  {
    id: "scientific",
    name: "Scientific Calculator",
    description: "Perform complex mathematical calculations with advanced functions.",
    category: "Math",
    categoryId: "math",
    icon: <CalculatorIcon className="h-8 w-8 text-primary" />,
    isPopular: true,
  },
  {
    id: "percentage",
    name: "Percentage Calculator",
    description: "Calculate percentages, increases, decreases, and differences.",
    category: "Math",
    categoryId: "math",
    icon: <Percent className="h-8 w-8 text-primary" />,
  },
  {
    id: "fraction",
    name: "Fraction Calculator",
    description: "Add, subtract, multiply, and divide fractions with step-by-step solutions.",
    category: "Math",
    categoryId: "math",
    icon: <Divide className="h-8 w-8 text-primary" />,
  },
  {
    id: "unit-conversion",
    name: "Unit Converter",
    description: "Convert between different units of measurement for length, weight, volume, and more.",
    category: "Math",
    categoryId: "math",
    icon: <Ruler className="h-8 w-8 text-primary" />,
  },
  {
    id: "algebra",
    name: "Algebra Calculator",
    description: "Solve algebraic equations and expressions with step-by-step solutions.",
    category: "Math",
    categoryId: "math",
    icon: <X className="h-8 w-8 text-primary" />,
  },
  {
    id: "statistics",
    name: "Statistics Calculator",
    description: "Calculate mean, median, mode, standard deviation, and other statistical measures.",
    category: "Math",
    categoryId: "math",
    icon: <Sigma className="h-8 w-8 text-primary" />,
  },
  {
    id: "area",
    name: "Area Calculator",
    description: "Calculate the area of various shapes like circles, triangles, and rectangles.",
    category: "Math",
    categoryId: "math",
    icon: <Square className="h-8 w-8 text-primary" />,
  },
  {
    id: "volume",
    name: "Volume Calculator",
    description: "Calculate the volume of various 3D shapes like cubes, spheres, and cylinders.",
    category: "Math",
    categoryId: "math",
    icon: <SquareRoot className="h-8 w-8 text-primary" />,
  },
  {
    id: "triangle",
    name: "Triangle Calculator",
    description: "Calculate various properties of triangles including area, perimeter, and angles.",
    category: "Math",
    categoryId: "math",
    icon: <Pi className="h-8 w-8 text-primary" />,
  },
  {
    id: "factorial",
    name: "Factorial Calculator",
    description: "Calculate the factorial of a number and understand the mathematical concept.",
    category: "Math",
    categoryId: "math",
    icon: <Hash className="h-8 w-8 text-primary" />,
    isNew: true,
  },
]

// Date & Time Calculators
const dateTimeCalculators: Calculator[] = [
  {
    id: "age",
    name: "Age Calculator",
    description: "Calculate your exact age in years, months, days, hours, and minutes.",
    category: "Date & Time",
    categoryId: "date-time",
    icon: <Calendar className="h-8 w-8 text-primary" />,
    isPopular: true,
  },
  {
    id: "date-difference",
    name: "Date Difference",
    description: "Calculate the difference between two dates in days, weeks, months, and years.",
    category: "Date & Time",
    categoryId: "date-time",
    icon: <CalendarDays className="h-8 w-8 text-primary" />,
  },
  {
    id: "time-calculator",
    name: "Time Calculator",
    description: "Add or subtract hours, minutes, and seconds with time zone support.",
    category: "Date & Time",
    categoryId: "date-time",
    icon: <Clock className="h-8 w-8 text-primary" />,
  },
  {
    id: "countdown",
    name: "Countdown Timer",
    description: "Create a countdown to any date or event with customizable alerts.",
    category: "Date & Time",
    categoryId: "date-time",
    icon: <Hourglass className="h-8 w-8 text-primary" />,
    isNew: true,
  },
  {
    id: "working-days",
    name: "Working Days Calculator",
    description: "Calculate working days between dates, excluding weekends and holidays.",
    category: "Date & Time",
    categoryId: "date-time",
    icon: <Briefcase className="h-8 w-8 text-primary" />,
  },
]

// Everyday Calculators
const everydayCalculators: Calculator[] = [
  {
    id: "tip",
    name: "Tip Calculator",
    description: "Calculate the tip amount and total bill with options to split between people.",
    category: "Everyday",
    categoryId: "everyday",
    icon: <DollarSign className="h-8 w-8 text-primary" />,
    isPopular: true,
  },
  {
    id: "discount",
    name: "Discount Calculator",
    description: "Calculate sale prices, discounts, and savings on purchases.",
    category: "Everyday",
    categoryId: "everyday",
    icon: <Percent className="h-8 w-8 text-primary" />,
  },
  {
    id: "fuel-economy",
    name: "Fuel Economy Calculator",
    description: "Calculate fuel consumption, costs, and savings for your vehicle.",
    category: "Everyday",
    categoryId: "everyday",
    icon: <Car className="h-8 w-8 text-primary" />,
    isNew: true,
  },
  {
    id: "electricity",
    name: "Electricity Cost",
    description: "Calculate the cost of running electrical appliances based on usage and rates.",
    category: "Everyday",
    categoryId: "everyday",
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
  },
  {
    id: "temperature",
    name: "Temperature Converter",
    description: "Convert between Celsius, Fahrenheit, and Kelvin temperature scales.",
    category: "Everyday",
    categoryId: "everyday",
    icon: <Thermometer className="h-8 w-8 text-primary" />,
  },
  {
    id: "gpa",
    name: "GPA Calculator",
    description: "Calculate your Grade Point Average (GPA) based on your grades and credits.",
    category: "Everyday",
    categoryId: "everyday",
    icon: <BarChart className="h-8 w-8 text-primary" />,
    isNew: true,
  },
]

// All calculators
export const allCalculators: Calculator[] = [
  ...financeCalculators,
  ...healthCalculators,
  ...mathCalculators,
  ...dateTimeCalculators,
  ...everydayCalculators,
]

// Featured calculators
export const featuredCalculators: Calculator[] = allCalculators.filter((calc) => calc.isPopular).slice(0, 8)

// Categories
export const calculatorCategories: Category[] = [
  {
    id: "finance",
    name: "Finance",
    description: "Financial calculators for loans, investments, mortgages, and more.",
    icon: <DollarSign className="h-6 w-6" />,
    calculators: financeCalculators,
  },
  {
    id: "health",
    name: "Health",
    description: "Health and fitness calculators for BMI, calories, body fat, and more.",
    icon: <Heart className="h-6 w-6" />,
    calculators: healthCalculators,
  },
  {
    id: "math",
    name: "Math",
    description: "Math calculators for algebra, geometry, statistics, and more.",
    icon: <CalculatorIcon className="h-6 w-6" />,
    calculators: mathCalculators,
  },
  {
    id: "date-time",
    name: "Date & Time",
    description: "Date and time calculators for age, date differences, and more.",
    icon: <Calendar className="h-6 w-6" />,
    calculators: dateTimeCalculators,
  },
  {
    id: "everyday",
    name: "Everyday",
    description: "Everyday calculators for tips, discounts, fuel economy, and more.",
    icon: <Percent className="h-6 w-6" />,
    calculators: everydayCalculators,
  },
]
