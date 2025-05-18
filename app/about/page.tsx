import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "About Us | Calculator Hub - Your Trusted Calculation Resource",
  description:
    "Learn about Calculator Hub's mission to provide free, accurate, and easy-to-use online calculators for finance, math, health, and everyday calculations.",
  keywords: "calculator hub, about us, online calculators, calculation tools, math resources",
  openGraph: {
    title: "About Calculator Hub - Your Trusted Calculation Resource",
    description: "Learn about our mission to provide free, accurate online calculators for everyone.",
    url: "https://calculatorhub.com/about",
    type: "website",
  },
}

export default function AboutPage() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About Calculator Hub</h1>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="lead text-xl text-muted-foreground mb-8">
            Calculator Hub is dedicated to providing free, accurate, and easy-to-use online calculators for everyone.
          </p>

          <Card className="mb-10">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p>
                At Calculator Hub, we believe that accurate calculations should be accessible to everyone. Our mission
                is to create a comprehensive resource of online calculators that help people make informed decisions in
                their daily lives, whether it's planning their finances, monitoring their health, solving math problems,
                or making everyday calculations.
              </p>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-medium mb-2">Finance Calculators</h3>
              <p className="text-muted-foreground">
                From mortgage payments to investment returns, our finance calculators help you plan your financial
                future with confidence.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-medium mb-2">Health Calculators</h3>
              <p className="text-muted-foreground">
                Monitor your health metrics with our BMI, calorie, body fat, and other health-related calculators.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-medium mb-2">Math Calculators</h3>
              <p className="text-muted-foreground">
                Solve complex mathematical problems with our comprehensive suite of math calculators and converters.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-medium mb-2">Everyday Calculators</h3>
              <p className="text-muted-foreground">
                Make daily decisions easier with our tip, discount, fuel economy, and other everyday calculators.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-4">Our Commitment to Quality</h2>
          <p className="mb-6">
            Every calculator on our platform is carefully designed and thoroughly tested to ensure accuracy and
            reliability. We regularly update our calculators to reflect the latest formulas, rates, and best practices
            in each field.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Privacy and Security</h2>
          <p className="mb-6">
            We respect your privacy and are committed to protecting your personal information. All calculations are
            performed directly in your browser, and we do not store any of your input data. For more information, please
            read our{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            .
          </p>

          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="mb-10">
            We value your feedback and are always looking for ways to improve our service. If you have any questions,
            suggestions, or concerns, please don't hesitate to{" "}
            <Link href="/contact" className="text-primary hover:underline">
              contact us
            </Link>
            .
          </p>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 mb-8">
            <h3 className="text-xl font-medium mb-2">Join Our Community</h3>
            <p className="mb-4">
              Stay updated with our latest calculators and features by following us on social media or subscribing to
              our newsletter.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-primary hover:underline">
                Twitter
              </Link>
              <Link href="#" className="text-primary hover:underline">
                Facebook
              </Link>
              <Link href="#" className="text-primary hover:underline">
                LinkedIn
              </Link>
            </div>
          </div>

          <div itemScope itemType="https://schema.org/Organization" className="hidden">
            <span itemProp="name">Calculator Hub</span>
            <div itemProp="description">
              Free online calculators for finance, math, health, and everyday calculations.
            </div>
            <Link href="https://calculatorhub.com" itemProp="url">
              Calculator Hub
            </Link>
            <div itemProp="foundingDate">2023</div>
          </div>
        </div>
      </div>
    </div>
  )
}
