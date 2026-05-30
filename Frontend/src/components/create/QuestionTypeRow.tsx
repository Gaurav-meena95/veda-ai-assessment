'use client';

import React from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { QuestionTypeConfig } from '@/types';

interface QuestionTypeRowProps {
  index: number;
  config: QuestionTypeConfig;
  onUpdate: (updated: QuestionTypeConfig) => void;
  onRemove: () => void;
  isOnlyRow: boolean;
}

const QUESTION_TYPES = [
  { value: 'Multiple Choice Questions', label: 'Multiple Choice Questions' },
  { value: 'Short Questions', label: 'Short Questions' },
  { value: 'Diagram/Graph-Based Questions', label: 'Diagram/Graph-Based Questions' },
  { value: 'Numerical Problems', label: 'Numerical Problems' },
  { value: 'Long Questions', label: 'Long Questions' },
  { value: 'Essay-Based Questions', label: 'Essay-Based Questions' }
];

export const QuestionTypeRow: React.FC<QuestionTypeRowProps> = ({
  config,
  onUpdate,
  onRemove,
  isOnlyRow
}) => {
  
  const adjustQuestions = (amount: number) => {
    const nextVal = Math.min(50, Math.max(1, config.noOfQuestions + amount));
    onUpdate({ ...config, noOfQuestions: nextVal });
  };

  const adjustMarks = (amount: number) => {
    const nextVal = Math.min(20, Math.max(1, config.marks + amount));
    onUpdate({ ...config, marks: nextVal });
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-white sm:bg-transparent p-4 sm:p-1 rounded-[24px] sm:rounded-none border border-border-custom sm:border-none shadow-3xs sm:shadow-none select-none relative font-sans">
      
      {/* Top Header section on mobile: Dropdown option and X Close button */}
      <div className="flex items-center gap-2.5 w-full sm:flex-1 sm:min-w-[200px]">
        <div className="flex-1">
          <select
            value={config.type}
            onChange={(e) => onUpdate({ ...config, type: e.target.value })}
            className="w-full h-11 px-4 bg-gray-50 border border-border-custom text-sm text-text-primary rounded-xl focus:outline-none focus:ring-1 focus:ring-primary-orange focus:border-primary-orange transition-all cursor-pointer font-bold tracking-tight"
          >
            {QUESTION_TYPES.map((qt) => (
              <option key={qt.value} value={qt.value}>
                {qt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Remove (X) button aligned inline on desktop or top right on mobile */}
        {!isOnlyRow ? (
          <button
            type="button"
            onClick={onRemove}
            className="p-2 text-text-secondary hover:text-[#FF4D4D] transition-colors rounded-xl border border-border-custom sm:border-none cursor-pointer bg-white hover:bg-gray-50 shrink-0"
            aria-label="Remove row"
          >
            <X size={16} className="stroke-[2.5]" />
          </button>
        ) : (
          <div className="w-8 h-8 hidden sm:block" />
        )}
      </div>

      {/* Double column numeric adjusters: formatted in a light grey block container on mobile exactly matching Screenshot 1 */}
      <div className="bg-gray-50 border border-[#E5E7EB] sm:border-none sm:bg-transparent p-3.5 sm:p-0 rounded-2xl flex items-center justify-between sm:justify-start gap-4 sm:gap-4 w-full sm:w-auto">
        
        {/* Left Adjuster: No. of Questions */}
        <div className="flex-1 sm:flex-none flex flex-col sm:flex-row items-center sm:items-center gap-1.5 sm:gap-2">
          <span className="text-[9px] font-black uppercase tracking-wider text-[#888888] sm:hidden">
            No. of Questions
          </span>
          <div className="flex items-center gap-2 bg-white sm:bg-transparent px-3 py-1 sm:p-0 rounded-full border border-border-custom sm:border-none w-full justify-between sm:justify-start">
            <button
              type="button"
              onClick={() => adjustQuestions(-1)}
              disabled={config.noOfQuestions <= 1}
              className="w-7 h-7 rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center text-[#888888] hover:text-[#1A1A1A] disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-90 cursor-pointer shadow-3xs"
            >
              <Minus size={12} className="stroke-[3]" />
            </button>
            <span className="w-6 text-center text-xs font-black text-[#1A1A1A]">
              {config.noOfQuestions}
            </span>
            <button
              type="button"
              onClick={() => adjustQuestions(1)}
              disabled={config.noOfQuestions >= 50}
              className="w-7 h-7 rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center text-[#888888] hover:text-[#1A1A1A] disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-90 cursor-pointer shadow-3xs"
            >
              <Plus size={12} className="stroke-[3]" />
            </button>
          </div>
        </div>

        {/* Mobile Spacer vertical bar divider between inputs */}
        <div className="h-8 w-px bg-border-custom sm:hidden" />

        {/* Right Adjuster: Marks per question */}
        <div className="flex-1 sm:flex-none flex flex-col sm:flex-row items-center sm:items-center gap-1.5 sm:gap-2">
          <span className="text-[9px] font-black uppercase tracking-wider text-[#888888] sm:hidden">
            Marks
          </span>
          <div className="flex items-center gap-2 bg-white sm:bg-transparent px-3 py-1 sm:p-0 rounded-full border border-border-custom sm:border-none w-full justify-between sm:justify-start">
            <button
              type="button"
              onClick={() => adjustMarks(-1)}
              disabled={config.marks <= 1}
              className="w-7 h-7 rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center text-[#888888] hover:text-[#1A1A1A] disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-90 cursor-pointer shadow-3xs"
            >
              <Minus size={12} className="stroke-[3]" />
            </button>
            <span className="w-6 text-center text-xs font-black text-[#1A1A1A]">
              {config.marks}
            </span>
            <button
              type="button"
              onClick={() => adjustMarks(1)}
              disabled={config.marks >= 20}
              className="w-7 h-7 rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center text-[#888888] hover:text-[#1A1A1A] disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-90 cursor-pointer shadow-3xs"
            >
              <Plus size={12} className="stroke-[3]" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default QuestionTypeRow;
