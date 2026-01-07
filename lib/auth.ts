import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
import { supabaseAdmin } from "@/lib/supabase"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Query admin_users table
        const { data: user, error } = await supabaseAdmin
          .from("admin_users")
          .select("*")
          .eq("email", credentials.email)
          .single()

        if (error || !user) {
          return null
        }

        // Verify password
        const isValidPassword = await compare(
          credentials.password,
          user.password_hash
        )

        if (!isValidPassword) {
          return null
        }

        // Update last login
        await supabaseAdmin
          .from("admin_users")
          .update({ last_login: new Date().toISOString() })
          .eq("id", user.id)

        return {
          id: user.id,
          email: user.email,
          name: user.name
        }
      }
    })
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    }
  }
}
