import React from "react";
import { Routes, Route, Link } from 'react-router-dom';
import Eboard from './Eboard.jsx';
import Contact from './Contact.jsx';
import Resources from './Resources.jsx';
import Events from './Events.jsx';

export function Home() {
  return (
    // Your existing Hero Banner content
    // Increased min-height to ensure the images don't look cut off.
    <section className="relative bg-[#00274C] text-[#FFCB05] min-h-[140vh] flex flex-col items-center justify-start text-center p-8 pt-20">
      
      {/* Top Text and Button Section */}
      <div className="max-w-4xl px-6 mb-12 flex-shrink-0">
        <h2 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
          University of Michigan Bodybuilding Club
        </h2>
        <p className="text-xl md:text-2xl mb-8 opacity-90 text-white">
          Founded Fall of 2025, the University of Michigan Bodybuilding Club is the premier club for anyone into or looking to get into the fitness world.
          If you have/plan to compete in a show, or are just really into the sport, then this club for you!
          Members of the club will get the opportunity to train with and learn from experienced bodybuilders, who have competed, in 1-on-1 training and nutrition sessions.
          If you are in a competition prep, we will help you every step of the way and help you to look your best when you hit the stage! Outside of competing,
          we will host annual group fitness expo trips and have guest speakers come to the university to train and host Q&A sessions. Come join us today!
        </p>
        
      </div>

      {/* 💡 NEW: Image Section at the bottom */}
      <div className="max-w-6xl w-full px-6 mt-auto">
        
        {/* Responsive Grid/Flex layout for side-by-side images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Image 1: bodybuilder1.png */}
          <div className="bg-white p-2 rounded-xl shadow-2xl border-b-4 border-[#FFCB05] overflow-hidden">
            <img 
              src="/bodybuilder.png" 
              alt="Male bodybuilder posing" 
              className="w-full h-80 object-cover rounded-lg transform hover:scale-[1.03] transition duration-500" 
            />
          </div>
        </div>
      </div>
      {/* End of Image Section */}

      <Link 
        to="/join"
        className="inline-block bg-[#FFCB05] text-[#00274C] font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-yellow-300 transition text-lg"
      >
        Join the Club Today
      </Link>

    </section>
  );
}

export default function App() {
  return (
    // Sets up the full-page gradient
    <div className="min-h-screen bg-gradient-to-b from-[#00274C] via-[#FFCB05] via-20% to-gray-50 text-gray-900">
      
      {/* 🎨 NEW: BIG YELLOW TITLE SECTION */}
      <div className="bg-[#00274C] py-8 border-b-4 border-[#FFCB05]">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#FFCB05] text-center tracking-wider px-4">
              UNIVERSITY OF MICHIGAN BODYBUILDING CLUB
          </h1>
      </div>
      
      {/* Navbar: Remains below the big title, now without the title link */}
      <header className="bg-[#800080] shadow-xl sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-end items-center">
          
          {/* Group for Nav Links (Far Right) */}
          <div className="flex items-center">
            
            {/* Desktop menu with Maize text and separators */}
            <nav className="flex gap-10 text-[#FFCB05] items-center text-lg">
              
              <Link to="/" className="hover:text-white transition-colors font-bold">
                Home
              </Link>
              
              <span className="text-[#FFCB05] opacity-50">|</span> 

              <Link to="/events" className="hover:text-white transition-colors">
                Events
              </Link>


              <span className="text-[#FFCB05] opacity-50">|</span> 
              
              <Link to="/eboard" className="hover:text-white transition-colors">
                E-Board
              </Link>
              
              
              
              <span className="text-[#FFCB05] opacity-50">|</span> 
              
              <Link to="/resources" className="hover:text-white transition-colors">
                Resources
              </Link>


              <span className="text-[#FFCB05] opacity-50">|</span> 
              
              <Link to="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>

              

            </nav>
          </div>
        </div>
      </header>

      {/* Define Routes here. */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/eboard" element={<Eboard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/events" element={<Events />} />
        
        {/* <Route path="/resources" element={<Resources />} /> */}
        {/* You'll add Routes for /events and /contact here too */}
      </Routes>

    </div>
  );
}