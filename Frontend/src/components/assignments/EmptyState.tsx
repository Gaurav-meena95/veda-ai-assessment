'use client';

import React from 'react';
import Link from 'next/link';

export const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 max-w-xl mx-auto my-6 select-none font-sans">
      
      {/* Premium Replicated SVG Illustration */}
      <div className="w-48 h-48 mb-6 flex items-center justify-center relative">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Outer soft grey background rings */}
          <circle cx="100" cy="100" r="75" fill="#EAEAEA" opacity="0.3" />
          <circle cx="100" cy="100" r="60" fill="#EAEAEA" opacity="0.6" />
          <circle cx="100" cy="100" r="48" fill="#F3F4F6" />
          
          {/* Paper Document */}
          <rect x="78" y="65" width="40" height="52" rx="4" fill="white" stroke="#CCCCCC" strokeWidth="2" />
          <line x1="86" y1="78" x2="110" y2="78" stroke="#E5E7EB" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="86" y1="88" x2="102" y2="88" stroke="#E5E7EB" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="86" y1="98" x2="110" y2="98" stroke="#E5E7EB" strokeWidth="2.5" strokeLinecap="round" />
          
          {/* Magnifying Glass */}
          <circle cx="118" cy="112" r="16" fill="none" stroke="#6B7280" strokeWidth="2.5" />
          <line x1="129" y1="123" x2="142" y2="136" stroke="#6B7280" strokeWidth="3" strokeLinecap="round" />
          
          {/* Red X Badge inside Magnifying Glass (Exactly matches screenshot) */}
          <circle cx="118" cy="112" r="9" fill="#FF4D4D" />
          <path d="M114.5 108.5 L121.5 115.5 M121.5 108.5 L114.5 115.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Headline */}
      <h3 className="text-xl font-bold text-[#1A1A1A] tracking-tight mb-2">
        No assignments yet
      </h3>

      {/* Subtitle description */}
      <p className="text-xs text-[#6B7280] font-semibold leading-relaxed mb-6 max-w-sm">
        Create your first assignment to start collecting and grading student submissions. You can set up rubrics, define marking criteria, and let AI assist with grading.
      </p>

      {/* Call to action pill button */}
      <Link href="/assignments/create" passHref>
        <button 
          className="bg-[#1A1A1A] hover:bg-black text-white py-3 px-6 rounded-full font-bold text-xs shadow-md transition-all duration-150 active:scale-98"
        >
          Create Your First Assignment
        </button>
      </Link>
    </div>
  );
};

export default EmptyState;
