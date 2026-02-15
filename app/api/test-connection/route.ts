import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function GET() {
  try {
    // Check if we have the required environment variables
    const hasSupabaseUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL
    const hasSupabaseKey = !!(process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

    if (!hasSupabaseUrl || !hasSupabaseKey) {
      return NextResponse.json({
        success: false,
        error: "Missing Supabase environment variables",
        details: {
          hasUrl: hasSupabaseUrl,
          hasKey: hasSupabaseKey,
          mode: "demo",
        },
      })
    }

    const supabase = createServerClient()

    // Test the connection by trying to fetch from a system table
    const { data, error } = await supabase.from("admin_users").select("count").limit(1)

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
        mode: "database",
      })
    }

    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      mode: "database",
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      mode: "error",
    })
  }
}
