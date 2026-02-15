import bcrypt from "bcryptjs"

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10
  return await bcrypt.hash(password, saltRounds)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash)
}

// Utility function to generate hash for admin123
export async function generateAdminHash() {
  const hash = await hashPassword("admin123")
  console.log("Hash for admin123:", hash)
  return hash
}
