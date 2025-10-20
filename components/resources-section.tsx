"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Dumbbell, Apple, BookOpen } from "lucide-react"
import { gsap, SplitText } from "@/lib/gsap-plugins"

const resources = [
  {
    title: "Intro to Bodybuilding",
    description: "Complete beginner's guide to training, nutrition, and competition prep. Covers the fundamentals of muscle building and posing.",
    icon: Dumbbell,
    link: "/jacob-zoller-slide-deck.pdf",
    embedContent: "Learn the basics of bodybuilding including proper form, training splits, and competition categories.",
  },
  {
    title: "Nutrition Guide",
    description: "Comprehensive meal plans and macro calculations for muscle building. Includes cutting and bulking strategies.",
    icon: Apple,
    link: "https://example.com/nutrition-guide.pdf",
    embedContent: "Master your nutrition with detailed meal plans, macro tracking, and supplement recommendations.",
  },
  {
    title: "Training Programs",
    description: "Structured workout routines for all experience levels and goals. From beginner to advanced programs.",
    icon: FileText,
    link: "https://example.com/training-programs.pdf",
    embedContent: "Access proven training programs including push/pull/legs, upper/lower, and competition prep routines.",
  },
  {
    title: "Competition Handbook",
    description: "Everything you need to know about competing in bodybuilding shows. Peak week strategies included.",
    icon: BookOpen,
    link: "https://example.com/competition-handbook.pdf",
    embedContent: "Complete guide to bodybuilding competitions including posing, tanning, and mental preparation.",
  },
  {
    title: "Supplement Stack Guide",
    description: "Evidence-based supplement recommendations for muscle growth, recovery, and performance enhancement.",
    icon: Dumbbell,
    link: "https://example.com/supplement-guide.pdf",
    embedContent: "Discover the most effective supplements for bodybuilding and how to use them safely.",
  },
  {
    title: "Posing Tutorial",
    description: "Step-by-step guide to mandatory poses and stage presentation for competitions.",
    icon: BookOpen,
    link: "https://example.com/posing-tutorial.pdf",
    embedContent: "Master the art of posing with detailed instructions for all mandatory poses and transitions.",
  },
]

export function ResourcesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        const split = new SplitText(titleRef.current, { type: "chars" })
        gsap.from(split.chars, {
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
          opacity: 0,
          y: 50,
          rotation: 10,
          stagger: 0.03,
          duration: 0.8,
          ease: "back.out(1.7)",
        })
      }

      gsap.fromTo(cardsRef.current?.children || [],
        {
          scale: 0.8,
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 75%",
          },
          scale: 1,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "back.out(1.7)",
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

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
            Resources provided graciously by Jacob Zoller!
          </p>
        </div>
        <div ref={cardsRef} className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4" style={{ scrollbarWidth: "none" }}>
          {resources.map((resource, index) => {
            const Icon = resource.icon
            return (
              <Card
                key={index}
                className="resource-card group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-2 hover:border-maize cursor-pointer min-w-[320px] snap-center flex-shrink-0"
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-maize/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-maize group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-8 h-8 text-maize group-hover:text-navy transition-colors" />
                  </div>
                  <CardTitle className="text-xl text-navy group-hover:text-maize transition-colors">
                    {resource.title}
                  </CardTitle>
                  <CardDescription className="leading-relaxed mb-3">{resource.description}</CardDescription>
                  <div className="bg-muted/50 p-3 rounded-md border-l-4 border-maize">
                    <p className="text-sm text-navy font-medium">{resource.embedContent}</p>
                  </div>
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
          })}
        </div>
      </div>
    </section>
  )
}
