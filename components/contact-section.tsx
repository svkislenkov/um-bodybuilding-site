"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Mail, User, MessageSquare } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

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

      // Form fade
      gsap.from(formRef.current, {
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 75%",
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

      // Form inputs stagger animation
      gsap.from(formRef.current?.querySelectorAll("input, textarea, button") || [], {
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 70%",
        },
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <section id="contact" ref={sectionRef} className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-navy mb-4"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            GET IN TOUCH
          </h2>
          <div className="h-1 w-24 bg-maize mx-auto" />
        </div>
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <Card ref={formRef} className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl text-navy">Send us a message</CardTitle>
              <CardDescription>Have questions? Want to join? We'd love to hear from you.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <User className="w-4 h-4 text-maize" />
                    Name
                  </label>
                  <Input
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="border-2 focus:border-maize"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4 text-maize" />
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="your.email@umich.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="border-2 focus:border-maize"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-maize" />
                    Message
                  </label>
                  <Textarea
                    placeholder="Tell us about yourself and your fitness goals..."
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="border-2 focus:border-maize resize-none"
                  />
                </div>
                
                {/* <div className="flex justify-center">
                  <Button type="submit" className="bg-maize text-navy hover:bg-maize-glow font-bold text-lg py-6 px-12">
                    Join Now
                  </Button>
                </div> */}
              </form>
            </CardContent>
          </Card>

          <div ref={infoRef} className="space-y-8">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-xl text-navy">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-navy mb-2">General Inquiries</h4>
                  <a href="mailto:michigan-bodybuilding-club@umich.edu" className="text-maize hover:text-maize-glow">
                    michigan-bodybuilding-club@umich.edu
                  </a>
                </div>
                <div>
                  <h4 className="font-semibold text-navy mb-2">President</h4>
                  <p className="text-foreground/80">Jaden Shin</p>
                  <a href="mailto:shinja@umich.edu" className="text-maize hover:text-maize-glow">
                    shinja@umich.edu
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 overflow-hidden">
              <div className="h-64 bg-muted">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2951.5647419524845!2d-83.73804!3d42.27806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x883cae3f5b3d3b3b%3A0x3b3b3b3b3b3b3b3b!2sUniversity%20of%20Michigan!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="University of Michigan Location"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
