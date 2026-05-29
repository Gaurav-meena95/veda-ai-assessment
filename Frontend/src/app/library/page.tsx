'use client';

import React, { useState } from 'react';
import { Search, FileText, Download, Clock, Database, Eye } from 'lucide-react';

const LIBRARY_ITEMS = [
  { id: '1', title: 'NCERT Class 8 Science - Chemical Effects of Electric Current', type: 'PDF Document', size: '4.2 MB', date: 'Yesterday', iconColor: 'bg-red-50 text-red-500 border-red-100' },
  { id: '2', title: 'CBSE Class 5 English - Grammar Workbook', type: 'Word Document', size: '1.8 MB', date: '3 days ago', iconColor: 'bg-blue-50 text-blue-500 border-blue-100' },
  { id: '3', title: 'Delhi Public School - Science Blueprint Class 8', type: 'Text File', size: '12 KB', date: '1 week ago', iconColor: 'bg-gray-50 text-gray-500 border-gray-150' }
];

export default function LibraryPage() {
  const [search, setSearch] = useState('');

  const filteredItems = LIBRARY_ITEMS.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 select-none font-sans max-w-4xl mx-auto py-2 animate-in fade-in duration-200">
      
      {/* 1. Header with pulsing green dot */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-active-green rounded-full shadow-xs shadow-green-500/50 animate-pulse" />
          <h1 className="text-2xl font-black tracking-tight text-text-primary">
            My Library
          </h1>
        </div>
        <p className="text-xs font-semibold text-[#888888]">
          Manage and access chapters, question blueprints, and text documents uploaded under your profile.
        </p>
      </div>

      {/* 2. Search box */}
      <div className="relative max-w-xs">
        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#888888]">
          <Search size={16} />
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search textbook materials"
          className="w-full h-11 pl-10 pr-4 bg-white border border-[#E5E7EB] text-sm text-[#1A1A1A] placeholder:text-[#888888] rounded-full focus:outline-none focus:ring-1 focus:ring-primary-orange focus:border-primary-orange transition-all shadow-2xs"
        />
      </div>

      {/* 3. Sleek File List */}
      <div className="bg-white border border-[#E5E7EB] rounded-[24px] overflow-hidden shadow-2xs">
        
        {/* Table/List Header */}
        <div className="hidden sm:grid grid-cols-[1fr_150px_130px_100px] gap-4 px-6 py-4 bg-gray-50 border-b border-[#E5E7EB] text-[10px] font-black text-[#888888] uppercase tracking-wider">
          <span>Resource Name</span>
          <span>Format</span>
          <span>Size</span>
          <span className="text-right">Actions</span>
        </div>

        {/* Rows List */}
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center select-none text-xs font-semibold text-[#888888]">
            No reference materials found in library matching &quot;{search}&quot;.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredItems.map((item) => (
              <div 
                key={item.id}
                className="grid grid-cols-1 sm:grid-cols-[1fr_150px_130px_100px] gap-3 sm:gap-4 items-center px-6 py-4.5 hover:bg-gray-50/50 transition-colors"
              >
                
                {/* Column 1: Document details & Icon */}
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${item.iconColor}`}>
                    <FileText size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-[#1A1A1A] leading-snug tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-[9px] font-bold text-[#888888] mt-0.5 flex items-center gap-1">
                      <Clock size={10} />
                      Added: {item.date}
                    </p>
                  </div>
                </div>

                {/* Column 2: Format Tag */}
                <div className="text-xs font-bold text-[#6B7280]">
                  {item.type}
                </div>

                {/* Column 3: File Size */}
                <div className="text-xs font-bold text-[#6B7280] flex items-center gap-1">
                  <Database size={12} className="text-[#888888]" />
                  <span>{item.size}</span>
                </div>

                {/* Column 4: Download trigger aligned right */}
                <div className="flex items-center justify-end gap-3 sm:text-right">
                  <button 
                    className="p-2 hover:bg-gray-100 rounded-lg text-[#888888] hover:text-[#1A1A1A] active:scale-90 transition-all cursor-pointer border border-[#E5E7EB]"
                    aria-label="View doc"
                  >
                    <Eye size={13} />
                  </button>
                  <button 
                    className="p-2 hover:bg-gray-100 rounded-lg text-primary-orange hover:text-orange-700 active:scale-90 transition-all cursor-pointer border border-[#E5E7EB]"
                    aria-label="Download doc"
                  >
                    <Download size={13} />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
