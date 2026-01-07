"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap-plugins"
import { AboutContent, AboutImage } from "@/types/database"

export function AboutSection() {
  const [paragraphs, setParagraphs] = useState<AboutContent[]>([])
  const [stats, setStats] = useState<AboutContent[]>([])
  const [images, setImages] = useState<AboutImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const paragraphsRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchAboutData() {
      try {
        const response = await fetch("/api/public/about")
        const data = await response.json()

        // Filter content by type
        const paragraphContent = data.content.filter((item: AboutContent) => item.section_type === "paragraph")
        const statContent = data.content.filter((item: AboutContent) => item.section_type === "stat")

        setParagraphs(paragraphContent)
        setStats(statContent)
        setImages(data.images)
      } catch (error) {
        console.error("Error fetching about data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAboutData()
  }, [])

  useEffect(() => {
    if (isLoading) return

    const ctx = gsap.context(() => {
      // Title fade-in
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        },
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })

      // Paragraphs fade
      gsap.from(paragraphsRef.current?.children || [], {
        scrollTrigger: {
          trigger: paragraphsRef.current,
          start: "top 75%",
        },
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
      })

      // Stats counter animation
      gsap.from(statsRef.current?.querySelectorAll(".stat-number") || [], {
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
        },
        textContent: 0,
        duration: 2,
        ease: "power1.inOut",
        snap: { textContent: 1 },
        stagger: 0.1,
      })

      // Images fade-in
      gsap.from(imagesRef.current?.querySelectorAll("img") || [], {
        scrollTrigger: {
          trigger: imagesRef.current,
          start: "top 80%",
        },
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [isLoading, paragraphs, stats, images])

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block">
              <h2
                ref={titleRef}
                className="text-4xl md:text-5xl font-black text-navy mb-2"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                ABOUT US
              </h2>
              <div className="h-1 w-24 bg-maize" />
            </div>
            <div ref={paragraphsRef} className="space-y-4">
              {isLoading ? (
                <p className="text-muted-foreground">Loading...</p>
              ) : paragraphs.length === 0 ? (
                <p className="text-muted-foreground">No content available</p>
              ) : (
                paragraphs.map((paragraph) => (
                  <p key={paragraph.id} className="text-lg text-foreground/80 leading-relaxed">
                    {paragraph.content}
                  </p>
                ))
              )}
            </div>
            <div ref={statsRef} className="grid grid-cols-3 gap-4 pt-4">
              {isLoading ? (
                <div className="col-span-full text-center">
                  <p className="text-muted-foreground">Loading stats...</p>
                </div>
              ) : stats.length === 0 ? (
                <div className="col-span-full text-center">
                  <p className="text-muted-foreground">No stats available</p>
                </div>
              ) : (
                stats.map((stat) => (
                  <div key={stat.id} className="text-center">
                    <div
                      className="stat-number text-4xl font-black text-maize"
                      style={{ fontFamily: "var(--font-montserrat)" }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div ref={imagesRef} className="grid grid-cols-2 gap-4">
            {isLoading ? (
              <div className="col-span-2 text-center py-12">
                <p className="text-muted-foreground">Loading images...</p>
              </div>
            ) : images.length === 0 ? (
              <div className="col-span-2 text-center py-12">
                <p className="text-muted-foreground">No images available</p>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {images
                    .filter((_, index) => index % 2 === 0)
                    .map((image, index) => (
                      <img
                        key={image.id}
                        src={image.image_url}
                        alt={image.alt_text || "About image"}
                        className={`w-full object-cover rounded-lg shadow-lg ${index === 0 ? "h-64" : "h-48"}`}
                      />
                    ))}
                </div>
                <div className="space-y-4 pt-8">
                  {images
                    .filter((_, index) => index % 2 === 1)
                    .map((image, index) => (
                      <img
                        key={image.id}
                        src={image.image_url}
                        alt={image.alt_text || "About image"}
                        className={`w-full object-cover rounded-lg shadow-lg ${index === 1 ? "h-64" : "h-48"}`}
                      />
                    ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
