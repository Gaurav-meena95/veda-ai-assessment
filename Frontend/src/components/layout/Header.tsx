'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ArrowLeft, Bell, ChevronDown, LayoutGrid, Plus } from 'lucide-react';

export const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Replicated Breadcrumbs based on screenshots
  const getHeaderTitle = () => {
    if (pathname.includes('/assignments/create')) {
      return (
        <div className="flex items-center gap-2 text-sm font-bold text-text-primary">
          <Plus size={16} className="text-[#888888] stroke-[2.5px]" />
          <span className="tracking-tight">Create New</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2 text-sm font-bold text-text-primary">
        <LayoutGrid size={16} className="text-[#888888] stroke-[2.5px]" />
        <span className="tracking-tight">Assignment</span>
      </div>
    );
  };

  return (
    <header className="h-[70px] bg-white border-b border-border-custom flex items-center justify-between px-8 sticky top-0 z-20 select-none font-sans">
      {/* Left side: Back Button & Crumbs */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => {
            if (pathname === '/assignments') {
              router.push('/');
            } else {
              router.back();
            }
          }}
          className="w-8 h-8 rounded-full border border-border-custom hover:border-gray-400 flex items-center justify-center text-text-secondary hover:text-text-primary transition-all duration-150 active:scale-90 bg-white"
          aria-label="Go back"
        >
          <ArrowLeft size={15} className="stroke-[2.5px]" />
        </button>

        <div className="flex items-center">
          {getHeaderTitle()}
        </div>
      </div>

      {/* Right side: Bell icon & Replicated User profile */}
      <div className="flex items-center gap-5">
        {/* Notification Bell */}
        <button className="relative p-1.5 hover:bg-gray-100 rounded-lg text-text-secondary hover:text-text-primary transition-all cursor-pointer">
          <Bell size={20} className="stroke-[2.2px] text-[#444444]" />
          {/* Notification Red Dot indicator */}
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#FF4D4D] rounded-full border-2 border-white animate-pulse" />
        </button>

        {/* Divider */}
        <div className="h-5 w-px bg-border-custom" />

        {/* User Card & Dropdown */}
        <div className="flex items-center gap-2.5 cursor-pointer group p-1 hover:bg-gray-50 rounded-xl transition-all">
          {/* Replicated Cartoon Teacher Avatar (SVG) */}
          <div className="w-8 h-8 rounded-full shrink-0 overflow-hidden bg-[#FFE2D2] border border-orange-200 flex items-center justify-center relative shadow-2xs">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Hair */}
              <circle cx="50" cy="50" r="32" fill="#8B4513" />
              {/* Face */}
              <circle cx="50" cy="53" r="26" fill="#FAD1B8" />
              {/* Hair Bangs */}
              <path d="M24 53 C 25 35, 75 35, 76 53 C 70 38, 30 38, 24 53 Z" fill="#8B4513" />
              {/* Eyes */}
              <circle cx="42" cy="51" r="3" fill="#333333" />
              <circle cx="58" cy="51" r="3" fill="#333333" />
              {/* Red Glasses */}
              <circle cx="42" cy="51" r="7" fill="none" stroke="#FF4D4D" strokeWidth="2.5" />
              <circle cx="58" cy="51" r="7" fill="none" stroke="#FF4D4D" strokeWidth="2.5" />
              <line x1="49" y1="51" x2="51" y2="51" stroke="#FF4D4D" strokeWidth="2.5" />
              {/* Mouth */}
              <path d="M46 64 Q 50 68, 54 64" fill="none" stroke="#333333" strokeWidth="2" strokeLinecap="round" />
              {/* Shirt */}
              <path d="M28 85 C 32 75, 68 75, 72 85 Z" fill="#2E7D32" />
            </svg>
          </div>
          
          <div className="hidden sm:flex items-center gap-1">
            <span className="text-xs font-black text-text-primary tracking-tight">
              John Doe
            </span>
            <ChevronDown size={14} className="text-[#888888] group-hover:text-text-primary transition-colors stroke-[2.2px]" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
