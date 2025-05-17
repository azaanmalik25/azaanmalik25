"use client"

import { useState, useEffect } from "react"

interface BannerMessage {
  text: string
  highlight?: boolean
}

interface RedBlackBannerProps {
  messages: BannerMessage[]
  speed?: number // pixels per second
}

export function RedBlackBanner({ messages, speed = 80 }: RedBlackBannerProps) {
  const [position, setPosition] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)
  const [contentWidth, setContentWidth] = useState(0)

  // Initialize container and content widths
  useEffect(() => {
    const updateWidths = () => {
      const container = document.getElementById("banner-container")
      const content = document.getElementById("banner-content")

      if (container && content) {
        setContainerWidth(container.offsetWidth)
        setContentWidth(content.offsetWidth)
        // Start from right edge
        setPosition(containerWidth)
      }
    }

    updateWidths()
    window.addEventListener("resize", updateWidths)

    return () => window.removeEventListener("resize", updateWidths)
  }, [])

  // Animation loop
  useEffect(() => {
    if (!containerWidth || !contentWidth) return

    let animationFrameId: number
    let lastTimestamp: number

    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp
      const elapsed = timestamp - lastTimestamp

      // Move banner based on elapsed time and speed
      setPosition((prev) => {
        const newPosition = prev - (speed * elapsed) / 1000

        // Reset position when banner has moved completely off screen to the left
        if (newPosition < -contentWidth) {
          return containerWidth
        }
        return newPosition
      })

      lastTimestamp = timestamp
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [containerWidth, contentWidth, speed])

  return (
    <div id="banner-container" className="w-full bg-black text-white overflow-hidden relative h-10">
      <div
        id="banner-content"
        className="absolute top-0 whitespace-nowrap py-2 flex items-center h-full"
        style={{ left: `${position}px` }}
      >
        {messages.map((message, index) => (
          <span key={index} className={`mx-4 ${message.highlight ? "text-red-500 font-bold" : "text-white"}`}>
            {message.text}
          </span>
        ))}
      </div>
    </div>
  )
}
