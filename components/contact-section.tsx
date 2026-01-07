"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title fade
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        },
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })

      // Info fade
      gsap.from(infoRef.current, {
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 75%",
        },
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-black text-navy mb-4"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            CONTACT
          </h2>
          <div className="h-1 w-24 bg-maize mx-auto" />
        </div>
        <div ref={infoRef} className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-xl text-navy">Join Us!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              
              <div>
                <h4 className="font-semibold text-navy mb-2">President</h4>
                <p className="text-foreground/80">Jaden Shin</p>
                <a href="mailto:shinja@umich.edu" className="text-maize hover:text-maize-glow">
                  shinja@umich.edu
                </a>
              </div>
              <div>
                <h4 className="font-semibold text-navy mb-2">Vice President</h4>
                <p className="text-foreground/80">Jimmy Xiao</p>
                <a href="mailto:jimaroni@umich.edu" className="text-maize hover:text-maize-glow">
                  jimaroni@umich.edu
                </a>
              </div>
              {/* <div>
                <h4 className="font-semibold text-navy mb-2">General Inquiries</h4>
                <a href="mailto:michigan-bodybuilding-club@umich.edu" className="text-maize hover:text-maize-glow">
                  michigan-bodybuilding-club@umich.edu
                </a>
              </div> */}
              <div>
                {/* <h4 className="font-semibold text-navy mb-2">Interested in Joining?</h4> */}
                <Button asChild className="bg-maize text-navy hover:bg-maize-glow font-bold">
                  <a
                    href="https://forms.gle/sCn1pztzDuCqMHHs9"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Fill Out Our Interest Form
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 overflow-hidden">
            <div className="h-full min-h-[400px] bg-muted">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4051.361175777532!2d-83.74165391127146!3d42.27776624557158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x883cae42cb918fe7%3A0xa0570e3f02f2ac4!2sUniversity%20of%20Michigan%20School%20of%20Kinesiology!5e1!3m2!1sen!2sus!4v1767816118126!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade">
              title=UMICH Kines Building
              </iframe>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
