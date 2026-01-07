import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  const [contentResult, imagesResult] = await Promise.all([
    supabase.from("about_content").select("*").order("order_index", { ascending: true }),
    supabase.from("about_images").select("*").order("order_index", { ascending: true }),
  ])

  if (contentResult.error) {
    return NextResponse.json({ error: contentResult.error.message }, { status: 500 })
  }

  if (imagesResult.error) {
    return NextResponse.json({ error: imagesResult.error.message }, { status: 500 })
  }

  return NextResponse.json({
    content: contentResult.data,
    images: imagesResult.data,
  })
}

export const revalidate = 60 // Revalidate every 60 seconds
