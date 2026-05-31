'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { Loader2, Sparkles } from 'lucide-react';

export const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, loading, checkAuth } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isMounted || loading) return;

    if (!isAuthenticated && pathname !== '/login') {
      router.replace('/login');
    } else if (isAuthenticated && pathname === '/login') {
      router.replace('/');
    }
  }, [isAuthenticated, pathname, router, isMounted, loading]);

  // Prevent rendering protected content on the server or while checking initial session
  if (!isMounted || (loading && !isAuthenticated && pathname !== '/login')) {
    return (
      <div className="min-h-screen bg-bg-page flex flex-col items-center justify-center font-sans p-6">
        <div className="relative flex flex-col items-center max-w-sm w-full text-center space-y-6">
          {/* Pulsing visual circles */}
          <div className="absolute w-64 h-64 bg-orange-200/20 blur-3xl rounded-full -top-12 -left-12 animate-pulse" />
          <div className="absolute w-64 h-64 bg-purple-200/20 blur-3xl rounded-full -bottom-12 -right-12 animate-pulse" />

          {/* Logo animation */}
          <div className="relative w-16 h-16 rounded-2xl bg-white border border-border-custom flex items-center justify-center shadow-lg animate-bounce">
            <span className="text-primary-orange text-2xl font-black">✦</span>
          </div>

          <div className="space-y-2 relative z-10">
            <h2 className="text-lg font-black tracking-tight text-text-primary flex items-center justify-center gap-1.5">
              <span>Authenticating Session</span>
              <Sparkles size={16} className="text-primary-orange fill-primary-orange animate-pulse" />
            </h2>
            <p className="text-xs font-semibold text-[#888888]">
              Verifying your school affiliation credentials...
            </p>
          </div>

          <div className="flex items-center gap-2 text-primary-orange font-bold text-xs relative z-10">
            <Loader2 className="w-4 h-4 animate-spin stroke-[2.5]" />
            <span>Establishing secure line...</span>
          </div>
        </div>
      </div>
    );
  }

  // If not authenticated and trying to access a protected route, render blank while redirecting
  if (!isAuthenticated && pathname !== '/login') {
    return null;
  }

  // If authenticated and trying to access login page, render blank while redirecting
  if (isAuthenticated && pathname === '/login') {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
