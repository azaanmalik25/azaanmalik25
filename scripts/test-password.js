import bcrypt from "bcryptjs"

// Test password hashing
async function testPasswordHash() {
  const password = "admin123"

  // Generate hash
  const hash = await bcrypt.hash(password, 10)
  console.log('Generated hash for "admin123":', hash)

  // Test verification
  const isValid = await bcrypt.compare(password, hash)
  console.log("Password verification result:", isValid)

  // Test with the hash we're using in the database
  const dbHash = "$2b$10$K7L/8Y.f89AH.R6kuK.6.OKgq4ry2-ANhfPOv2QzCfHNdZjKj5jG."
  const isDbHashValid = await bcrypt.compare(password, dbHash)
  console.log("Database hash verification result:", isDbHashValid)
}

testPasswordHash()
