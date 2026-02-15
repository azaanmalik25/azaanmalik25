"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { signInAdmin } from "@/lib/auth"
import { Eye, EyeOff, LogIn, Database, Info } from "lucide-react"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("admin@calculatorhub.com")
  const [password, setPassword] = useState("admin123")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [dbStatus, setDbStatus] = useState<string | null>(null)
  const [loginMode, setLoginMode] = useState<string | null>(null)
  const router = useRouter()

  const testConnection = async () => {
    try {
      const response = await fetch("/api/test-connection")
      const data = await response.json()

      if (data.success) {
        setDbStatus("✅ Database connected")
      } else {
        setDbStatus(`❌ ${data.error} (${data.mode} mode)`)
      }
    } catch (err) {
      setDbStatus("❌ Connection test failed")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setLoginMode(null)

    try {
      const result = await signInAdmin(email, password)
      if (result.user) {
        setLoginMode(result.mode || "demo")
        // Small delay to show the mode, then redirect
        setTimeout(() => {
          router.push("/admin")
          router.refresh()
        }, 1000)
      }
    } catch (err) {
      console.error("Login error:", err)
      setError(err instanceof Error ? err.message : "Login failed. Please check your credentials.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-900/50 border-gray-800">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white">Admin Login</CardTitle>
          <p className="text-gray-400">Sign in to access the admin dashboard</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="admin@calculatorhub.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-300">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white pr-10"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <Alert className="border-red-800 bg-red-900/20">
                <AlertDescription className="text-red-400">{error}</AlertDescription>
              </Alert>
            )}

            {loginMode && (
              <Alert className="border-green-800 bg-green-900/20">
                <Info className="h-4 w-4" />
                <AlertDescription className="text-green-400">
                  ✅ Login successful! Running in {loginMode} mode. Redirecting...
                </AlertDescription>
              </Alert>
            )}

            <Button type="submit" disabled={isLoading} className="w-full bg-purple-600 hover:bg-purple-700">
              {isLoading ? (
                "Signing in..."
              ) : (
                <>
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 space-y-4">
            <div className="p-4 bg-gray-800/50 rounded-lg">
              <p className="text-sm text-gray-400 mb-2">Demo Credentials:</p>
              <p className="text-xs text-gray-500">Email: admin@calculatorhub.com</p>
              <p className="text-xs text-gray-500">Password: admin123</p>
              <Button
                onClick={() => {
                  setEmail("admin@calculatorhub.com")
                  setPassword("admin123")
                }}
                variant="outline"
                size="sm"
                className="mt-2 text-xs"
              >
                Fill Demo Credentials
              </Button>
            </div>

            <div className="p-4 bg-gray-800/50 rounded-lg">
              <Button onClick={testConnection} variant="outline" size="sm" className="w-full mb-2">
                <Database className="h-4 w-4 mr-2" />
                Test Database Connection
              </Button>
              {dbStatus && <p className="text-xs text-gray-400">{dbStatus}</p>}
            </div>

            <div className="text-center">
              <a href="/setup" className="text-purple-400 hover:text-purple-300 text-sm mr-4">
                Setup Database →
              </a>
              <a href="/admin" className="text-purple-400 hover:text-purple-300 text-sm">
                Skip to Admin →
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
