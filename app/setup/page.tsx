"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Database, User, CheckCircle } from "lucide-react"

export default function SetupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const setupAdmin = async () => {
    setIsLoading(true)
    setError("")
    setMessage("")

    try {
      const response = await fetch("/api/setup-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}), // Use default credentials
      })

      const data = await response.json()

      if (response.ok) {
        setMessage("✅ Admin user created successfully! You can now login.")
      } else {
        setError(data.error || "Setup failed")
      }
    } catch (err) {
      setError("Setup failed: " + (err instanceof Error ? err.message : "Unknown error"))
    } finally {
      setIsLoading(false)
    }
  }

  const testConnection = async () => {
    setIsLoading(true)
    setError("")
    setMessage("")

    try {
      const response = await fetch("/api/test-connection")
      const data = await response.json()

      if (data.success) {
        setMessage("✅ Database connection successful!")
      } else {
        setError("❌ Database connection failed: " + data.error)
      }
    } catch (err) {
      setError("Connection test failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-900/50 border-gray-800">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white">Setup Admin</CardTitle>
          <p className="text-gray-400">Initialize your admin user and database</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={testConnection} disabled={isLoading} className="w-full" variant="outline">
            <Database className="h-4 w-4 mr-2" />
            Test Database Connection
          </Button>

          <Button onClick={setupAdmin} disabled={isLoading} className="w-full bg-purple-600 hover:bg-purple-700">
            <User className="h-4 w-4 mr-2" />
            {isLoading ? "Setting up..." : "Create Admin User"}
          </Button>

          {message && (
            <Alert className="border-green-800 bg-green-900/20">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription className="text-green-400">{message}</AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert className="border-red-800 bg-red-900/20">
              <AlertDescription className="text-red-400">{error}</AlertDescription>
            </Alert>
          )}

          <div className="p-4 bg-gray-800/50 rounded-lg">
            <p className="text-sm text-gray-400 mb-2">Default Admin Credentials:</p>
            <p className="text-xs text-gray-500">Email: admin@calculatorhub.com</p>
            <p className="text-xs text-gray-500">Password: admin123</p>
          </div>

          <div className="text-center">
            <a href="/admin/login" className="text-purple-400 hover:text-purple-300 text-sm">
              Go to Login Page →
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
