import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // For demo purposes, check hardcoded credentials first
    if (email === "admin@calculatorhub.com" && password === "admin123") {
      const demoUser = {
        id: "demo-admin-1",
        email: "admin@calculatorhub.com",
        name: "Admin User",
        avatar_url: null,
        created_at: new Date().toISOString(),
      }

      return NextResponse.json({
        success: true,
        user: demoUser,
        mode: "demo",
      })
    }

    // Try database authentication only if we have proper environment variables
    const hasSupabaseConfig =
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

    if (hasSupabaseConfig) {
      try {
        const supabase = createServerClient()

        const { data: user, error: userError } = await supabase
          .from("admin_users")
          .select("*")
          .eq("email", email)
          .single()

        if (!userError && user) {
          // Verify password
          const isValidPassword = await bcrypt.compare(password, user.password_hash)
          if (isValidPassword) {
            // Return user data (without password hash)
            const { password_hash, ...userWithoutPassword } = user

            return NextResponse.json({
              success: true,
              user: userWithoutPassword,
              mode: "database",
            })
          }
        }
      } catch (dbError) {
        console.log("Database authentication failed, falling back to demo mode")
      }
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
