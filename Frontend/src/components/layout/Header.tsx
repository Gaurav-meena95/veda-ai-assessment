'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  ArrowLeft, 
  Bell, 
  ChevronDown, 
  LayoutGrid, 
  Plus, 
  User, 
  LogOut, 
  HelpCircle, 
  Users, 
  FileText, 
  Sparkles 
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/useAuthStore';

export const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuthStore();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleNavigate = (path: string) => {
    setIsDropdownOpen(false);
    router.push(path);
  };

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
        <div ref={dropdownRef} className="relative">
          <div 
            onClick={() => setIsDropdownOpen(prev => !prev)}
            className="flex items-center gap-2.5 cursor-pointer group p-1 hover:bg-gray-50 rounded-xl transition-all select-none"
          >
            {/* Replicated Cartoon Teacher Avatar (SVG) */}
            <div 
              style={{ backgroundColor: user?.avatarColor || '#FFE2D2' }}
              className="w-8 h-8 rounded-full shrink-0 overflow-hidden border border-orange-200 flex items-center justify-center relative shadow-2xs"
            >
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
                {user?.name || 'John Doe'}
              </span>
              <ChevronDown 
                size={14} 
                className={cn(
                  "text-[#888888] group-hover:text-text-primary transition-transform duration-200 stroke-[2.2px]",
                  isDropdownOpen && "rotate-180 text-text-primary"
                )} 
              />
            </div>
          </div>

          {/* Premium Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-[calc(100%+8px)] w-64 bg-white border border-border-custom rounded-2xl shadow-xl py-3 px-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 flex flex-col gap-1 font-sans">
              {/* User Profile Header */}
              <div className="flex items-center gap-3 px-3 py-2 border-b border-border-custom/60 pb-3 mb-1">
                <div 
                  style={{ backgroundColor: user?.avatarColor || '#FFE2D2' }}
                  className="w-10 h-10 rounded-full shrink-0 overflow-hidden border border-orange-200 flex items-center justify-center relative shadow-3xs"
                >
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
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-black text-text-primary truncate">{user?.name || 'John Doe'}</span>
                  <span className="text-[10px] font-bold text-text-secondary truncate mt-0.5">{user?.email || 'john.doe@school.edu'}</span>
                  <span className="text-[9px] font-black text-[#2E7D32] bg-[#E8F5E9] px-1.5 py-0.5 rounded-md mt-1 w-max">{user?.role || 'Educator'}</span>
                </div>
              </div>

              {/* Dropdown Items */}
              <button 
                onClick={() => handleNavigate('/settings')}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-left text-xs font-bold text-[#444444] hover:bg-gray-50 hover:text-text-primary transition-all duration-150 group cursor-pointer"
              >
                <User size={15} className="text-text-secondary group-hover:text-primary-orange transition-colors stroke-[2.5px]" />
                <span>Profile & Affiliation</span>
              </button>

              <button 
                onClick={() => handleNavigate('/groups')}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-left text-xs font-bold text-[#444444] hover:bg-gray-50 hover:text-text-primary transition-all duration-150 group cursor-pointer"
              >
                <Users size={15} className="text-text-secondary group-hover:text-primary-orange transition-colors stroke-[2.5px]" />
                <span>My Groups</span>
              </button>

              <button 
                onClick={() => handleNavigate('/assignments')}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-left text-xs font-bold text-[#444444] hover:bg-gray-50 hover:text-text-primary transition-all duration-150 group cursor-pointer"
              >
                <FileText size={15} className="text-text-secondary group-hover:text-primary-orange transition-colors stroke-[2.5px]" />
                <span>Assignments</span>
              </button>

              <button 
                onClick={() => handleNavigate('/toolkit')}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-left text-xs font-bold text-[#444444] hover:bg-gray-50 hover:text-text-primary transition-all duration-150 group cursor-pointer"
              >
                <Sparkles size={15} className="text-text-secondary group-hover:text-primary-orange transition-colors stroke-[2.5px]" />
                <span>AI Toolkit</span>
              </button>

              {/* Divider */}
              <div className="h-px bg-border-custom/60 my-1" />

              <button 
                onClick={() => {
                  setIsDropdownOpen(false);
                  toast.success('Help & Documentation center loaded!', { icon: '📖' });
                }}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-left text-xs font-bold text-[#444444] hover:bg-gray-50 hover:text-text-primary transition-all duration-150 group cursor-pointer"
              >
                <HelpCircle size={15} className="text-text-secondary group-hover:text-primary-orange transition-colors stroke-[2.5px]" />
                <span>Help & Support</span>
              </button>

              <button 
                onClick={() => {
                  setIsDropdownOpen(false);
                  logout();
                  toast.success('You have successfully logged out of VedaAI.', { icon: '👋' });
                  router.push('/login');
                }}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-left text-xs font-bold text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-150 group cursor-pointer"
              >
                <LogOut size={15} className="text-red-400 group-hover:text-red-500 transition-colors stroke-[2.5px]" />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
