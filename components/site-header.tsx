"use client"

import type React from "react"
import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { RealTimeClock } from "@/components/real-time-clock"

export function SiteHeader() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-indigo-900/20 bg-[#0a0a20]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0a0a20]/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-white">Calculator Hub</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-300">
            <Link href="/category/finance" className="transition-colors hover:text-white">
              Finance
            </Link>
            <Link href="/category/health" className="transition-colors hover:text-white">
              Health
            </Link>
            <Link href="/category/math" className="transition-colors hover:text-white">
              Math
            </Link>
            <Link href="/category/date-time" className="transition-colors hover:text-white">
              Date & Time
            </Link>
            <Link href="/category/everyday" className="transition-colors hover:text-white">
              Everyday
            </Link>
            <Link href="/all" className="transition-colors hover:text-white">
              All Calculators
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden lg:block">
            <RealTimeClock />
          </div>
          <form onSubmit={handleSearch} className="hidden md:flex relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search calculators..."
              className="w-[200px] pl-8 bg-[#0f0f2d] border-indigo-900/50 text-white placeholder:text-gray-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <ThemeToggle />
          <Button
            variant="outline"
            size="sm"
            asChild
            className="hidden md:flex border-indigo-700 text-indigo-400 hover:bg-indigo-900/20"
          >
            <Link href="/favorites">Favorites</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
