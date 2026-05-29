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
    <div className="space-y-8 select-none">
      
      {/* 1. Main Question Paper Card */}
      <div className="bg-white border-2 border-text-primary/10 rounded-2xl p-8 md:p-12 shadow-sm font-serif text-text-primary max-w-4xl mx-auto relative overflow-hidden print:shadow-none print:border-none">
        
        {/* Exam Board Header Frame */}
        <div className="border-b-4 border-double border-text-primary pb-6 text-center space-y-2 select-none">
          <h2 className="text-2xl font-black uppercase tracking-wide">
            {schoolHeader.schoolName}
          </h2>
          <div className="flex items-center justify-center gap-2 text-sm font-extrabold uppercase tracking-widest text-text-secondary">
            <span>Subject: {schoolHeader.subject}</span>
            <span className="font-light">|</span>
            <span>Class: {schoolHeader.className}</span>
          </div>
        </div>

        {/* Time and Maximum Marks info row */}
        <div className="flex items-center justify-between border-b border-text-primary/20 py-3 text-xs font-extrabold uppercase tracking-wider text-text-secondary select-none">
          <span>Time Allowed: {timeAllowed}</span>
          <span>Maximum Marks: {maxMarks}</span>
        </div>

        {/* Exam instructions panel */}
        <div className="bg-gray-50 border border-border-custom p-4 rounded-xl text-xs font-semibold text-text-secondary leading-relaxed my-6 select-none">
          <span className="font-extrabold text-text-primary block mb-1">General Instructions:</span>
          <p>{instructions || "All questions are compulsory unless stated otherwise."}</p>
        </div>

        {/* Student identification forms */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm font-bold text-text-secondary border-b border-text-primary/10 pb-6 my-6 select-none">
          <div className="flex items-end gap-2">
            <span>Name:</span>
            <span className="flex-1 border-b border-dashed border-text-secondary/50 h-5" />
          </div>
          <div className="flex items-end gap-2">
            <span>Roll Number:</span>
            <span className="flex-1 border-b border-dashed border-text-secondary/50 h-5" />
          </div>
          <div className="flex items-end gap-2">
            <span>Section:</span>
            <span className="w-16 border-b border-dashed border-text-secondary/50 h-5" />
          </div>
        </div>

        {/* Dynamic section renderer */}
        <div className="divide-y divide-border-custom/50 space-y-4">
          {sections.map((section, idx) => (
            <SectionBlock key={idx} section={section} />
          ))}
        </div>

        {/* Exam End Marker */}
        <div className="border-t-4 border-double border-text-primary/20 pt-8 mt-12 text-center select-none">
          <span className="font-black text-xs tracking-[0.3em] uppercase text-text-secondary">
            --- End of Question Paper ---
          </span>
        </div>
      </div>

      {/* 2. Answer Key Card (rendered underneath) */}
      {answerKey && answerKey.length > 0 && (
        <div className="bg-white border border-border-custom rounded-2xl p-8 shadow-sm max-w-4xl mx-auto select-none">
          <h3 className="text-base font-extrabold text-text-primary uppercase tracking-wider mb-4 border-b border-border-custom pb-3 flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-primary-orange rounded-full" />
            <span>Answer Key</span>
          </h3>
          
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 pl-1">
            {answerKey.map((item) => (
              <li 
                key={item.number} 
                className="text-sm py-1.5 flex items-start gap-3 border-b border-gray-50 last:border-b-0 hover:bg-gray-50/50 px-2 rounded-lg transition-colors"
              >
                <span className="font-extrabold text-primary-orange min-w-[28px]">
                  Ans {item.number}.
                </span>
                <p className="font-semibold text-text-primary">
                  {item.answer}
                </p>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default QuestionPaper;
