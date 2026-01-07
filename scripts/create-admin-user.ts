import { createClient } from "@supabase/supabase-js"
import { hash } from "bcryptjs"
import * as dotenv from "dotenv"
import * as readline from "readline"

dotenv.config({ path: ".env.local" })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function question(query: string): Promise<string> {
  return new Promise((resolve) => rl.question(query, resolve))
}

async function createAdminUser() {
  console.log("\n=== Create Admin User ===\n")

  const email = await question("Email: ")
  const password = await question("Password: ")
  const name = await question("Name (optional): ")

  console.log("\nHashing password...")
  const passwordHash = await hash(password, 12)

  console.log("Creating admin user...")
  const { data, error } = await supabase
    .from("admin_users")
    .insert([
      {
        email,
        password_hash: passwordHash,
        name: name || null,
      },
    ])
    .select()
    .single()

  if (error) {
    console.error("\n❌ Error creating admin user:", error.message)
  } else {
    console.log("\n✅ Admin user created successfully!")
    console.log("Email:", email)
    console.log("\nYou can now login at http://localhost:3000/admin/login")
  }

  rl.close()
}

createAdminUser()
