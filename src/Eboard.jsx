// src/Ebaord.jsx
import React from 'react';

export default function Eboard() {
  return (
    <div className="py-20 px-6 bg-white text-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-[#00274C]">Our Executive Board Fall 2025 💪</h2>
        <p className="text-lg mb-8">
          
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Person card 1 */}
          <div className="bg-[#FFCB05] p-6 rounded-lg shadow-lg text-[#00274C]">
            <h3 className="text-2xl font-semibold mb-2">Jaden Shin</h3>
            <p className="text-md">President of University of Michigan Bodybuilding </p>
          </div>
          
        </div>
        <p className="text-center mt-12 text-gray-700">
          Want to be featured? Get involved and show off your hard work!
        </p>
      </div>
    </div>
  );
}