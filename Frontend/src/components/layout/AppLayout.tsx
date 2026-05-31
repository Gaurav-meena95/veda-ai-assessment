'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import Header from './Header';
import MobileNavigation from './MobileNavigation';
import AuthGuard from './AuthGuard';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  if (isLoginPage) {
    return (
      <AuthGuard>
        <main className="w-full min-h-screen">
          {children}
        </main>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      {/* Main Application Layout Wrapper */}
      <div className="flex min-h-screen">
        {/* Desktop Sidebar Navigation */}
        <div className="hidden lg:block shrink-0">
          <Sidebar />
        </div>

        {/* Mobile Specific Floating Nav & Header */}
        <MobileNavigation />

        {/* Core Content Container */}
        <div className="flex-1 pl-0 lg:pl-[260px] flex flex-col min-h-screen w-full">
          {/* Desktop Top Bar Header */}
          <div className="hidden lg:block">
            <Header />
          </div>

          {/* Main view content body with mobile buffer offsets */}
          <main className="flex-1 p-4 sm:p-8 bg-bg-page pt-20 pb-24 lg:pt-8 lg:pb-8 w-full max-w-full overflow-hidden">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
};

export default AppLayout;
