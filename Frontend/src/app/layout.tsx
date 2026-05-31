import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist_Mono } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import AppLayout from '@/components/layout/AppLayout';
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
        
        <AppLayout>
          {children}
        </AppLayout>
      </body>
    </html>
  );
}
