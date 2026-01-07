"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { gsap } from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

gsap.registerPlugin(ScrollToPlugin)

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > window.innerHeight * 0.5
      setIsScrolled(scrolled)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (navRef.current) {
      gsap.to(navRef.current, {
        backgroundColor: isScrolled ? "rgba(255, 203, 5, 0.95)" : "rgba(0, 39, 76, 0)",
        duration: 0.5,
        ease: "power2.out",
      })
    }
  }, [isScrolled])

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      gsap.to(window, {
        duration: 0.2,
        scrollTo: { y: target, offsetY: 80 },
        ease: "power1.out",
      })
    }
    setIsMobileMenuOpen(false)
  }

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#initiative", label: "FAE Initiative" },
    { href: "#events", label: "Events" },
    { href: "#board", label: "Board" },
    { href: "#resources", label: "Resources" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <a
            href="#"
            className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${
              isScrolled ? "text-navy" : "text-maize"
            }`}
          >
            UMSN
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className={`font-medium transition-colors duration-200 ${
                  isScrolled ? "text-navy hover:text-navy-dark" : "text-white hover:text-maize"
                }`}
              >
                {link.label}
              </a>
            ))}
            {/* <Button
              className={`font-bold transition-all duration-300 ${
                isScrolled ? "bg-navy text-maize hover:bg-navy-dark" : "bg-maize text-navy hover:bg-maize-glow"
              }`}
            >
              Join Now
            </Button> */}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden transition-colors duration-300 ${isScrolled ? "text-navy" : "text-white"}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className={`block font-medium transition-colors duration-200 ${
                  isScrolled ? "text-navy hover:text-navy-dark" : "text-white hover:text-maize"
                }`}
              >
                {link.label}
              </a>
            ))}
            <Button className="w-full bg-maize text-navy hover:bg-maize-glow font-bold">Join Now</Button>
          </div>
        )}
      </div>
    </nav>
  )
}
