"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      title: "50+ Free Online Calculators",
      description: "From finance to math, we've got all your calculation needs covered",
      cta: {
        text: "Explore All Calculators",
        link: "/all",
      },
      bgClass: "bg-indigo-900",
    },
    {
      id: 2,
      title: "Financial Planning Made Easy",
      description: "Calculate loans, mortgages, investments, and more with our finance tools",
      cta: {
        text: "Try Finance Calculators",
        link: "/category/finance",
      },
      bgClass: "bg-blue-900",
    },
    {
      id: 3,
      title: "New: Factorial Calculator",
      description: "Our newest addition - calculate factorials with recursive or iterative methods",
      cta: {
        text: "Try It Now",
        link: "/calculator/factorial",
      },
      bgClass: "bg-purple-900",
    },
  ]

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 6000)

    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <div className="relative overflow-hidden h-[400px] md:h-[500px]">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          } ${slide.bgClass}`}
        >
          <div className="container mx-auto px-4 flex flex-col items-center text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">{slide.title}</h2>
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl">{slide.description}</p>
            <Button asChild size="lg" className="bg-white text-indigo-900 hover:bg-white/90">
              <Link href={slide.cta.link}>{slide.cta.text}</Link>
            </Button>
          </div>
        </div>
      ))}

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-white" : "bg-white/50 hover:bg-white/80"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}
