'use client';

import React from 'react';
import { Section } from '@/types';
import Badge from '@/components/ui/Badge';

interface SectionBlockProps {
  section: Section;
}

export const SectionBlock: React.FC<SectionBlockProps> = ({ section }) => {
  return (
    <div className="space-y-6 py-6 border-b border-border-custom/50 last:border-b-0 last:pb-0 first:pt-0">
      
      {/* Centered Heading */}
      <div className="text-center space-y-1.5 select-none">
        <h3 className="font-black text-sm tracking-widest uppercase text-text-primary">
          {section.title}
        </h3>
        <h4 className="text-2xs font-extrabold text-text-secondary uppercase tracking-wider">
          {section.questionType}
        </h4>
        {section.instruction && (
          <p className="text-xs text-text-secondary italic leading-relaxed">
            {section.instruction}
          </p>
        )}
      </div>

      {/* Numbered questions list */}
      <ol className="space-y-4 pl-1">
        {section.questions.map((question) => (
          <li 
            key={question.number} 
            className="text-sm text-text-primary flex items-start justify-between gap-6 pl-2 py-1 hover:bg-gray-50/50 rounded-lg transition-colors group"
          >
            {/* Question Text */}
            <div className="flex items-start gap-3">
              <span className="font-bold text-text-primary group-hover:text-primary-orange transition-colors">
                Q{question.number}.
              </span>
              <p className="font-semibold leading-relaxed text-text-primary/90">
                {question.text}
              </p>
            </div>

            {/* Badges & Marks info */}
            <div className="flex items-center gap-2.5 shrink-0 mt-0.5">
              <Badge difficulty={question.difficulty} />
              <span className="text-3xs font-extrabold text-text-secondary bg-gray-100/70 border border-border-custom px-2 py-1 rounded-md uppercase tracking-wider">
                {question.marks} {question.marks === 1 ? 'Mark' : 'Marks'}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default SectionBlock;
