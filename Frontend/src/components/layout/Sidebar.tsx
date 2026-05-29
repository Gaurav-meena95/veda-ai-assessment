'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Users, 
  FileText, 
  Sparkles, 
  Library, 
  Settings
} from 'lucide-react';
import { useAssignmentStore } from '@/store/useAssignmentStore';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const assignments = useAssignmentStore((state) => state.assignments);
  
  // Count of assignments
  const assignmentCount = assignments.length;

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'My Groups', href: '/groups', icon: Users },
    { name: 'Assignments', href: '/assignments', icon: FileText, count: assignmentCount },
    { name: 'AI Teacher\'s Toolkit', href: '/toolkit', icon: Sparkles },
    { name: 'My Library', href: '/library', icon: Library },
  ];

  return (
    <aside className="w-[260px] fixed left-0 top-0 h-screen bg-white border-r border-border-custom flex flex-col select-none z-30 font-sans">
      {/* VedaAI Logo Header */}
      <div className="p-6 pb-4 flex items-center gap-2.5">
        <img 
          src="/logo.png" 
          alt="VedaAI Logo" 
          className="w-10 h-10 object-contain rounded-xl shadow-xs"
        />
        <span className="text-2xl font-black tracking-tight text-text-primary">
          Veda<span className="text-primary-orange">AI</span>
        </span>
      </div>

      {/* Create Assignment Button Area */}
      <div className="px-5 py-4">
        <Link href="/assignments/create" passHref className="w-full block">
          <button 
            className="w-full flex items-center justify-center gap-2 bg-[#1A1A1A] hover:bg-black text-white py-3 px-5 rounded-full duration-150 font-bold text-sm shadow-md active:scale-98 transition-all"
          >
            <span className="text-primary-orange text-lg font-black leading-none">✦</span>
            <span>Create Assignment</span>
          </button>
        </Link>
      </div>

      {/* Nav List */}
      <nav className="flex-1 px-3 py-2 space-y-1">
        {navItems.map((item) => {
          const isActive = item.href === '/' 
            ? pathname === '/' 
            : pathname.startsWith(item.href);

          const Icon = item.icon;

          return (
            <Link 
              key={item.name} 
              href={item.href} 
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
                <span className="bg-[#FF4D4D] text-white text-3xs font-black px-2 py-0.5 rounded-full min-w-[20px] text-center shadow-xs">
                  {item.count}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Footer Section */}
      <div className="p-4 border-t border-border-custom space-y-3 bg-white">
        <Link 
          href="/settings"
          className={cn(
            "flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-bold text-[#666666] hover:bg-gray-50 hover:text-text-primary transition-all duration-150"
          )}
        >
          <Settings size={18} className="stroke-[2.5px]" />
          <span>Settings</span>
        </Link>

        {/* DPS Bokaro School Card (Replicated) */}
        <div className="bg-gray-50 border border-border-custom rounded-2xl p-3 flex items-center gap-3 shadow-2xs">
          {/* DPS Crest Logo */}
          <div className="w-10 h-10 rounded-full shrink-0 overflow-hidden bg-white border border-[#2E7D32] flex items-center justify-center relative p-1 shadow-2xs">
            <div className="w-full h-full rounded-full border-2 border-dashed border-[#2E7D32] flex items-center justify-center bg-white">
              {/* DPS Inner Emblem Drawing in Green */}
              <svg viewBox="0 0 100 100" className="w-5 h-5 text-[#2E7D32] fill-current">
                <path d="M50 15 L80 45 L50 75 L20 45 Z" className="stroke-[#2E7D32] stroke-[5] fill-none" />
                <circle cx="50" cy="45" r="10" />
                <path d="M50 45 L50 75 M35 60 L65 60" className="stroke-[#2E7D32] stroke-[6]" />
              </svg>
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-black text-text-primary truncate tracking-tight">
              Delhi Public School
            </h4>
            <p className="text-[10px] font-semibold text-[#888888] truncate mt-0.5">
              Bokaro Steel City
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
