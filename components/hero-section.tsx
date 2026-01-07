"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap-plugins"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.from(titleRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    })

    gsap.from(subtitleRef.current, {
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: "power3.out",
    })

    gsap.from(buttonsRef.current?.children || [], {
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      delay: 0.8,
      ease: "power3.out",
    })

  }, [])

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div ref={bgRef} className="absolute inset-0 bg-gradient-to-b from-[#00274C] via-[#003366] to-[#00274C]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.2)_100%)]" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight leading-tight text-balance text-maize"
          style={{ fontFamily: "var(--font-montserrat)", fontWeight: 900 }}
        >
          UNIVERSITY OF MICHIGAN BODYBUILDING CLUB
        </h1>
        <p ref={subtitleRef} className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
          Building strength, discipline, and community since 2025
        </p>
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-maize text-maize hover:bg-maize hover:text-navy font-bold text-lg px-8 py-6 bg-transparent"
          >
            Upcoming Events
          </Button>
        </div>
      </div>

    </section>
  )
}
