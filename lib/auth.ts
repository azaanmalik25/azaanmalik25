export interface AdminUser {
  id: string
  email: string
  name: string
  avatar_url?: string
  created_at: string
}

export async function signInAdmin(email: string, password: string) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || "Login failed")
  }

  if (data.user) {
    // Store user session in localStorage
    localStorage.setItem("admin_user", JSON.stringify(data.user))
    localStorage.setItem("admin_mode", data.mode || "demo")
  }

  return data
}

// Add the missing getCurrentAdmin function
export function getCurrentAdmin(): AdminUser | null {
  if (typeof window === "undefined") return null

  const userStr = localStorage.getItem("admin_user")
  return userStr ? JSON.parse(userStr) : null
}

export function getCurrentUser() {
  return getCurrentAdmin()
}

export function getLoginMode() {
  if (typeof window === "undefined") return "demo"

  return localStorage.getItem("admin_mode") || "demo"
}

// Add the missing signOutAdmin function
export function signOutAdmin() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("admin_user")
    localStorage.removeItem("admin_mode")
  }
}

export function signOut() {
  signOutAdmin()
}

export function isAuthenticated() {
  return getCurrentAdmin() !== null
}
