"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Dumbbell, Apple, BookOpen, LucideIcon } from "lucide-react"
import { gsap } from "@/lib/gsap-plugins"
import { Resource } from "@/types/database"

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  FileText,
  Dumbbell,
  Apple,
  BookOpen,
}

export function ResourcesSection() {
  const [resources, setResources] = useState<Resource[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchResources() {
      try {
        const response = await fetch("/api/public/resources")
        const data = await response.json()
        setResources(data)
      } catch (error) {
        console.error("Error fetching resources:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchResources()
  }, [])

  useEffect(() => {
    if (resources.length === 0) return

    const ctx = gsap.context(() => {
      // Title fade-in
      gsap.from(titleRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })

      // Cards fade-in
      gsap.fromTo(
        cardsRef.current?.children || [],
        {
          opacity: 0,
        },
        {
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
          clearProps: "opacity",
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [resources])

  return (
    <section id="resources" ref={sectionRef} className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-black text-navy mb-4"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            RESOURCES
          </h2>
          <div className="h-1 w-24 bg-maize mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">
            Shoutout Jacob Zoller for getting us started with resources!
          </p>
        </div>
        <div ref={cardsRef} className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4" style={{ scrollbarWidth: "none" }}>
          {isLoading ? (
            <div className="w-full text-center py-12">
              <p className="text-muted-foreground">Loading resources...</p>
            </div>
          ) : resources.length === 0 ? (
            <div className="w-full text-center py-12">
              <p className="text-muted-foreground">No resources found</p>
            </div>
          ) : (
            resources.map((resource) => {
              const Icon = iconMap[resource.icon] || FileText
              return (
                <Card
                  key={resource.id}
                  className="resource-card group transition-all duration-300 border-2 hover:border-maize cursor-pointer min-w-[320px] snap-center flex-shrink-0"
                >
                  <CardHeader>
                    <div className="w-16 h-16 bg-maize/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-maize transition-all duration-300">
                      <Icon className="w-8 h-8 text-maize group-hover:text-navy transition-colors" />
                    </div>
                    <CardTitle className="text-xl text-navy group-hover:text-maize transition-colors">
                      {resource.title}
                    </CardTitle>
                    <CardDescription className="leading-relaxed mb-3">{resource.description}</CardDescription>
                    {resource.embed_content && (
                      <div className="bg-muted/50 p-3 rounded-md border-l-4 border-maize">
                        <p className="text-sm text-navy font-medium">{resource.embed_content}</p>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    <a
                      href={resource.link}
                      className="text-sm font-medium text-maize hover:text-maize-glow flex items-center gap-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {resource.title === "Intro to Bodybuilding" ? "Download Intro To Bodybuilding (PDF)" : "Download PDF"}
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}
