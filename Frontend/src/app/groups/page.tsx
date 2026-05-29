'use client';

import React, { useState } from 'react';
import { Search, Plus, ArrowRight, UserCheck } from 'lucide-react';

const INITIAL_GROUPS = [
  { id: '1', grade: 'Grade 8', subject: 'Science', studentsCount: 32, avatarColor: 'bg-orange-100 text-primary-orange', lastAssigned: 'Quiz on Electricity (29-05-2026)' },
  { id: '2', grade: 'Grade 5', subject: 'English', studentsCount: 24, avatarColor: 'bg-green-100 text-green-600', lastAssigned: 'Adjectives Assessment (25-05-2026)' },
  { id: '3', grade: 'Grade 10', subject: 'Mathematics', studentsCount: 40, avatarColor: 'bg-blue-100 text-blue-600', lastAssigned: 'Trigonometry Exam (12-05-2026)' }
];

export default function Groups() {
  const [search, setSearch] = useState('');

  const filteredGroups = INITIAL_GROUPS.filter(g => 
    g.grade.toLowerCase().includes(search.toLowerCase()) ||
    g.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 select-none font-sans max-w-4xl mx-auto py-2 animate-in fade-in duration-200">
      
      {/* 1. Header with active green dot */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-active-green rounded-full shadow-xs shadow-green-500/50 animate-pulse" />
            <h1 className="text-2xl font-black tracking-tight text-text-primary">
              My Groups
            </h1>
          </div>
          <p className="text-xs font-semibold text-[#888888]">
            Manage student groups and class lists for Delhi Public School, Bokaro Steel City.
          </p>
        </div>

        {/* Create new class button */}
        <button className="flex items-center justify-center gap-2 bg-[#1A1A1A] hover:bg-black text-white px-5 h-10 rounded-full font-bold text-xs shadow-md transition-all active:scale-95 duration-100">
          <Plus size={14} className="stroke-[3]" />
          <span>Add Group</span>
        </button>
      </div>

      {/* 2. Search row */}
      <div className="relative max-w-xs">
        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#888888]">
          <Search size={16} />
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Groups or Subjects"
          className="w-full h-11 pl-10 pr-4 bg-white border border-[#E5E7EB] text-sm text-[#1A1A1A] placeholder:text-[#888888] rounded-full focus:outline-none focus:ring-1 focus:ring-primary-orange focus:border-primary-orange transition-all shadow-2xs"
        />
      </div>

      {/* 3. Class Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups.map(group => (
          <div 
            key={group.id} 
            className="bg-white border border-[#E5E7EB] hover:border-gray-300 rounded-[24px] p-6 shadow-2xs hover:shadow-xs transition-all duration-200 flex flex-col justify-between min-h-[200px] relative group"
          >
            <div>
              {/* Top row class name info */}
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm ${group.avatarColor} border border-[#E5E7EB]`}>
                  {group.grade[6] || 'G'}
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-green-700 bg-green-50 border border-green-100 px-2 py-0.5 rounded-md">
                  Active
                </span>
              </div>

              {/* Subject details */}
              <h3 className="text-lg font-black text-[#1A1A1A] leading-snug tracking-tight">
                {group.grade} — {group.subject}
              </h3>
              
              <div className="flex items-center gap-1.5 text-xs text-[#888888] mt-2 font-semibold">
                <UserCheck size={14} className="stroke-[2.2px]" />
                <span>{group.studentsCount} Students registered</span>
              </div>
            </div>

            {/* Last active worksheet assigned info */}
            <div className="border-t border-[#E5E7EB] pt-4 mt-5 flex items-center justify-between text-[10px] font-bold text-[#888888]">
              <div className="truncate pr-4">
                <span className="block text-[9px] uppercase tracking-wider font-black text-[#B0B0B0]">Last Assessment:</span>
                <span className="text-[#1A1A1A] truncate block font-bold">{group.lastAssigned}</span>
              </div>
              <ArrowRight size={14} className="text-[#888888] group-hover:text-primary-orange transition-colors stroke-[2.5px] shrink-0" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
