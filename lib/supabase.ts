import { createClient } from "@supabase/supabase-js"

// Public client (uses anon key, respects RLS)
// Use this for public read operations
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Admin client (uses service role key, bypasses RLS)
// ONLY use in API routes, never expose to client
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
