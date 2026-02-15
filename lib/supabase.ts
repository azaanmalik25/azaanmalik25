import { createClient } from "@supabase/supabase-js"

// Only use NEXT_PUBLIC_ prefixed variables on the client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Fallback values for development/demo
const defaultUrl = "https://demo.supabase.co"
const defaultKey = "demo-key"

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase environment variables not found, using demo mode")
}

export const supabase = createClient(supabaseUrl || defaultUrl, supabaseAnonKey || defaultKey)

// Server-side client (only use in API routes)
export const createServerClient = () => {
  const serverUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const serverKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  return createClient(serverUrl || defaultUrl, serverKey || defaultKey)
}
