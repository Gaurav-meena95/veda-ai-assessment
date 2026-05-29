'use client';

import React from 'react';
import { GeneratedPaper } from '@/types';
import SectionBlock from './SectionBlock';

interface QuestionPaperProps {
  paper: GeneratedPaper;
}

export const QuestionPaper: React.FC<QuestionPaperProps> = ({ paper }) => {
  const { schoolHeader, timeAllowed, maxMarks, instructions, sections, answerKey } = paper;

  return (
    <div className="space-y-8 select-none font-sans max-w-3xl mx-auto">
      
      {/* 1. Main Printable Question Paper Card */}
      <div className="bg-white border border-[#E5E7EB] rounded-[32px] p-10 md:p-14 shadow-[0_8px_30px_rgb(0,0,0,0.02)] text-text-primary relative overflow-hidden print:shadow-none print:border-none">
        
        {/* Exam Board Header Frame (Delhi Public School...) */}
        <div className="text-center space-y-1 pb-4">
          <h2 className="text-2xl font-black text-[#1A1A1A] tracking-tight">
            {schoolHeader.schoolName || 'Delhi Public School, Sector-4, Bokaro'}
          </h2>
          <div className="text-sm font-bold text-[#1A1A1A] flex items-center justify-center gap-1.5 mt-1.5">
            <span>Subject: {schoolHeader.subject}</span>
          </div>
          <div className="text-sm font-bold text-[#1A1A1A]">
            <span>Class: {schoolHeader.className}</span>
          </div>
        </div>

        {/* Time and Maximum Marks info row aligned left & right */}
        <div className="flex items-center justify-between border-t border-b border-gray-150 py-3 text-xs font-black text-[#1A1A1A] tracking-tight mt-6">
          <span>Time Allowed: {timeAllowed || '45 minutes'}</span>
          <span>Maximum Marks: {maxMarks}</span>
        </div>

        {/* Exam instructions panel */}
        <p className="text-xs font-black text-[#1A1A1A] leading-relaxed my-5 tracking-tight">
          {instructions || "All questions are compulsory unless stated otherwise."}
        </p>

        {/* Student identification forms (Underlined blanks) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-black text-[#1A1A1A] tracking-tight pb-6 my-6 border-b border-gray-100">
          <div className="flex items-end gap-1.5">
            <span>Name:</span>
            <span className="flex-1 border-b border-[#1A1A1A] h-4" />
          </div>
          <div className="flex items-end gap-1.5">
            <span>Roll Number:</span>
            <span className="flex-1 border-b border-[#1A1A1A] h-4" />
          </div>
          <div className="flex items-end gap-1.5">
            <span>Class: {schoolHeader.className} Section:</span>
            <span className="w-16 border-b border-[#1A1A1A] h-4" />
          </div>
        </div>

        {/* Dynamic section renderer */}
        <div className="space-y-6 mt-6">
          {sections.map((section, idx) => (
            <SectionBlock key={idx} section={section} />
          ))}
        </div>

        {/* Exam End Marker (Exactly matches screenshot) */}
        <div className="pt-8 mt-10 text-center border-t border-gray-100">
          <span className="font-black text-xs text-[#1A1A1A] tracking-wider uppercase">
            End of Question Paper
          </span>
        </div>

        {/* 2. Answer Key Card rendered inside the same paper block */}
        {answerKey && answerKey.length > 0 && (
          <div className="pt-10 mt-10 border-t-2 border-dashed border-gray-200">
            <h3 className="text-base font-black text-[#1A1A1A] tracking-tight mb-4">
              Answer Key:
            </h3>
            
            <div className="space-y-4 pl-1">
              {answerKey.map((item) => (
                <div 
                  key={item.number} 
                  className="text-sm flex items-start gap-2 text-[#1A1A1A] leading-relaxed"
                >
                  <span className="font-bold shrink-0">{item.number}.</span>
                  <p className="font-medium text-[#1A1A1A]/90">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionPaper;
