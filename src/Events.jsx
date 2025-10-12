// src/Events.jsx (Updated)

import React from 'react';

export default function Events() {
    return (
        <div className="py-20 px-6 bg-gray-50 text-gray-900 min-h-screen">
            <div className="max-w-4xl mx-auto text-center">
                
                <h2 className="text-4xl font-black mb-10 text-[#00274C]">
                    Upcoming Events 📅
                </h2>
                
                {/* Image Section */}
                <div className="bg-white p-6 rounded-xl shadow-2xl mb-12 border-b-8 border-[#FFCB05]">
                    <img 
                        src="/willshow.png" 
                        alt="Bodybuilding Competition Stage" 
                        className="w-full h-auto max-h-96 object-cover rounded-lg mb-6 shadow-lg"
                    />
                    <h3 className="text-3xl font-semibold text-[#800080] mb-3">
                        Competition Preparation Starts Soon!
                    </h3>
                    <p className="text-lg text-gray-700">
                        Join our members as they prepare to hit the stage. Whether it's classic physique, bikini, or men's open, we provide full support, posing practice, and nutritional guidance.
                    </p>
                </div>

                {/* Event List Section */}
                <div className="text-left">
                    <h3 className="text-3xl font-bold mb-6 text-[#00274C]">
                        More Events to Come!
                    </h3>
                    
                    <ul className="space-y-4 text-xl">
                        <li className="p-4 bg-white rounded-lg shadow-md border-l-4 border-[#00274C]">
                            **1.** Bodybuilding Shows (Fall/Winter Season)
                        </li>
                        <li className="p-4 bg-white rounded-lg shadow-md border-l-4 border-[#00274C]">
                            **2.** Group Training Sessions (Weekly, IM Building)
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}