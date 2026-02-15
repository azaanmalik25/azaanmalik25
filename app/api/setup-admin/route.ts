import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    // Check if we have the required environment variables
    const hasSupabaseConfig =
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

    if (!hasSupabaseConfig) {
      return NextResponse.json(
        {
          error: "Supabase not configured. Using demo mode instead.",
          mode: "demo",
        },
        { status: 400 },
      )
    }

    const { email = "admin@calculatorhub.com", password = "admin123", name = "Admin User" } = await request.json()

    // Hash the password
    const saltRounds = 10
    const password_hash = await bcrypt.hash(password, saltRounds)

    const supabase = createServerClient()

    // Insert admin user
    const { data, error } = await supabase
      .from("admin_users")
      .upsert(
        {
          email,
          name,
          password_hash,
          avatar_url: null,
        },
        {
          onConflict: "email",
        },
      )
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Admin user created successfully",
      user: data?.[0] ? { ...data[0], password_hash: undefined } : null,
      mode: "database",
    })
  } catch (error) {
    console.error("Setup admin error:", error)
    return NextResponse.json({ error: "Failed to create admin user" }, { status: 500 })
  }
}
