"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { gsap, SplitText } from "@/lib/gsap-plugins"
import { BoardMember } from "@/types/database"

gsap.registerPlugin()

export function ExecutiveBoardSection() {
  const [boardMembers, setBoardMembers] = useState<BoardMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    async function fetchBoardMembers() {
      try {
        const response = await fetch("/api/public/board-members")
        const data = await response.json()
        setBoardMembers(data)
      } catch (error) {
        console.error("Error fetching board members:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBoardMembers()
  }, [])

  useEffect(() => {
    if (boardMembers.length === 0) return

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        const split = new SplitText(titleRef.current, { type: "words" })
        gsap.from(split.words, {
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

      gsap.from(cardsRef.current?.children || [], {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 75%",
        },
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [boardMembers])

  return (
    <section id="board" ref={sectionRef} className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-black text-navy mb-4"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            EXECUTIVE BOARD
          </h2>
          <div className="h-1 w-24 bg-maize mx-auto" />
        </div>
        <div ref={cardsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 max-w-6xl mx-auto">
          {isLoading ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">Loading board members...</p>
            </div>
          ) : boardMembers.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No board members found</p>
            </div>
          ) : (
            boardMembers.map((member, index) => (
              <Card
                key={member.id}
                className="board-card overflow-hidden group transition-all duration-300 border-2 hover:border-maize"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={member.image_url || "/bodybuilder.png"}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500"
                  />
                  <div
                    className={`absolute inset-0 bg-navy/95 transition-opacity duration-300 ${hoveredIndex === index ? "opacity-100" : "opacity-0"}`}
                  >
                    <div className="h-full flex flex-col justify-center p-6 text-white">
                      <p className="text-sm leading-relaxed mb-4">{member.bio || ""}</p>
                      {member.email && (
                        <a href={`mailto:${member.email}`} className="text-maize hover:text-maize-glow text-sm font-medium">
                          {member.email}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <CardContent className="p-6 text-center bg-navy text-white">
                  <h3 className="text-xl font-black mb-1 text-maize" style={{ fontFamily: "var(--font-montserrat)" }}>
                    {member.name}
                  </h3>
                  <p className="text-sm text-white/80">{member.title}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
