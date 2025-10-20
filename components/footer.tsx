import { Instagram, Facebook, Twitter, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-navy text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-maize mb-4" style={{ fontFamily: "var(--font-bebas)" }}>
              UMBC
            </h3>
            <p className="text-white/80 leading-relaxed">
              Building strength, discipline, and community at the University of Michigan since 2025.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-maize mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-white/80 hover:text-maize transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#events" className="text-white/80 hover:text-maize transition-colors">
                  Events
                </a>
              </li>
              <li>
                <a href="#board" className="text-white/80 hover:text-maize transition-colors">
                  Executive Board
                </a>
              </li>
              <li>
                <a href="#resources" className="text-white/80 hover:text-maize transition-colors">
                  Resources
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-maize mb-4">Connect With Us</h4>
            <div className="flex gap-4 mb-4">
              <a
                href="#"
                className="w-10 h-10 bg-maize/10 rounded-full flex items-center justify-center hover:bg-maize hover:text-navy transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-maize/10 rounded-full flex items-center justify-center hover:bg-maize hover:text-navy transition-all duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-maize/10 rounded-full flex items-center justify-center hover:bg-maize hover:text-navy transition-all duration-300"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="mailto:michigan-bodybuilding-club@umich.edu"
                className="w-10 h-10 bg-maize/10 rounded-full flex items-center justify-center hover:bg-maize hover:text-navy transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center text-white/60 text-sm">
          <p>© 2025 University of Michigan Bodybuilding Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
