import Link from "next/link"
import { Button } from "@/components/ui/button"

export function SimpleHero() {
  return (
    <div className="bg-indigo-900 py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">50+ Free Online Calculators</h1>
        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          From finance to math, we've got all your calculation needs covered
        </p>
        <Button asChild size="lg" className="bg-white text-indigo-900 hover:bg-white/90">
          <Link href="/all">Explore All Calculators</Link>
        </Button>
      </div>
    </div>
  )
}
