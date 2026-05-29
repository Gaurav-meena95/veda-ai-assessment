import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VedaAI - Assessment Creator",
  description: "Create premium assessments and student question papers in minutes with VedaAI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased text-text-primary bg-bg-page min-h-screen`}>
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
          {/* Sidebar Navigation */}
          <Sidebar />

          {/* Core Content Container */}
          <div className="flex-1 pl-[260px] flex flex-col min-h-screen">
            {/* Top Bar Header */}
            <Header />

            {/* Main view content body */}
            <main className="flex-1 p-8 bg-bg-page">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
