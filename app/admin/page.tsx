"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, BookOpen, Users, FileText } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState({
    events: 0,
    resources: 0,
    boardMembers: 0,
  })

  useEffect(() => {
    // Fetch counts from API
    async function fetchStats() {
      try {
        const [eventsRes, resourcesRes, boardRes] = await Promise.all([
          fetch("/api/admin/events"),
          fetch("/api/admin/resources"),
          fetch("/api/admin/board-members"),
        ])

        const [events, resources, boardMembers] = await Promise.all([
          eventsRes.json(),
          resourcesRes.json(),
          boardRes.json(),
        ])

        setStats({
          events: events.length || 0,
          resources: resources.length || 0,
          boardMembers: boardMembers.length || 0,
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
      }
    }

    fetchStats()
  }, [])

  const cards = [
    { title: "Total Events", value: stats.events, icon: Calendar, href: "/admin/events" },
    { title: "Resources", value: stats.resources, icon: BookOpen, href: "/admin/resources" },
    { title: "Board Members", value: stats.boardMembers, icon: Users, href: "/admin/board-members" },
    { title: "About Section", value: "Edit", icon: FileText, href: "/admin/about" },
  ]

  return (
    <div>
      <h1 className="text-3xl font-black text-navy mb-8" style={{ fontFamily: "var(--font-montserrat)" }}>
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <Card
              key={card.title}
              className="cursor-pointer hover:border-maize transition-colors border-2"
              onClick={() => router.push(card.href)}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-maize" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-navy">
                  {card.value}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
