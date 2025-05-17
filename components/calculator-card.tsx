import Link from "next/link"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Calculator } from "@/lib/calculator-data"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CalculatorCardProps {
  calculator: Calculator
}

export function CalculatorCard({ calculator }: CalculatorCardProps) {
  return (
    <Card className="overflow-hidden bg-[#161645] border-indigo-900/50 hover:border-indigo-700/50 transition-colors">
      <Link href={`/calculator/${calculator.id}`}>
        <div className="aspect-video w-full bg-indigo-900/20 flex items-center justify-center relative overflow-hidden">
          <div className="text-indigo-400 transform scale-[2.5] transition-transform duration-300 hover:scale-[3]">
            {calculator.icon}
          </div>
          {calculator.isNew && (
            <Badge className="absolute top-2 right-2 bg-green-600 hover:bg-green-700 z-20">New</Badge>
          )}
        </div>
      </Link>
      <CardHeader className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg text-white">
              <Link href={`/calculator/${calculator.id}`}>{calculator.name}</Link>
            </CardTitle>
            <CardDescription className="line-clamp-2 mt-1 text-gray-400">{calculator.description}</CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-indigo-400 hover:bg-indigo-900/20"
          >
            <Heart className="h-4 w-4" />
            <span className="sr-only">Add to favorites</span>
          </Button>
        </div>
      </CardHeader>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <Badge variant="secondary" className="bg-indigo-900/50 text-indigo-300 hover:bg-indigo-800/50">
          {calculator.category}
        </Badge>
        {calculator.isPopular && (
          <Badge variant="outline" className="ml-2 border-indigo-700/50 text-indigo-400">
            Popular
          </Badge>
        )}
      </CardFooter>
    </Card>
  )
}
