import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist_Mono } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import "./globals.css";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
  axes: ["opsz"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VedaAI - Assessment Creator",
  description: "Create premium assessments and student question papers in minutes with VedaAI.",
};

import MobileNavigation from '@/components/layout/MobileNavigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bricolageGrotesque.variable} ${geistMono.variable} antialiased text-text-primary bg-bg-page min-h-screen font-sans`}>
        {/* Toast Notifier */}
        <Toaster 
          position="top-right" 
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1A1A1A',
              color: '#FFFFFF',
              borderRadius: '8px',
              fontSize: '14px',
            },
          }} 
        />
        
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
      </body>
    </html>
  );
}
