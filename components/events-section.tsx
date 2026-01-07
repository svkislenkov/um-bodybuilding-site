"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin, ChevronLeft, ChevronRight } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Event } from "@/types/database"

gsap.registerPlugin(ScrollTrigger)

export function EventsSection() {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("/api/public/events")
        const data = await response.json()
        setEvents(data)
      } catch (error) {
        console.error("Error fetching events:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvents()
  }, [])

  useEffect(() => {
    if (events.length === 0) return

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        const words = titleRef.current.textContent?.split(" ") || []
        titleRef.current.innerHTML = words.map((word) => `<span class="inline-block">${word}</span>`).join(" ")

        gsap.from(titleRef.current.children, {
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
          y: 50,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
        })
      }

      const cards = scrollContainerRef.current?.children
      if (cards && cards.length > 0) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: scrollContainerRef.current,
            start: "top 75%",
          },
          opacity: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [events])

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current
    if (!container) return

    const scrollAmount = container.offsetWidth * 0.8
    gsap.to(container, {
      scrollLeft: direction === "left" ? container.scrollLeft - scrollAmount : container.scrollLeft + scrollAmount,
      duration: 0.8,
      ease: "power2.inOut",
    })
  }

  return (
    <section id="events" ref={sectionRef} className="py-24 bg-muted/30 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-black text-navy mb-4"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            UPCOMING EVENTS
          </h2>
          <div className="h-1 w-24 bg-maize mx-auto" />
        </div>

        <div className="relative">
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-maize text-navy hover:bg-maize-glow hidden md:flex"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 px-12"
            style={{ scrollbarWidth: "none" }}
          >
            {isLoading ? (
              <div className="w-full text-center py-12">
                <p className="text-muted-foreground">Loading events...</p>
              </div>
            ) : events.length === 0 ? (
              <div className="w-full text-center py-12">
                <p className="text-muted-foreground">No events found</p>
              </div>
            ) : (
              events.map((event) => (
                <Card
                  key={event.id}
                  className="min-w-[300px] md:min-w-[350px] snap-center overflow-hidden group transition-all duration-300 border-2 hover:border-maize flex-shrink-0"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image_url || "/bodybuilder.png"}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-navy group-hover:text-maize transition-colors">
                      {event.title}
                    </CardTitle>
                    <CardDescription className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-maize" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-maize" />
                        <span>{event.location}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-maize text-navy hover:bg-maize-glow hidden md:flex"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  )
}
