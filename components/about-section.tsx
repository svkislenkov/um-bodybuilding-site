"use client"

import { useEffect, useRef } from "react"
import { gsap, SplitText } from "@/lib/gsap-plugins"

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const paragraphsRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation with split text
      if (titleRef.current) {
        const split = new SplitText(titleRef.current, { type: "chars" })
        gsap.from(split.chars, {
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
          opacity: 0,
          x: -50,
          stagger: 0.05,
          duration: 0.8,
          ease: "power3.out",
        })
      }

      // Paragraphs fade and slide
      gsap.from(paragraphsRef.current?.children || [], {
        scrollTrigger: {
          trigger: paragraphsRef.current,
          start: "top 75%",
        },
        opacity: 0,
        y: 50,
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

      gsap.from(imagesRef.current?.querySelectorAll("img") || [], {
        scrollTrigger: {
          trigger: imagesRef.current,
          start: "top 80%",
        },
        scale: 0.8,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
      })

      gsap.to(imagesRef.current?.querySelectorAll("img") || [], {
        scrollTrigger: {
          trigger: imagesRef.current,
          start: "top 80%",
        },
        scale: 1.05,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

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
              <p className="text-lg text-foreground/80 leading-relaxed">
                The University of Michigan Bodybuilding Club is dedicated to fostering a community of athletes committed
                to excellence in strength training, nutrition, and personal development.
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Founded in 2025, we bring together students passionate about bodybuilding, powerlifting, and fitness.
                Whether you're a seasoned competitor or just starting your fitness journey, our club provides the
                resources, mentorship, and support you need to achieve your goals.
              </p>
            </div>
            <div ref={statsRef} className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <div
                  className="stat-number text-4xl font-black text-maize"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  150
                </div>
                <div className="text-sm text-muted-foreground">Members</div>
              </div>
              <div className="text-center">
                <div
                  className="stat-number text-4xl font-black text-maize"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  20
                </div>
                <div className="text-sm text-muted-foreground">Events/Year</div>
              </div>
              <div className="text-center">
                <div
                  className="stat-number text-4xl font-black text-maize"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  5
                </div>
                <div className="text-sm text-muted-foreground">Competitions</div>
              </div>
            </div>
          </div>
          <div ref={imagesRef} className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                src="/bodybuilder.png"
                alt="Training"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
              <img
                src="bodybuilder.png"
                alt="Equipment"
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-4 pt-8">
              <img
                src="bodybuilder.png"
                alt="Competition"
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
              <img
                src="bodybuilder.png"
                alt="Team"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
