"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { useTheme } from "next-themes"
import { Clock } from "lucide-react"

export function RealTimeClock() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const { theme } = useTheme()

  useEffect(() => {
    // Update time every second
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    // Clean up interval on unmount
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-2 text-sm">
      <Clock className="h-4 w-4" />
      <span>
        {format(currentTime, "EEEE, MMMM d, yyyy")} | {format(currentTime, "h:mm:ss a")}
      </span>
    </div>
  )
}
