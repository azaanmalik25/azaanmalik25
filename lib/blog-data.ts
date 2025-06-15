export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: {
    name: string
    avatar: string
    bio: string
  }
  publishedAt: string
  updatedAt: string
  category: string
  tags: string[]
  featuredImage: string
  readingTime: number
  isPublished: boolean
  seo: {
    metaTitle: string
    metaDescription: string
    keywords: string[]
    canonicalUrl?: string
  }
}

export const blogCategories = [
  "Calculator Guides",
  "Financial Tips",
  "Health & Fitness",
  "Math & Science",
  "Business Tools",
  "Educational",
  "Technology",
]

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Complete Guide to BMI Calculator: Understanding Your Body Mass Index",
    slug: "complete-guide-bmi-calculator",
    excerpt:
      "Learn how to use our BMI calculator effectively and understand what your BMI score means for your health.",
    content: `# Complete Guide to BMI Calculator: Understanding Your Body Mass Index

Body Mass Index (BMI) is a widely used screening tool that helps assess whether you're at a healthy weight for your height. Our BMI calculator makes it easy to determine your BMI and understand what it means for your health.

## What is BMI?

BMI is a numerical value derived from your weight and height. It's calculated using the formula:
**BMI = weight (kg) / height (m)²**

## BMI Categories

- **Underweight**: BMI less than 18.5
- **Normal weight**: BMI 18.5-24.9
- **Overweight**: BMI 25-29.9
- **Obese**: BMI 30 or greater

## How to Use Our BMI Calculator

1. Enter your height in feet and inches or centimeters
2. Enter your weight in pounds or kilograms
3. Click calculate to get your BMI score
4. Review the category and health recommendations

## Limitations of BMI

While BMI is a useful screening tool, it has limitations:
- Doesn't distinguish between muscle and fat
- May not be accurate for athletes or elderly individuals
- Doesn't account for bone density or body composition

## Tips for Maintaining a Healthy BMI

- Eat a balanced diet rich in fruits and vegetables
- Exercise regularly (at least 150 minutes per week)
- Stay hydrated
- Get adequate sleep
- Manage stress levels

Remember to consult with healthcare professionals for personalized advice about your weight and health goals.`,
    author: {
      name: "Dr. Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "Certified nutritionist and health expert with 10+ years of experience.",
    },
    publishedAt: "2024-01-15",
    updatedAt: "2024-01-15",
    category: "Health & Fitness",
    tags: ["BMI", "Health", "Weight Management", "Fitness"],
    featuredImage: "/images/calculators/bmi.jpg",
    readingTime: 5,
    isPublished: true,
    seo: {
      metaTitle: "BMI Calculator Guide - Calculate and Understand Your Body Mass Index",
      metaDescription:
        "Complete guide to using BMI calculator. Learn how to calculate BMI, understand BMI categories, and get tips for maintaining healthy weight.",
      keywords: ["BMI calculator", "body mass index", "weight calculator", "health assessment", "BMI guide"],
    },
  },
  {
    id: "2",
    title: "Mortgage Calculator: How to Calculate Your Monthly Payments",
    slug: "mortgage-calculator-monthly-payments",
    excerpt:
      "Master the art of mortgage calculations with our comprehensive guide to understanding home loan payments.",
    content: `# Mortgage Calculator: How to Calculate Your Monthly Payments

Buying a home is one of the biggest financial decisions you'll make. Our mortgage calculator helps you understand exactly what your monthly payments will be and how different factors affect your loan.

## Understanding Mortgage Components

Your monthly mortgage payment typically includes:

### Principal and Interest (P&I)
- **Principal**: The amount you borrowed
- **Interest**: The cost of borrowing money

### Property Taxes
- Annual property taxes divided by 12
- Varies by location and property value

### Homeowners Insurance
- Protects your investment
- Required by most lenders

### Private Mortgage Insurance (PMI)
- Required if down payment is less than 20%
- Protects the lender if you default

## How to Use Our Mortgage Calculator

1. **Enter the home price**: Total cost of the property
2. **Down payment**: Amount you'll pay upfront
3. **Loan term**: Usually 15 or 30 years
4. **Interest rate**: Current mortgage rates
5. **Property taxes**: Annual amount
6. **Insurance**: Annual homeowners insurance cost

## Factors That Affect Your Mortgage Payment

### Interest Rate
- Even a small change can significantly impact your payment
- Shop around for the best rates

### Loan Term
- Longer terms = lower monthly payments but more interest
- Shorter terms = higher payments but less total interest

### Down Payment
- Larger down payment = lower monthly payment
- Helps you avoid PMI

## Tips for Getting the Best Mortgage

- Improve your credit score before applying
- Save for a larger down payment
- Compare offers from multiple lenders
- Consider different loan types (conventional, FHA, VA)
- Get pre-approved before house hunting

## Example Calculation

For a $300,000 home with:
- 20% down payment ($60,000)
- 30-year loan at 6.5% interest
- $3,000 annual property taxes
- $1,200 annual insurance

Your monthly payment would be approximately $1,766.

Use our mortgage calculator to see how different scenarios affect your payment and find the option that works best for your budget.`,
    author: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "Licensed mortgage broker with 15+ years in real estate finance.",
    },
    publishedAt: "2024-01-10",
    updatedAt: "2024-01-10",
    category: "Financial Tips",
    tags: ["Mortgage", "Home Buying", "Real Estate", "Finance"],
    featuredImage: "/images/calculators/mortgage.jpg",
    readingTime: 7,
    isPublished: true,
    seo: {
      metaTitle: "Mortgage Calculator Guide - Calculate Home Loan Payments",
      metaDescription:
        "Learn how to use mortgage calculator to determine monthly payments. Complete guide to understanding mortgage components and getting the best rates.",
      keywords: ["mortgage calculator", "home loan calculator", "monthly payment", "mortgage rates", "home buying"],
    },
  },
  {
    id: "3",
    title: "Investment Calculator: Plan Your Financial Future",
    slug: "investment-calculator-financial-planning",
    excerpt:
      "Discover how compound interest can grow your wealth over time with our comprehensive investment calculator guide.",
    content: `# Investment Calculator: Plan Your Financial Future

Building wealth through investing is one of the most effective ways to secure your financial future. Our investment calculator helps you visualize how your money can grow over time through the power of compound interest.

## Understanding Investment Growth

### Compound Interest
The magic of compound interest means you earn returns not just on your initial investment, but also on the returns themselves. This creates exponential growth over time.

### Key Variables
- **Initial Investment**: Your starting amount
- **Monthly Contributions**: Regular additions to your investment
- **Annual Return Rate**: Expected yearly growth percentage
- **Time Horizon**: How long you plan to invest

## Types of Investment Accounts

### 401(k) and Employer Plans
- Often include employer matching
- Tax advantages for retirement savings
- Higher contribution limits

### Individual Retirement Accounts (IRAs)
- Traditional IRA: Tax-deductible contributions
- Roth IRA: Tax-free withdrawals in retirement

### Taxable Investment Accounts
- More flexibility for withdrawals
- No contribution limits
- Subject to capital gains taxes

## Investment Strategies by Age

### In Your 20s and 30s
- Focus on growth investments
- Take advantage of time for compound growth
- Consider aggressive portfolios (80-90% stocks)

### In Your 40s and 50s
- Balance growth with stability
- Moderate portfolios (60-70% stocks)
- Increase retirement contributions

### In Your 60s and Beyond
- Focus on capital preservation
- Conservative portfolios (40-50% stocks)
- Plan for income generation

## Example Investment Scenarios

### Scenario 1: Early Starter
- Age 25, investing $500/month
- 7% annual return for 40 years
- Result: Over $1.3 million at retirement

### Scenario 2: Late Starter
- Age 35, investing $500/month
- 7% annual return for 30 years
- Result: About $612,000 at retirement

The 10-year difference costs over $700,000 in potential wealth!

## Tips for Successful Investing

1. **Start Early**: Time is your greatest asset
2. **Invest Regularly**: Dollar-cost averaging reduces risk
3. **Diversify**: Don't put all eggs in one basket
4. **Keep Costs Low**: High fees eat into returns
5. **Stay Consistent**: Don't try to time the market
6. **Rebalance Periodically**: Maintain your target allocation

## Common Investment Mistakes to Avoid

- Waiting for the "perfect" time to start
- Trying to time the market
- Panic selling during market downturns
- Not diversifying enough
- Ignoring fees and expenses
- Not increasing contributions over time

Use our investment calculator to model different scenarios and see how small changes in contributions or returns can dramatically impact your long-term wealth.`,
    author: {
      name: "Jennifer Martinez",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "Certified Financial Planner with expertise in investment strategies.",
    },
    publishedAt: "2024-01-05",
    updatedAt: "2024-01-05",
    category: "Financial Tips",
    tags: ["Investment", "Compound Interest", "Retirement Planning", "Wealth Building"],
    featuredImage: "/images/calculators/investment.jpg",
    readingTime: 8,
    isPublished: true,
    seo: {
      metaTitle: "Investment Calculator Guide - Plan Your Financial Future",
      metaDescription:
        "Learn how to use investment calculator for financial planning. Understand compound interest, investment strategies, and wealth building tips.",
      keywords: [
        "investment calculator",
        "compound interest",
        "retirement planning",
        "wealth building",
        "financial planning",
      ],
    },
  },
]

// Mock functions for admin operations (in a real app, these would connect to a database)
export const getBlogPosts = (): BlogPost[] => {
  return blogPosts.filter((post) => post.isPublished)
}

export const getAllBlogPosts = (): BlogPost[] => {
  return blogPosts
}

export const getBlogPost = (slug: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.slug === slug && post.isPublished)
}

export const getBlogPostById = (id: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.id === id)
}

export const createBlogPost = (post: Omit<BlogPost, "id">): BlogPost => {
  const newPost = {
    ...post,
    id: Date.now().toString(),
  }
  blogPosts.push(newPost)
  return newPost
}

export const updateBlogPost = (id: string, updates: Partial<BlogPost>): BlogPost | null => {
  const index = blogPosts.findIndex((post) => post.id === id)
  if (index === -1) return null

  blogPosts[index] = { ...blogPosts[index], ...updates, updatedAt: new Date().toISOString().split("T")[0] }
  return blogPosts[index]
}

export const deleteBlogPost = (id: string): boolean => {
  const index = blogPosts.findIndex((post) => post.id === id)
  if (index === -1) return false

  blogPosts.splice(index, 1)
  return true
}
