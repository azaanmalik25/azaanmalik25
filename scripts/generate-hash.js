const bcrypt = require("bcryptjs")

async function generateHash() {
  try {
    const password = "admin123"
    const saltRounds = 10
    const hash = await bcrypt.hash(password, saltRounds)

    console.log("Password:", password)
    console.log("Generated hash:", hash)

    // Test the hash
    const isValid = await bcrypt.compare(password, hash)
    console.log("Hash verification:", isValid)

    return hash
  } catch (error) {
    console.error("Error generating hash:", error)
  }
}

generateHash()
