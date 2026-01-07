import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { InitiativeSection } from "@/components/initiative-section"
import { EventsSection } from "@/components/events-section"
import { ExecutiveBoardSection } from "@/components/executive-board-section"
import { ResourcesSection } from "@/components/resources-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { ScrollProgress } from "@/components/scroll-progress"

export default function Home() {
  return (
    <main className="min-h-screen">
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <InitiativeSection />
      <EventsSection />
      <ExecutiveBoardSection />
      <ResourcesSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
