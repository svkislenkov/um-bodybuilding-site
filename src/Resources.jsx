// src/Resources.jsx (Completed)

import React from 'react';

export default function Resources() {
    // 💡 NOTE: The PDF file itself should be placed in your `public` folder
    // and named `jacob-zoller-slide-deck.pdf`.
    const pdfLink = "/jacob-zoller-slide-deck.pdf"; 

    return (
        <div className="py-20 px-6 bg-gray-50 text-gray-900 min-h-screen">
            <div className="max-w-4xl mx-auto">
                
                {/* Header */}
                <h2 className="text-4xl font-black mb-10 text-center text-[#00274C]">
                    Resources provided graciously by Jacob Zoller!
                </h2>
                
                {/* PDF Resource Card */}
                <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl border-t-8 border-[#00274C]">
                    
                    <div className="flex items-center space-x-6 mb-6">
                        {/* File Icon Placeholder (using a simple emoji for lack of an actual icon library) */}
                        {/*<span className="text-6xl text-[#FFCB05]">📄</span> */}
                        
                        <h3 className="text-3xl font-bold text-[#00274C]">
                            1. Intro to Bodybuilding
                        </h3>
                    </div>

                    {/* Download Button - Use 'a' tag for external links/files */}
                    <a
                        href={pdfLink}
                        target="_blank" // Opens the PDF in a new tab
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center bg-[#FFCB05] text-[#00274C] font-extrabold px-8 py-4 rounded-lg shadow-md hover:bg-yellow-400 transition-all duration-300 text-lg uppercase tracking-wider"
                    >
                        
                        {/* Download Icon (Placeholder) */}
                        <span className="mr-3 text-2xl">⬇️</span> 
                        Download Intro To Bodybuilding (PDF)
                    </a>
                </div>
            </div>
        </div>
    );
}