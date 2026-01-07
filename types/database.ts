// Database model types

export type Event = {
  id: string
  title: string
  date: string
  location: string
  description: string
  image_url?: string
  order_index: number
  created_at: string
  updated_at: string
}

export type Resource = {
  id: string
  title: string
  description: string
  icon: string
  link: string
  embed_content?: string
  order_index: number
  created_at: string
  updated_at: string
}

export type BoardMember = {
  id: string
  name: string
  title: string
  email?: string
  bio?: string
  image_url?: string
  order_index: number
  created_at: string
  updated_at: string
}

export type AboutContent = {
  id: string
  section_type: "paragraph" | "stat"
  content: string
  label?: string
  value?: number
  order_index: number
  created_at: string
  updated_at: string
}

export type AboutImage = {
  id: string
  image_url: string
  alt_text?: string
  order_index: number
  created_at: string
}

export type AdminUser = {
  id: string
  email: string
  password_hash: string
  name?: string
  created_at: string
  last_login?: string
}
