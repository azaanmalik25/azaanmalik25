import Link from "next/link"
import { Button } from "@/components/ui/button"
import { calculatorCategories, featuredCalculators } from "@/lib/calculator-data"
import { CalculatorCard } from "@/components/calculator-card"
import { SimpleHero } from "@/components/simple-hero"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a20] text-white">
      {/* Simple Hero */}
      <SimpleHero />

      {/* Featured Calculators */}
      <div className="bg-[#0f0f2d] py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Featured Calculators</h2>
            <Link href="/all" className="text-sm font-medium text-indigo-400 hover:text-indigo-300">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredCalculators.map((calculator) => (
              <CalculatorCard key={calculator.id} calculator={calculator} />
            ))}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-[#0a0a20] py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold tracking-tight mb-8">Browse by Category</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {calculatorCategories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.id}`}
                className="bg-[#0f0f2d] p-6 rounded-lg hover:bg-[#161645] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-indigo-900/50 p-3 rounded-full">{category.icon}</div>
                  <div>
                    <h3 className="text-xl font-medium">{category.name}</h3>
                    <p className="text-gray-400 mt-1">{category.calculators.length} calculators</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-indigo-900 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Calculate?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Our calculators are designed to make your calculations easy, accurate, and fast.
          </p>
          <Button asChild size="lg" className="bg-white text-indigo-900 hover:bg-white/90">
            <Link href="/all">Get Started Now</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
