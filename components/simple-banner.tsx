"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export function SimpleBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-gradient-to-r from-indigo-700 to-purple-700 py-3 text-white">
      <div className="container mx-auto px-4 relative flex items-center justify-center">
        <div className="text-center">
          <span className="font-medium">🚀 New Factorial Calculator just added! </span>
          <a href="/calculator/factorial" className="underline font-bold hover:text-indigo-200 transition-colors ml-1">
            Try it now
          </a>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 h-7 w-7 rounded-full bg-white/10 hover:bg-white/20 text-white"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>
    </div>
  )
}
