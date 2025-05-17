"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SlidingBanner() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  // Banner messages - simplified to reduce complexity
  const messages = [
    {
      id: 1,
      text: "🚀 New Factorial Calculator just added! Try it now",
      link: "/calculator/factorial",
    },
    {
      id: 2,
      text: "⭐ Save your favorite calculators by creating a free account",
      link: "/signup",
    },
    {
      id: 3,
      text: "📱 Our calculators work on all devices - desktop, tablet, and mobile",
      link: null,
    },
  ]

  // Auto-rotate messages with a safe implementation
  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isVisible, messages.length])

  if (!isVisible) return null

  const currentMessage = messages[currentIndex]

  return (
    <div className="bg-gradient-to-r from-indigo-700 to-purple-700 py-3 text-white relative">
      <div className="container mx-auto px-4 flex items-center justify-center">
        <div className="text-center">
          {currentMessage.link ? (
            <a href={currentMessage.link} className="hover:underline">
              {currentMessage.text}
            </a>
          ) : (
            <span>{currentMessage.text}</span>
          )}
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
