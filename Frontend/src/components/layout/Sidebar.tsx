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
    <aside className="w-[260px] fixed left-0 top-0 h-screen bg-white border-r border-border-custom flex flex-col select-none z-30">
      {/* VedaAI Logo Header */}
      <div className="p-6 pb-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary-orange rounded-xl flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-orange-500/20">
          V
        </div>
        <span className="text-xl font-bold tracking-tight text-text-primary">
          Veda<span className="text-primary-orange font-black">AI</span>
        </span>
      </div>

      {/* Create Assignment Button Area */}
      <div className="px-6 py-4">
        <Link href="/assignments/create" passHref className="w-full block">
          <Button 
            variant="dark" 
            size="pill-dark"
            className="w-full flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 duration-100 font-semibold"
          >
            <span className="text-primary-orange font-bold text-base">✦</span>
            Create Assignment
          </Button>
        </Link>
      </div>

      {/* Nav List */}
      <nav className="flex-1 px-4 py-2 space-y-1">
        {navItems.map((item) => {
          // Check if item is active
          // Since assignments starts with /assignments, match sub-paths too
          const isActive = item.href === '/' 
            ? pathname === '/' 
            : pathname.startsWith(item.href);

          const Icon = item.icon;

          return (
            <Link 
              key={item.name} 
              href={item.href} 
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150 group",
                isActive 
                  ? "bg-gray-100 text-text-primary font-semibold" 
                  : "text-text-secondary hover:bg-gray-50 hover:text-text-primary"
              )}
            >
              <Icon 
                size={18} 
                className={cn(
                  "transition-colors",
                  isActive ? "text-primary-orange" : "text-text-secondary group-hover:text-text-primary"
                )} 
              />
              <span className="flex-1">{item.name}</span>
              {item.count !== undefined && item.count > 0 && (
                <span className="bg-primary-orange text-white text-2xs font-bold px-2 py-0.5 rounded-full min-w-5 text-center shadow-sm">
                  {item.count}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Footer Section */}
      <div className="p-4 border-t border-border-custom space-y-3">
        <Link 
          href="/settings"
          className={cn(
            "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:bg-gray-50 hover:text-text-primary transition-all"
          )}
        >
          <Settings size={18} />
          <span>Settings</span>
        </Link>

        {/* School Card */}
        <div className="bg-gray-50 border border-border-custom rounded-xl p-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg overflow-hidden bg-orange-100 border border-orange-200 flex items-center justify-center text-primary-orange font-bold text-sm">
            HPS
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-text-primary truncate">
              Harvard Public School
            </h4>
            <p className="text-[10px] text-text-secondary truncate">
              New York, USA
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
