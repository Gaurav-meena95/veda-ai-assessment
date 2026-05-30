'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  FileText, 
  Library, 
  Sparkles, 
  Bell, 
  Menu, 
  X,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAssignmentStore } from '@/store/useAssignmentStore';

export const MobileNavigation: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const assignments = useAssignmentStore((state) => state.assignments);

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Assignments', href: '/assignments', icon: FileText, count: assignments.length },
    { name: 'Library', href: '/library', icon: Library },
    { name: 'AI Toolkit', href: '/toolkit', icon: Sparkles },
  ];

  return (
    <>
      {/* 1. Mobile Top Floating Header (Matches Figma Screenshots exactly) */}
      <header className="fixed top-3 left-1/2 -translate-x-1/2 w-[92%] max-w-xl h-14 bg-white border border-border-custom rounded-2xl flex items-center justify-between px-5 z-40 shadow-xs lg:hidden">
        {/* Brand Logo and Title */}
        <Link href="/" className="flex items-center gap-2 select-none">
          <Image 
            src="/logo_2.png" 
            alt="VedaAI Logo" 
            width={24}
            height={24}
            className="h-6 w-6 object-contain rounded-lg"
          />
          <span className="text-base font-black tracking-tight text-text-primary">
            Veda<span className="text-primary-orange">AI</span>
          </span>
        </Link>

        {/* Right side: Bell icon & Profile & Hamburg Menu */}
        <div className="flex items-center gap-3">
          {/* Notification Bell with red indicator */}
          <button className="relative p-1.5 hover:bg-gray-50 rounded-lg text-text-secondary">
            <Bell size={18} className="stroke-[2.2px] text-[#444444]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF4D4D] rounded-full border border-white animate-pulse" />
          </button>

          {/* User profile picture */}
          <div className="w-8 h-8 rounded-full overflow-hidden border border-border-custom shadow-3xs bg-gray-150">
            <svg viewBox="0 0 100 100" className="w-full h-full text-gray-400 fill-current p-0.5">
              <path d="M50 48a16 16 0 1 0 0-32 16 16 0 0 0 0 32zm0 8c-22 0-40 12-40 28h80c0-16-18-28-40-28z" />
            </svg>
          </div>

          {/* Hamburger menu trigger */}
          <button 
            onClick={() => setIsOpen(true)}
            className="p-1.5 hover:bg-gray-50 rounded-lg text-[#1A1A1A] cursor-pointer"
            aria-label="Open navigation drawer"
          >
            <Menu size={20} className="stroke-[2.2px]" />
          </button>
        </div>
      </header>

      {/* 2. Mobile Sidebar Slide-Out Drawer (Client Interaction) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden font-sans">
          {/* Dark Backdrop Overlay */}
          <div 
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-200" 
          />

          {/* Sliding Panel Content */}
          <aside className="absolute right-0 top-0 w-[260px] h-full bg-white shadow-2xl flex flex-col p-6 animate-in slide-in-from-right duration-200">
            {/* Header: Close Button and Label */}
            <div className="flex items-center justify-between pb-6 border-b border-border-custom">
              <span className="text-xs font-black tracking-widest text-[#888888] uppercase">
                VedaAI Menu
              </span>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full border border-border-custom hover:bg-gray-50 flex items-center justify-center text-text-secondary cursor-pointer"
              >
                <X size={15} className="stroke-[2.5px]" />
              </button>
            </div>

            {/* Menu Nav Links List */}
            <nav className="flex-1 py-6 space-y-1">
              {navItems.map((item) => {
                const isActive = item.href === '/' 
                  ? pathname === '/' 
                  : pathname.startsWith(item.href);

                const Icon = item.icon;

                return (
                  <Link 
                    key={item.name} 
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-150 group",
                      isActive 
                        ? "bg-gray-100 text-text-primary" 
                        : "text-[#666666] hover:bg-gray-50 hover:text-text-primary"
                    )}
                  >
                    <Icon 
                      size={18} 
                      className={cn(
                        "transition-colors stroke-[2.5px]",
                        isActive ? "text-primary-orange" : "text-[#666666] group-hover:text-text-primary"
                      )} 
                    />
                    <span className="flex-1 tracking-tight">{item.name}</span>
                    {item.count !== undefined && item.count > 0 && (
                      <span className="bg-[#FF4D4D] text-white text-3xs font-black px-2 py-0.5 rounded-full shadow-xs">
                        {item.count}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Footer Actions inside Drawer */}
            <div className="pt-4 border-t border-border-custom space-y-3">
              <Link 
                href="/settings"
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-bold text-[#666666] hover:bg-gray-50 hover:text-text-primary transition-all duration-150"
                )}
              >
                <Settings size={18} className="stroke-[2.5px]" />
                <span>Settings</span>
              </Link>
              
              <div className="bg-gray-50 border border-border-custom rounded-2xl p-3 flex items-center gap-3 shadow-3xs">
                <div className="w-8 h-8 rounded-full border border-dashed border-[#2E7D32] flex items-center justify-center bg-white text-[#2E7D32] text-xs font-black shrink-0">
                  DP
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[10px] font-black text-text-primary truncate">Delhi Public School</h4>
                  <p className="text-[9px] font-bold text-[#888888] truncate mt-0.5">Bokaro Steel City</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* 3. Floating Bottom Navigation Tab Bar (Matches Figma screenshots perfectly!) */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[92%] max-w-sm bg-[#111111]/95 backdrop-blur-md rounded-2xl h-15 flex items-center justify-around px-2 z-40 shadow-xl border border-white/5 lg:hidden select-none font-sans">
        {navItems.map((item) => {
          const isActive = item.href === '/' 
            ? pathname === '/' 
            : pathname.startsWith(item.href);

          const Icon = item.icon;

          return (
            <Link 
              key={item.name} 
              href={item.href} 
              className="flex flex-col items-center justify-center w-16 h-full text-center relative group active:scale-95 duration-100"
            >
              <div className={cn(
                "p-1.5 rounded-xl transition-all duration-200",
                isActive ? "text-primary-orange bg-white/5" : "text-[#888888]"
              )}>
                <Icon size={18} className="stroke-[2.5px]" />
              </div>
              <span className={cn(
                "text-[8px] font-black tracking-tight mt-0.5 uppercase transition-colors duration-200",
                isActive ? "text-white" : "text-[#888888]"
              )}>
                {item.name}
              </span>
              {/* Count badge overlay on file text/assignments tab */}
              {item.name === 'Assignments' && item.count !== undefined && item.count > 0 && (
                <span className="absolute top-1 right-2.5 bg-[#FF4D4D] text-white text-[8px] font-black px-1.5 py-0.5 rounded-full shadow-md scale-90">
                  {item.count}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default MobileNavigation;
