'use client';

import React, { useState } from 'react';
import { Search, FileText, Download, Clock, Database, Eye } from 'lucide-react';
import { toast } from 'react-hot-toast';

const LIBRARY_ITEMS = [
  { id: '1', title: 'NCERT Class 8 Science - Chemical Effects of Electric Current', type: 'PDF Document', size: '4.2 MB', date: 'Yesterday', iconColor: 'bg-red-50 text-red-500 border-red-100' },
  { id: '2', title: 'CBSE Class 5 English - Grammar Workbook', type: 'Word Document', size: '1.8 MB', date: '3 days ago', iconColor: 'bg-blue-50 text-blue-500 border-blue-100' },
  { id: '3', title: 'Delhi Public School - Science Blueprint Class 8', type: 'Text File', size: '12 KB', date: '1 week ago', iconColor: 'bg-gray-50 text-gray-500 border-gray-150' }
];

const RESOURCE_CONTENT: Record<string, { title: string; subtitle: string; content: string[] }> = {
  '1': {
    title: 'Chemical Effects of Electric Current',
    subtitle: 'NCERT Class 8 Science - Chapter 14',
    content: [
      '1. Introduction: We have been told that some materials allow electric current to pass through them while others do not. The materials which allow electric current to pass through them are good conductors of electricity. On the other hand, materials which do not allow electric current to pass through them easily are poor conductors of electricity.',
      '2. Do Liquids Conduct Electricity? To test whether a liquid allows electric current to pass through it or not, we can use a standard tester. When the liquid between the two ends of the tester allows the electric current to pass, the circuit of the tester becomes complete. The current flows in the circuit and the bulb glows. When the liquid does not allow the electric current to pass, the bulb does not glow.',
      '3. Chemical Effects: When electric current is passed through a conducting solution, chemical reactions take place. As a result, bubbles of a gas may be formed on the electrodes. Deposits of metal may be seen on electrodes. Changes of colour of solutions may occur. The reaction would depend on what solution and electrodes are used. These are some of the chemical effects of the electric current.'
    ]
  },
  '2': {
    title: 'English Grammar Workbook',
    subtitle: 'CBSE Class 5 English - Grammar Companion',
    content: [
      '1. Nouns & Adjectives: An adjective is a word that describes or modifies a noun or pronoun. Adjectives can specify the quality, quantity, size, shape, color, or origin of a noun. Example: "The Orange sun set slowly." Here, "orange" is an adjective describing the noun "sun".',
      '2. Similes vs Metaphors: A simile is a figure of speech that directly compares two things using words such as "like" or "as". Example: "Her smile is as bright as the sun." A metaphor is a figure of speech that makes an implicit, implied, or hidden comparison between two things that are unrelated, but share some common characteristics. Example: "Laughter is the best medicine."',
      '3. Active & Passive Voices: In active voice, the subject performs the action denoted by the verb. Example: "The teacher graded the paper." In passive voice, the subject is the recipient of the action. Example: "The paper was graded by the teacher."'
    ]
  },
  '3': {
    title: 'DPS Science Blueprint Class 8',
    subtitle: 'Delhi Public School, Bokaro Steel City - blueprint specification',
    content: [
      '1. Objective & Marking Scheme: This document outlines the curriculum weightage for the Class 8 Science Term Examinations. Total Marks: 80. Duration: 3 Hours.',
      '2. Section Breakdown: Section A (MCQs) consists of 20 questions carrying 1 mark each. Section B (Short Answer Types) consists of 6 questions carrying 3 marks each. Section C (Long Answer Types) consists of 4 questions carrying 5 marks each. Section D (Diagrammatic/Case-based Types) consists of 3 questions carrying 4 marks each.',
      '3. Core Units Covered: Chemical Effects of Electric Current (15%), Light & Optics (25%), Cell Structure and Functions (20%), Force and Pressure (20%), Synthetic Fibres and Plastics (20%). Ensure all NCERT exemplar questions are fully prepared.'
    ]
  }
};

export default function LibraryPage() {
  const [search, setSearch] = useState('');
  const [activeViewItem, setActiveViewItem] = useState<typeof LIBRARY_ITEMS[0] | null>(null);

  const filteredItems = LIBRARY_ITEMS.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.type.toLowerCase().includes(search.toLowerCase())
  );

  const handleDownload = (item: typeof LIBRARY_ITEMS[0]) => {
    const data = RESOURCE_CONTENT[item.id] || {
      title: item.title,
      subtitle: item.type,
      content: ['This is a mock textbook resource for school assessments.']
    };
    
    const fileContent = `======================================================
VEDAAI DIGITAL LIBRARY RESOURCE
======================================================
Title: ${data.title}
Subtitle: ${data.subtitle}
Type: ${item.type}
Size: ${item.size}
Downloaded On: ${new Date().toLocaleString()}

------------------------------------------------------
CONTENT SPECIFICATIONS:
------------------------------------------------------
${data.content.join('\n\n')}

======================================================
Generated via VedaAI. Copyright 2026. All rights reserved.
======================================================`;

    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success(`Successfully downloaded: ${item.title}`);
  };

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
        <div className="hidden sm:grid grid-cols-[1fr_150px_130px_100px] gap-4 px-6 py-4 bg-gray-50 border-b border-[#E5E7EB] text-[10px] font-black text-[#888888] uppercase tracking-wider font-sans">
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
                    onClick={() => setActiveViewItem(item)}
                    className="p-2 hover:bg-gray-100 rounded-lg text-[#888888] hover:text-[#1A1A1A] active:scale-90 transition-all cursor-pointer border border-[#E5E7EB]"
                    aria-label="View doc"
                  >
                    <Eye size={13} />
                  </button>
                  <button 
                    onClick={() => handleDownload(item)}
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

      {/* Dynamic Preview Modal (See button trigger) */}
      {activeViewItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[24px] border border-border-custom max-w-2xl w-full max-h-[80vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 font-sans">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-border-custom flex items-center justify-between bg-gray-50/50">
              <div>
                <span className="text-[9px] font-black uppercase tracking-wider text-primary-orange">
                  VedaAI Document Reader
                </span>
                <h3 className="text-sm font-black text-text-primary leading-tight mt-0.5">
                  {activeViewItem.title}
                </h3>
              </div>
              <button 
                onClick={() => setActiveViewItem(null)}
                className="w-8 h-8 rounded-full border border-border-custom hover:bg-gray-100 flex items-center justify-center text-text-secondary hover:text-text-primary transition-all cursor-pointer font-bold text-xs"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs text-text-primary leading-relaxed">
              <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 flex items-center gap-2">
                <span className="text-primary-orange font-bold">✦</span>
                <span className="text-[10px] text-orange-850 font-bold">
                  Textbook chapters can be seamlessly attached to any assignment blueprint during generation for precise mapping.
                </span>
              </div>
              
              <div className="space-y-4 font-semibold text-text-secondary">
                {RESOURCE_CONTENT[activeViewItem.id]?.content.map((paragraph, index) => (
                  <p key={index} className="bg-gray-50/50 p-4 border border-border-custom rounded-xl">
                    {paragraph}
                  </p>
                )) || <p>No preview content available.</p>}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-border-custom flex items-center justify-end gap-3 bg-gray-50/50">
              <button 
                onClick={() => {
                  handleDownload(activeViewItem);
                }}
                className="flex items-center gap-2 bg-[#1A1A1A] hover:bg-black text-white px-5 py-2.5 rounded-full font-bold text-xs shadow-md transition-all active:scale-95 duration-100 cursor-pointer"
              >
                <Download size={13} />
                <span>Download Resource</span>
              </button>
              <button 
                onClick={() => setActiveViewItem(null)}
                className="px-5 py-2.5 border border-border-custom hover:bg-gray-50 rounded-full font-bold text-xs text-text-primary transition-all cursor-pointer"
              >
                Close Reader
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
