'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, BarChart, CalendarRange, PenTool, ArrowRight, ShieldAlert } from 'lucide-react';

const TOOLS = [
  {
    id: 'assessment',
    title: 'Assessment Creator',
    desc: 'Generate premium, structured CBSE/school question papers and worksheets dynamically from reference files or guidelines.',
    icon: Sparkles,
    color: 'from-orange-500/10 to-orange-600/5 border-orange-200/60 text-primary-orange',
    badge: 'Fully Active',
    active: true,
    link: '/assignments/create'
  },
  {
    id: 'rubrics',
    title: 'Rubrics Generator',
    desc: 'Formulate detailed assessment evaluation matrices and grading rubrics matching international board parameters.',
    icon: BarChart,
    color: 'from-purple-500/5 to-purple-650/5 border-purple-200/40 text-purple-600',
    badge: 'Coming Soon',
    active: false,
    link: '#'
  },
  {
    id: 'lesson_plan',
    title: 'Lesson Planner',
    desc: 'Create highly detailed day-by-day class schedules, learning objectives, and interactive worksheets in seconds.',
    icon: CalendarRange,
    color: 'from-green-500/5 to-green-650/5 border-green-200/40 text-green-600',
    badge: 'Coming Soon',
    active: false,
    link: '#'
  },
  {
    id: 'feedback',
    title: 'Report Card Assistant',
    desc: 'Draft comprehensive student feedback cards, report card comments, and custom developmental advice logs.',
    icon: PenTool,
    color: 'from-blue-500/5 to-blue-650/5 border-blue-200/40 text-blue-600',
    badge: 'Coming Soon',
    active: false,
    link: '#'
  }
];

export default function Toolkit() {
  return (
    <div className="space-y-8 select-none font-sans max-w-4xl mx-auto py-2 animate-in fade-in duration-200">
      
      {/* 1. Page Header with pulsing dot */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-active-green rounded-full shadow-xs shadow-green-500/50 animate-pulse" />
          <h1 className="text-2xl font-black tracking-tight text-text-primary">
            AI Teacher&apos;s Toolkit
          </h1>
        </div>
        <p className="text-xs font-semibold text-[#888888]">
          Access advanced intelligence modules built exclusively for CBSE educators at Delhi Public School.
        </p>
      </div>

      {/* 2. AI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
        {TOOLS.map((tool) => {
          const Icon = tool.icon;
          
          const CardContent = (
            <div className={`border rounded-[28px] p-8 flex flex-col justify-between min-h-[220px] transition-all duration-200 bg-white relative overflow-hidden group ${
              tool.active 
                ? 'hover:border-primary-orange hover:shadow-xs cursor-pointer border-[#E5E7EB]' 
                : 'opacity-70 border-[#E5E7EB] hover:opacity-85'
            }`}>
              {/* Background gradient subtle accents */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-30 group-hover:opacity-50 transition-opacity`} />

              <div className="relative z-10 space-y-4">
                {/* Header card icon and Badge */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-white rounded-2xl border border-[#E5E7EB] flex items-center justify-center shadow-2xs">
                    <Icon size={22} className="stroke-[2.2px]" />
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                    tool.active 
                      ? 'bg-orange-100 text-primary-orange border border-orange-200' 
                      : 'bg-gray-150 text-[#888888] border border-gray-250'
                  }`}>
                    {tool.badge}
                  </span>
                </div>

                {/* Title */}
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-[#1A1A1A] tracking-tight group-hover:text-black">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-[#888888] font-semibold leading-relaxed">
                    {tool.desc}
                  </p>
                </div>
              </div>

              {/* Bottom Row action indicator */}
              <div className="relative z-10 border-t border-gray-100 pt-4 mt-6 flex items-center justify-between text-xs font-black text-[#1A1A1A]">
                <span>{tool.active ? 'Launch Generator' : 'Locked Feature'}</span>
                <ArrowRight size={15} className={`transition-transform duration-200 stroke-[2.5px] ${
                  tool.active ? 'group-hover:translate-x-1.5 text-primary-orange' : 'text-[#888888]'
                }`} />
              </div>
            </div>
          );

          return tool.active ? (
            <Link key={tool.id} href={tool.link} className="block">
              {CardContent}
            </Link>
          ) : (
            <div key={tool.id}>
              {CardContent}
            </div>
          );
        })}
      </div>
    </div>
  );
}
