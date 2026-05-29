'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Users, 
  Sparkles, 
  BookOpen, 
  Plus, 
  ArrowRight, 
  Clock, 
  Settings as SettingsIcon,
  Loader2
} from 'lucide-react';
import { useAssignmentStore } from '@/store/useAssignmentStore';
import { getAssignments } from '@/lib/api';
import { format, parseISO } from 'date-fns';

export default function Home() {
  const { assignments, setAssignments } = useAssignmentStore();
  const [loading, setLoading] = useState(true);

  // Fetch latest assignments on mount
  useEffect(() => {
    const fetchLatest = async () => {
      try {
        setLoading(true);
        const data = await getAssignments();
        setAssignments(data);
      } catch (err) {
        console.error('Error fetching dashboard assignments:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLatest();
  }, [setAssignments]);

  const formatDateString = (dateString: string) => {
    try {
      if (!dateString) return 'N/A';
      if (/^\d{2}-\d{2}-\d{4}$/.test(dateString)) return dateString;
      const date = parseISO(dateString);
      return format(date, 'dd-MM-yyyy');
    } catch {
      return dateString || 'N/A';
    }
  };

  // Get 3 most recent assignments
  const recentAssignments = assignments.slice(0, 3);

  return (
    <div className="space-y-8 select-none font-sans max-w-4xl mx-auto py-2 animate-in fade-in duration-200">
      
      {/* 1. Dashboard Welcome Heading */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-active-green rounded-full shadow-xs shadow-green-500/50 animate-pulse" />
          <h1 className="text-2xl font-black tracking-tight text-text-primary">
            Welcome back, John Doe!
          </h1>
        </div>
        <p className="text-xs font-semibold text-[#888888]">
          Here is your VedaAI teaching overview for Delhi Public School, Bokaro Steel City.
        </p>
      </div>

      {/* 2. Key Statistics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Total Assignments */}
        <div className="bg-white border border-[#E5E7EB] rounded-[24px] p-6 flex items-center gap-5 shadow-2xs hover:shadow-xs transition-all duration-200">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-primary-orange">
            <FileText size={22} className="stroke-[2.2px]" />
          </div>
          <div>
            <span className="block text-[10px] font-black text-[#888888] uppercase tracking-widest">
              Total Assessments
            </span>
            <span className="text-2xl font-black text-[#1A1A1A]">
              {loading ? '...' : assignments.length}
            </span>
          </div>
        </div>

        {/* Card 2: Active Groups */}
        <div className="bg-white border border-[#E5E7EB] rounded-[24px] p-6 flex items-center gap-5 shadow-2xs hover:shadow-xs transition-all duration-200">
          <div className="w-12 h-12 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center text-green-600">
            <Users size={22} className="stroke-[2.2px]" />
          </div>
          <div>
            <span className="block text-[10px] font-black text-[#888888] uppercase tracking-widest">
              Active Classes
            </span>
            <span className="text-2xl font-black text-[#1A1A1A]">
              3
            </span>
          </div>
        </div>

        {/* Card 3: AI Credits */}
        <div className="bg-white border border-[#E5E7EB] rounded-[24px] p-6 flex items-center gap-5 shadow-2xs hover:shadow-xs transition-all duration-200">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
            <Sparkles size={22} className="stroke-[2.2px] fill-purple-100" />
          </div>
          <div>
            <span className="block text-[10px] font-black text-[#888888] uppercase tracking-widest">
              AI Generation
            </span>
            <span className="text-sm font-black text-[#1A1A1A] bg-purple-100/60 text-purple-700 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Unlimited
            </span>
          </div>
        </div>
      </div>

      {/* 3. Main Body Split Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-8">
        
        {/* Left Column: Recent Assessments feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-[#1A1A1A] tracking-tight">
              Recent Assessments
            </h3>
            <Link href="/assignments" className="text-xs font-black text-primary-orange hover:underline flex items-center gap-1">
              <span>View All</span>
              <ArrowRight size={12} className="stroke-[3]" />
            </Link>
          </div>

          {loading ? (
            <div className="bg-white border border-[#E5E7EB] rounded-[24px] p-12 flex flex-col items-center justify-center text-center">
              <Loader2 className="w-8 h-8 text-primary-orange animate-spin mb-3" />
              <p className="text-xs font-semibold text-[#888888]">Loading feed...</p>
            </div>
          ) : recentAssignments.length === 0 ? (
            <div className="bg-white border border-[#E5E7EB] rounded-[24px] p-10 text-center select-none space-y-4">
              <p className="text-xs font-semibold text-[#888888]">
                No recent question papers found. Run the generator to draft one!
              </p>
              <Link href="/assignments/create" passHref>
                <button className="bg-[#1A1A1A] hover:bg-black text-white px-5 py-2.5 rounded-full font-bold text-2xs shadow-md active:scale-95 duration-100">
                  + Create Assignment
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentAssignments.map((paper) => (
                <Link key={paper._id} href={`/assignments/${paper._id}`} className="block">
                  <div className="bg-white border border-[#E5E7EB] hover:border-gray-300 rounded-[20px] p-5 flex items-center justify-between gap-4 shadow-2xs hover:shadow-xs transition-all duration-200">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-[#888888] border border-[#E5E7EB]">
                        <BookOpen size={16} />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-[#1A1A1A] leading-snug tracking-tight">
                          {paper.title || 'Untitled Assessment'}
                        </h4>
                        <p className="text-[10px] font-semibold text-[#888888] mt-0.5">
                          Subject: {paper.subject} • Class: {paper.className}
                        </p>
                      </div>
                    </div>

                    <div className="text-right flex flex-col items-end gap-1.5">
                      <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                        paper.status === 'generated' ? 'bg-green-50 text-green-700 border border-green-150' : 
                        paper.status === 'failed' ? 'bg-red-50 text-red-700 border border-red-150' : 
                        'bg-yellow-50 text-yellow-700 border border-yellow-150'
                      }`}>
                        {paper.status}
                      </span>
                      <span className="text-[9px] font-bold text-[#888888] flex items-center gap-1">
                        <Clock size={10} />
                        {formatDateString(paper.dueDate)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: AI Teacher Toolkit Quick Links */}
        <div className="space-y-4">
          <h3 className="text-base font-black text-[#1A1A1A] tracking-tight">
            AI Toolkit Quick Actions
          </h3>

          <div className="space-y-3">
            {/* Quick Action 1: Create Question Paper */}
            <Link href="/assignments/create" className="block">
              <div className="bg-gradient-to-br from-[#1A1A1A] to-black text-white hover:to-gray-900 rounded-[20px] p-5 shadow-md flex items-center justify-between group transition-all duration-150">
                <div className="space-y-1">
                  <h4 className="text-sm font-black tracking-tight flex items-center gap-1.5">
                    <Sparkles size={14} className="text-primary-orange fill-primary-orange" />
                    <span>Create Exam Paper</span>
                  </h4>
                  <p className="text-[10px] text-gray-300 font-semibold leading-relaxed">
                    Generate structured CBSE standard worksheets.
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-white/20 transition-all">
                  <Plus size={16} />
                </div>
              </div>
            </Link>

            {/* Quick Action 2: Performance Analyzer (Locked Premium) */}
            <div className="bg-white border border-[#E5E7EB] rounded-[20px] p-5 relative overflow-hidden flex items-center justify-between">
              <div className="space-y-1 opacity-50">
                <h4 className="text-sm font-black tracking-tight text-[#1A1A1A]">
                  Rubric Analyzer
                </h4>
                <p className="text-[10px] text-[#888888] font-semibold leading-relaxed">
                  Analyze and grade student sheets dynamically.
                </p>
              </div>
              <span className="text-[9px] font-black uppercase tracking-wider text-purple-700 bg-purple-50 border border-purple-100 px-2 py-0.5 rounded-md">
                Coming Soon
              </span>
            </div>

            {/* Quick Action 3: Settings */}
            <Link href="/settings" className="block">
              <div className="bg-gray-50 border border-[#E5E7EB] hover:bg-gray-100 rounded-[20px] p-5 flex items-center justify-between transition-all duration-150">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center text-[#6B7280]">
                    <SettingsIcon size={14} />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-[#1A1A1A] tracking-tight">
                      Verify API credentials
                    </h4>
                    <p className="text-[9px] font-bold text-[#888888] mt-0.5">
                      Configure Groq key or database settings.
                    </p>
                  </div>
                </div>
                <ArrowRight size={14} className="text-[#888888] stroke-[2.5]" />
              </div>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
