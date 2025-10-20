"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin, ChevronLeft, ChevronRight } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"

gsap.registerPlugin(ScrollTrigger)

const events = [
  {
    title: "Spring Classic Competition",
    date: "March 15, 2025",
    location: "CCRB Arena",
    description: "Annual bodybuilding competition featuring multiple categories for all experience levels.",
    image: "/bodybuilder.png",
  },
  {
    title: "Nutrition Workshop",
    date: "March 22, 2025",
    location: "Michigan Union",
    description: "Learn about meal planning, macros, and supplements from certified nutritionists.",
    image: "/bodybuilder.png",
  },
  {
    title: "Powerlifting Meet",
    date: "April 5, 2025",
    location: "IM Sports Building",
    description: "Test your strength in squat, bench press, and deadlift. All levels welcome.",
    image: "/bodybuilder.png",
  },
  {
    title: "Guest Speaker Series",
    date: "April 18, 2025",
    location: "Rackham Auditorium",
    description: "Hear from professional bodybuilders and fitness industry leaders.",
    image: "/bodybuilder.png",
  },
  {
    title: "Summer Shred Challenge",
    date: "May 10, 2025",
    location: "Recreation Center",
    description: "8-week transformation challenge with prizes for most improved physique.",
    image: "/bodybuilder.png",
  },
  {
    title: "Posing Workshop",
    date: "May 25, 2025",
    location: "Dance Studio 3",
    description: "Learn mandatory poses and stage presentation from competition veterans.",
    image: "/bodybuilder.png",
  },
  {
    title: "Mr. & Ms. UMBC Finals",
    date: "June 8, 2025",
    location: "Event Center",
    description: "The biggest bodybuilding competition of the year featuring cash prizes.",
    image: "/bodybuilder.png",
  },
  {
    title: "Supplement Science Seminar",
    date: "June 20, 2025",
    location: "Lecture Hall B",
    description: "Evidence-based approach to supplementation for muscle growth and recovery.",
    image: "/bodybuilder.png",
  },
  {
    title: "Beach Muscle Expo",
    date: "July 15, 2025",
    location: "Waterfront Park",
    description: "Outdoor fitness expo featuring vendor booths, demos, and meet & greets.",
    image: "/bodybuilder.png",
  },
  {
    title: "Fall Prep Bootcamp",
    date: "August 5, 2025",
    location: "Fitness Center",
    description: "Intensive 4-week program to prepare for upcoming competition season.",
    image: "/bodybuilder.png",
  },
]

export function EventsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
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
        gsap.fromTo(cards,
          {
            scale: 0.8,
            opacity: 0,
          },
          {
            scrollTrigger: {
              trigger: scrollContainerRef.current,
              start: "top 75%",
            },
            scale: 1,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: "back.out(1.7)",
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

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
            {events.map((event, index) => (
              <Card
                key={index}
                className="min-w-[300px] md:min-w-[350px] snap-center overflow-hidden group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-2 hover:border-maize flex-shrink-0"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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
                      <span>{event.date}</span>
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
            ))}
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
