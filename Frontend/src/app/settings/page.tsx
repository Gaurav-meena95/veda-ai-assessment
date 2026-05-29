'use client';

import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Settings as SettingsIcon, ShieldCheck, Database, Key, School, Mail, UserCheck } from 'lucide-react';

export default function Settings() {
  const [groqKey, setGroqKey] = useState('gsk_************************************************');
  const [school, setSchool] = useState('Delhi Public School, Sector-4, Bokaro');
  const [teacher, setTeacher] = useState('John Doe');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Settings updated and saved successfully!');
  };

  return (
    <div className="space-y-8 select-none font-sans max-w-4xl mx-auto py-2 animate-in fade-in duration-200">
      
      {/* 1. Header with active green dot */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-active-green rounded-full shadow-xs shadow-green-500/50 animate-pulse" />
          <h1 className="text-2xl font-black tracking-tight text-text-primary">
            Settings
          </h1>
        </div>
        <p className="text-xs font-semibold text-[#888888]">
          Manage and configure your educator profile settings, school affiliation, and VedaAI engine credentials.
        </p>
      </div>

      {/* 2. Grid Split Sections */}
      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-8">
        
        {/* Left Column: Profile & Affiliation settings */}
        <div className="bg-white border border-[#E5E7EB] rounded-[28px] p-8 shadow-2xs space-y-6">
          <h3 className="text-base font-black text-[#1A1A1A] tracking-tight flex items-center gap-2 pb-3 border-b border-gray-100">
            <School size={18} className="text-primary-orange stroke-[2.2px]" />
            <span>Profile & Affiliation</span>
          </h3>

          <div className="space-y-4">
            {/* Field 1: Teacher Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#6B7280]">
                Educator Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={teacher}
                  onChange={(e) => setTeacher(e.target.value)}
                  className="w-full h-11 px-4 bg-gray-50 border border-[#E5E7EB] text-sm text-[#1A1A1A] rounded-xl focus:outline-none focus:ring-1 focus:ring-primary-orange focus:border-primary-orange transition-all font-bold tracking-tight"
                />
              </div>
            </div>

            {/* Field 2: Role Details */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#6B7280]">
                Designation / Role
              </label>
              <input
                type="text"
                disabled
                value="Senior CBSE Science Educator"
                className="w-full h-11 px-4 bg-gray-100 border border-[#E5E7EB] text-sm text-text-secondary rounded-xl font-bold tracking-tight cursor-not-allowed"
              />
            </div>

            {/* Field 3: School Affiliation */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#6B7280]">
                School Affiliation
              </label>
              <input
                type="text"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                className="w-full h-11 px-4 bg-gray-50 border border-[#E5E7EB] text-sm text-[#1A1A1A] rounded-xl focus:outline-none focus:ring-1 focus:ring-primary-orange focus:border-primary-orange transition-all font-bold tracking-tight"
              />
            </div>

            {/* Field 4: Location */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#6B7280]">
                Location
              </label>
              <input
                type="text"
                disabled
                value="Bokaro Steel City, Jharkhand, India"
                className="w-full h-11 px-4 bg-gray-100 border border-[#E5E7EB] text-sm text-text-secondary rounded-xl font-bold tracking-tight cursor-not-allowed"
              />
            </div>
          </div>

          <div className="pt-2">
            <button 
              type="submit"
              className="bg-[#1A1A1A] hover:bg-black text-white px-6 py-2.5 rounded-full font-bold text-xs shadow-md transition-all active:scale-95 duration-100"
            >
              Save Profile Changes
            </button>
          </div>
        </div>

        {/* Right Column: API & Infrastructure Status */}
        <div className="bg-white border border-[#E5E7EB] rounded-[28px] p-8 shadow-2xs space-y-6 self-start">
          <h3 className="text-base font-black text-[#1A1A1A] tracking-tight flex items-center gap-2 pb-3 border-b border-gray-100">
            <Key size={18} className="text-primary-orange stroke-[2.2px]" />
            <span>AI Engine Credentials</span>
          </h3>

          <div className="space-y-6">
            {/* Masked API Key display */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#6B7280]">
                Groq SDK API Key
              </label>
              <input
                type="password"
                value={groqKey}
                onChange={(e) => setGroqKey(e.target.value)}
                className="w-full h-11 px-4 bg-gray-50 border border-[#E5E7EB] text-sm text-[#1A1A1A] rounded-xl focus:outline-none focus:ring-1 focus:ring-primary-orange focus:border-primary-orange transition-all font-sans"
              />
            </div>

            {/* Verification Status list */}
            <div className="space-y-3 pt-2">
              <span className="block text-[10px] font-black text-[#888888] uppercase tracking-wider">
                Infrastructure Status
              </span>

              {/* Status 1: Mongoose Database */}
              <div className="flex items-center justify-between text-xs font-bold text-text-secondary">
                <div className="flex items-center gap-2">
                  <Database size={15} className="text-[#888888]" />
                  <span>MongoDB Atlas</span>
                </div>
                <span className="text-[9px] font-black uppercase tracking-wider text-green-700 bg-green-50 border border-green-150 px-2 py-0.5 rounded-md">
                  Connected
                </span>
              </div>

              {/* Status 2: BullMQ Queue */}
              <div className="flex items-center justify-between text-xs font-bold text-text-secondary">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={15} className="text-[#888888]" />
                  <span>Upstash Redis Queue</span>
                </div>
                <span className="text-[9px] font-black uppercase tracking-wider text-green-700 bg-green-50 border border-green-150 px-2 py-0.5 rounded-md">
                  Connected
                </span>
              </div>

              {/* Status 3: Groq LLM */}
              <div className="flex items-center justify-between text-xs font-bold text-text-secondary">
                <div className="flex items-center gap-2">
                  <Key size={15} className="text-[#888888]" />
                  <span>Groq AI Connection</span>
                </div>
                <span className="text-[9px] font-black uppercase tracking-wider text-green-700 bg-green-50 border border-green-150 px-2 py-0.5 rounded-md">
                  Verified
                </span>
              </div>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}
