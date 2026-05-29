'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Bell, ChevronDown } from 'lucide-react';

export const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Generate dynamic breadcrumb segments based on route path
  const getBreadcrumbs = () => {
    if (pathname.includes('/assignments/create')) {
      return (
        <div className="flex items-center gap-2 text-sm">
          <Link href="/assignments" className="text-text-secondary hover:text-text-primary transition-colors">
            Assignments
          </Link>
          <span className="text-text-secondary font-light">/</span>
          <span className="text-text-primary font-semibold">Create Assignment</span>
        </div>
      );
    }
    if (pathname.match(/\/assignments\/[a-zA-Z0-9_-]+/)) {
      return (
        <div className="flex items-center gap-2 text-sm">
          <Link href="/assignments" className="text-text-secondary hover:text-text-primary transition-colors">
            Assignments
          </Link>
          <span className="text-text-secondary font-light">/</span>
          <span className="text-text-primary font-semibold">Assignment Details</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2 text-sm">
        <span className="text-text-primary font-semibold text-base">Assignments</span>
      </div>
    );
  };

  const showBackButton = pathname !== '/assignments' && pathname !== '/';

  return (
    <header className="h-[70px] bg-white border-b border-border-custom flex items-center justify-between px-8 sticky top-0 z-20 select-none">
      {/* Left side: Back Button & Dynamic Breadcrumbs */}
      <div className="flex items-center gap-4">
        {showBackButton && (
          <button 
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-50 rounded-lg text-text-secondary hover:text-text-primary transition-all duration-150 active:scale-95 border border-transparent hover:border-border-custom"
            aria-label="Go back"
          >
            <ArrowLeft size={18} />
          </button>
        )}
        <div className="flex items-center">
          {getBreadcrumbs()}
        </div>
      </div>

      {/* Right side: Bell icon & User profile */}
      <div className="flex items-center gap-6">
        {/* Notification Bell */}
        <button className="relative p-2 hover:bg-gray-50 rounded-lg text-text-secondary hover:text-text-primary transition-all cursor-pointer">
          <Bell size={20} />
          {/* Notification Red Dot indicator */}
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-border-custom" />

        {/* User Card & Dropdown */}
        <div className="flex items-center gap-3 cursor-pointer group p-1.5 hover:bg-gray-50 rounded-lg transition-all">
          {/* User Avatar */}
          <div className="w-9 h-9 rounded-full overflow-hidden bg-primary-orange flex items-center justify-center text-white font-semibold text-sm shadow-sm">
            JD
          </div>
          
          <div className="hidden sm:block text-left">
            <h4 className="text-sm font-bold text-text-primary leading-tight">
              John Doe
            </h4>
            <p className="text-[10px] text-text-secondary leading-none">
              Teacher
            </p>
          </div>

          <ChevronDown size={14} className="text-text-secondary group-hover:text-text-primary transition-colors" />
        </div>
      </div>
    </header>
  );
};

export default Header;
