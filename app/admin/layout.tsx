"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import {
  Calendar,
  BookOpen,
  Users,
  FileText,
  LogOut,
  LayoutDashboard
} from "lucide-react"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/events", label: "Events", icon: Calendar },
  { href: "/admin/resources", label: "Resources", icon: BookOpen },
  { href: "/admin/board-members", label: "Board Members", icon: Users },
  { href: "/admin/about", label: "About Section", icon: FileText },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  if (pathname === "/admin/login") {
    return children
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!session) {
    router.push("/admin/login")
    return null
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-navy text-white p-6 flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-maize" style={{ fontFamily: "var(--font-montserrat)" }}>
            UM Strength Network
          </h1>
          <p className="text-sm text-white/60">Admin Dashboard</p>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-maize text-navy font-bold"
                    : "hover:bg-white/10"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <Separator className="my-4 bg-white/20" />

        <div className="space-y-2">
          <p className="text-sm text-white/60">Logged in as:</p>
          <p className="text-sm font-medium truncate">{session.user?.email}</p>
          <Button
            variant="outline"
            className="w-full border-white/20 text-white hover:bg-white/10"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-muted/30 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
