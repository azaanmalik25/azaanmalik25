"use client"

import { useState, useEffect, useRef } from "react"

interface SlidingTaxBannerProps {
  messages: string[]
}

export function SlidingTaxBanner({ messages }: SlidingTaxBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentWidth, setContentWidth] = useState(0)
  const [animationDuration, setAnimationDuration] = useState(15) // seconds

  // Update content width when message changes
  useEffect(() => {
    if (contentRef.current) {
      const width = contentRef.current.offsetWidth
      setContentWidth(width)
      // Adjust animation duration based on content length
      setAnimationDuration(Math.max(10, width / 50))
    }
  }, [currentIndex, messages])

  // Rotate through messages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length)
    }, animationDuration * 1000)

    return () => clearInterval(interval)
  }, [messages.length, animationDuration])

  return (
    <div className="w-full bg-black text-white overflow-hidden" ref={containerRef}>
      <div
        className="py-2 whitespace-nowrap inline-block"
        ref={contentRef}
        style={{
          animation: `slideRightToLeft ${animationDuration}s linear infinite`,
        }}
      >
        <span className="text-red-500 font-bold mr-4">{messages[currentIndex]}</span>
      </div>
      <style jsx global>{`
        @keyframes slideRightToLeft {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  )
}
