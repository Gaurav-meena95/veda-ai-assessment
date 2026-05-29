'use client';

import React from 'react';
import { Section } from '@/types';

interface SectionBlockProps {
  section: Section;
}

export const SectionBlock: React.FC<SectionBlockProps> = ({ section }) => {
  return (
    <div className="space-y-6 py-6 border-b border-gray-100 last:border-b-0 last:pb-0 first:pt-0 font-sans">
      
      {/* 1. Centered Section Headings matching screenshot */}
      <div className="text-center space-y-1 select-none">
        <h3 className="font-black text-lg tracking-tight text-[#1A1A1A]">
          {section.title}
        </h3>
        <h4 className="text-sm font-bold text-[#1A1A1A]">
          {section.questionType}
        </h4>
        {section.instruction && (
          <p className="text-xs text-[#6B7280] italic leading-relaxed">
            {section.instruction}
          </p>
        )}
      </div>

      {/* 2. Numbered questions list inline style (1. [Easy] Text [M Marks]) */}
      <div className="space-y-3 pl-1">
        {section.questions.map((question) => (
          <div 
            key={question.number} 
            className="text-sm text-[#1A1A1A] leading-relaxed flex items-start gap-2 py-1"
          >
            <span className="font-bold shrink-0">{question.number}.</span>
            <p className="font-medium">
              <span className="font-bold text-gray-500 mr-1">[{question.difficulty}]</span>
              {question.text}
              <span className="font-bold text-[#1A1A1A] ml-1.5">[{question.marks} {question.marks === 1 ? 'Mark' : 'Marks'}]</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionBlock;
