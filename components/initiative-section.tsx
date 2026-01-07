"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Heart, Lightbulb, Target } from "lucide-react"
import { gsap } from "@/lib/gsap-plugins"

export function InitiativeSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
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

      // Content fade-in
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 75%",
        },
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })

      // Cards fade-in
      gsap.from(cardsRef.current?.children || [], {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 75%",
        },
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const features = [
    {
      icon: Lightbulb,
      title: "Theory-Driven Education",
      description: "Evidence-based behavior change strategies grounded in kinesiology research",
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Connect with mentors and peers in a welcoming, judgment-free environment",
    },
    {
      icon: Heart,
      title: "1-on-1 Coaching",
      description: "Personalized training with certified student coaches and structured programming",
    },
    {
      icon: Target,
      title: "Sustainable Habits",
      description: "Build confidence and develop lifelong fitness skills at your own pace",
    },
  ]

  return (
    <section id="initiative" ref={sectionRef} className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-2 bg-maize/20 rounded-full">
              <p className="text-sm font-bold text-navy">New Initiative</p>
            </div>
            <h2
              ref={titleRef}
              className="text-4xl md:text-5xl font-black text-navy mb-4"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              FITNESS ACCESS & EMPOWERMENT
            </h2>
            <div className="h-1 w-24 bg-maize mx-auto mb-6" />
          </div>

          {/* Main Content */}
          <div ref={contentRef} className="mb-12">
            <Card className="border-2 border-maize/20">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="bg-maize/10 p-6 rounded-lg border-l-4 border-maize">
                    <p className="text-lg font-semibold text-navy mb-2">
                      We're excited to announce our new semester-long program, supported by $5,000 in funding from the School of Kinesiology!
                    </p>
                  </div>

                  <p className="text-lg text-foreground/80 leading-relaxed">
                    The Fitness Access & Empowerment Initiative (FAE) is designed to support beginner and underrepresented students who want to get into the gym but face barriers such as intimidation, lack of knowledge, or limited access.
                  </p>

                  <p className="text-lg text-foreground/80 leading-relaxed">
                    Our goal is to help students build confidence, learn proper technique, and develop sustainable fitness habits in a supportive, inclusive environment.
                  </p>

                  <div className="bg-navy/5 p-6 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">In Partnership With School of Kinesiology Faculty:</p>
                    <p className="text-base font-medium text-navy">
                      <br />
                      • Laura Richardson, PhD
                      <br />
                      • Michele Bird, PhD
                      <br />
                      • Angela Fong, PhD
                      <br />
                      • Andrew Pearson, PhD
                      <br />
                      • Celina Furman, PhD
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Features Grid */}
          <div ref={cardsRef} className="grid md:grid-cols-2 gap-6 mb-12">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="border-2 hover:border-maize transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-maize/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-maize" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-navy mb-2">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Card className="bg-navy text-white border-0">
              <CardContent className="p-8">
                <h3 className="text-2xl font-black text-maize mb-4" style={{ fontFamily: "var(--font-montserrat)" }}>
                  Get Involved
                </h3>
                <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                  Interested in becoming a certified trainer, joining our coaching team, or participating in the program?
                  Let us know by filling out our interest form.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="bg-maize text-navy hover:bg-maize/90 font-bold"
                  >
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLSfSRmyAFJpEio9WEzlxKLI5YDycqgoH0xv3otATyCJ8YU5wiQ/viewform?usp=header"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Interest Form
                    </a>
                  </Button>
                  {/* <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-maize text-maize hover:bg-maize hover:text-navy"
                  >
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLSfIKfKeQRouIv1nNoJIYo_mgvLlcgEr94-s5V4Fm2mjmsJyfg/viewform?usp=header"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Thoughts on new name?
                    </a>
                  </Button> */}
                </div>
                <p className="text-sm text-white/60 mt-4">
                  Launching Winter 2026 • No commitment required
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
