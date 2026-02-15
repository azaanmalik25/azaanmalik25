import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    // Test database connection
    const { data, error } = await supabase.from("admin_users").select("email, name").limit(1)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      data: data,
    })
  } catch (error) {
    console.error("Database test error:", error)
    return NextResponse.json({ error: "Database connection failed" }, { status: 500 })
  }
}
