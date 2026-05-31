'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Mail, 
  Lock, 
  User as UserIcon, 
  School, 
  Sparkles, 
  ArrowRight, 
  Loader2 
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const { login, register, isAuthenticated, loading, error, clearError } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [school, setSchool] = useState('Delhi Public School, Bokaro Steel City');

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    // Clear any past error when swapping tabs
    clearError();
  }, [activeTab, clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all required fields.');
      return;
    }

    if (activeTab === 'login') {
      const success = await login(email, password);
      if (success) {
        toast.success('Welcome back to VedaAI!', { icon: '👋' });
        router.push('/');
      } else {
        toast.error(error || 'Login failed. Please verify credentials.');
      }
    } else {
      if (!name) {
        toast.error('Please provide your name.');
        return;
      }
      if (password.length < 6) {
        toast.error('Password must be at least 6 characters.');
        return;
      }
      const success = await register(name, email, password, school);
      if (success) {
        toast.success('Account successfully registered! Welcome to VedaAI.', { icon: '✨' });
        router.push('/');
      } else {
        toast.error(error || 'Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col lg:flex-row relative overflow-hidden select-none font-sans">
      {/* Decorative blurred background shapes */}
      <div className="absolute w-[500px] h-[500px] bg-orange-200/30 rounded-full blur-3xl -top-64 -left-64 pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] bg-purple-200/20 rounded-full blur-3xl -bottom-64 -right-64 pointer-events-none" />

      {/* Left Column: Rich branding & credentials section */}
      <div className="lg:w-[45%] bg-[#1A1A1A] p-8 lg:p-16 flex flex-col justify-between text-white relative z-10 overflow-hidden shrink-0">
        {/* Animated stars behind background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FFF_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        
        {/* Top Header branding */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
            <span className="text-primary-orange text-xl font-black">✦</span>
          </div>
          <span className="text-[24px] font-black tracking-tight">
            Veda<span className="text-primary-orange">AI</span>
          </span>
        </div>

        {/* Core Hero visuals */}
        <div className="my-auto py-12 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-primary-orange">
            <Sparkles size={12} className="fill-primary-orange" />
            <span>CBSE Curriculum Compliant</span>
          </div>
          
          <h1 className="text-3xl lg:text-5xl font-black leading-tight tracking-tight">
            The Smartest <br/>
            <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">Assessment Engine</span> <br/>
            for Modern Schools
          </h1>

          <p className="text-xs lg:text-sm text-gray-400 font-semibold leading-relaxed max-w-md">
            Generate custom exam question papers, worksheets, and syllabus evaluations aligned dynamically to academic modules inside your school board.
          </p>

          {/* Delhi Public School Affiliation Note Card */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-5 flex items-center gap-4 max-w-sm shadow-xl backdrop-blur-md">
            {/* DPS Emblem vector representation */}
            <div className="w-12 h-12 rounded-full shrink-0 overflow-hidden bg-white/10 border border-[#2E7D32] flex items-center justify-center relative p-1">
              <div className="w-full h-full rounded-full border border-dashed border-[#2E7D32] flex items-center justify-center bg-white">
                <svg viewBox="0 0 100 100" className="w-5 h-5 text-[#2E7D32] fill-current">
                  <path d="M50 15 L80 45 L50 75 L20 45 Z" className="stroke-[#2E7D32] stroke-[5] fill-none" />
                  <circle cx="50" cy="45" r="10" />
                  <path d="M50 45 L50 75 M35 60 L65 60" className="stroke-[#2E7D32] stroke-[6]" />
                </svg>
              </div>
            </div>
            
            <div className="min-w-0">
              <h4 className="text-xs font-black tracking-tight text-white">
                Delhi Public School
              </h4>
              <p className="text-[10px] text-gray-400 font-semibold">
                Bokaro Steel City
              </p>
              <span className="text-[9px] font-black text-[#2E7D32] bg-[#E8F5E9] px-1.5 py-0.5 rounded-md mt-1.5 inline-block">
                Registered Center
              </span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-[10px] text-gray-500 font-bold">
          © 2026 VedaAI Assessment Suite. All rights reserved.
        </div>
      </div>

      {/* Right Column: Secure Form Panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative z-10">
        <div className="max-w-md w-full bg-white border border-[#E5E7EB] rounded-[32px] p-8 lg:p-10 shadow-2xl relative">
          
          {/* Logo element visible on mobile */}
          <div className="flex lg:hidden items-center justify-center gap-2 mb-8">
            <span className="text-primary-orange text-xl font-black">✦</span>
            <span className="text-[20px] font-black tracking-tight text-[#1A1A1A]">
              Veda<span className="text-primary-orange">AI</span>
            </span>
          </div>

          <div className="space-y-2 mb-8">
            <h2 className="text-2xl font-black text-[#1A1A1A] tracking-tight">
              {activeTab === 'login' ? 'Welcome Back!' : 'Create Educator Account'}
            </h2>
            <p className="text-xs font-semibold text-[#888888]">
              {activeTab === 'login' 
                ? 'Sign in to access your saved questions and CBSE test generators.' 
                : 'Get started and generate beautiful test sheets in under 5 minutes.'}
            </p>
          </div>

          {/* Premium Selector Tabs */}
          <div className="grid grid-cols-2 bg-[#F3F4F6] p-1.5 rounded-full mb-8 border border-gray-150">
            <button
              onClick={() => setActiveTab('login')}
              className={`py-2 px-4 rounded-full text-xs font-black tracking-tight transition-all duration-200 cursor-pointer ${
                activeTab === 'login' 
                  ? 'bg-white text-[#1A1A1A] shadow-sm' 
                  : 'text-[#666666] hover:text-[#1A1A1A]'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`py-2 px-4 rounded-full text-xs font-black tracking-tight transition-all duration-200 cursor-pointer ${
                activeTab === 'signup' 
                  ? 'bg-white text-[#1A1A1A] shadow-sm' 
                  : 'text-[#666666] hover:text-[#1A1A1A]'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Conditional Name Field for Register */}
            {activeTab === 'signup' && (
              <div className="space-y-1.5">
                <label className="block text-[10px] font-black uppercase text-[#888888] tracking-widest pl-1">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-4 flex items-center text-[#888888]">
                    <UserIcon size={16} />
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-gray-50 border border-[#E5E7EB] focus:bg-white focus:border-primary-orange focus:ring-1 focus:ring-primary-orange outline-none text-xs font-bold transition-all text-[#1a1a1a]"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-black uppercase text-[#888888] tracking-widest pl-1">
                School Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center text-[#888888]">
                  <Mail size={16} />
                </span>
                <input
                  type="email"
                  required
                  placeholder="name@school.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-gray-50 border border-[#E5E7EB] focus:bg-white focus:border-primary-orange focus:ring-1 focus:ring-primary-orange outline-none text-xs font-bold transition-all text-[#1a1a1a]"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-black uppercase text-[#888888] tracking-widest pl-1">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center text-[#888888]">
                  <Lock size={16} />
                </span>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-gray-50 border border-[#E5E7EB] focus:bg-white focus:border-primary-orange focus:ring-1 focus:ring-primary-orange outline-none text-xs font-bold transition-all text-[#1a1a1a]"
                />
              </div>
              {activeTab === 'signup' && (
                <p className="text-[9px] font-semibold text-[#888888] pl-1">
                  Must be at least 6 characters long.
                </p>
              )}
            </div>

            {/* Conditional School Affiliation Field for Register */}
            {activeTab === 'signup' && (
              <div className="space-y-1.5">
                <label className="block text-[10px] font-black uppercase text-[#888888] tracking-widest pl-1">
                  School Affiliation
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-4 flex items-center text-[#888888]">
                    <School size={16} />
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="E.g., Delhi Public School"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-gray-50 border border-[#E5E7EB] focus:bg-white focus:border-primary-orange focus:ring-1 focus:ring-primary-orange outline-none text-xs font-bold transition-all text-[#1a1a1a]"
                  />
                </div>
              </div>
            )}

            {/* Error Message banner */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-2.5 text-[11px] font-bold">
                ⚠️ {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#1A1A1A] hover:bg-black text-white py-3.5 px-6 rounded-2xl duration-150 font-bold text-xs shadow-md active:scale-98 transition-all disabled:opacity-50 disabled:pointer-events-none mt-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-primary-orange" />
                  <span>Please wait...</span>
                </>
              ) : (
                <>
                  <span>{activeTab === 'login' ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight size={14} className="text-primary-orange" />
                </>
              )}
            </button>
          </form>

          {/* Quick Creds Info Card */}
          {activeTab === 'login' && (
            <div className="bg-orange-50/50 border border-orange-100/50 rounded-2xl p-4 mt-6 text-center">
              <span className="text-[10px] font-black uppercase text-primary-orange tracking-widest block mb-1">
                Quick Demo Login
              </span>
              <p className="text-[10px] font-bold text-[#6B7280]">
                Register a new account, or type any email & password to test, as credentials dynamically save in the connected MongoDB.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
