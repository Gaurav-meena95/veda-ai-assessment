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
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-white p-1 rounded-xl relative select-none">
      
      {/* 1. Dropdown Column */}
      <div className="flex-1 min-w-[200px]">
        <select
          value={config.type}
          onChange={(e) => onUpdate({ ...config, type: e.target.value })}
          className="w-full h-11 px-4 bg-gray-50 border border-[#E5E7EB] text-sm text-text-primary rounded-xl focus:outline-none focus:ring-1 focus:ring-primary-orange focus:border-primary-orange transition-all cursor-pointer font-bold tracking-tight"
        >
          {QUESTION_TYPES.map((qt) => (
            <option key={qt.value} value={qt.value}>
              {qt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Remove (X) Button (Immediately next to select box as in screenshot) */}
      {!isOnlyRow ? (
        <button
          type="button"
          onClick={onRemove}
          className="p-1.5 text-text-secondary hover:text-[#FF4D4D] transition-colors rounded-lg cursor-pointer"
          aria-label="Remove row"
        >
          <X size={16} className="stroke-[2.5]" />
        </button>
      ) : (
        <div className="w-8 h-8" /> // spacing placeholder
      )}

      {/* 2. Spinner: No. of Questions (Exactly matching - N + design in screenshot) */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => adjustQuestions(-1)}
            disabled={config.noOfQuestions <= 1}
            className="w-7 h-7 rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center text-[#888888] hover:text-[#1A1A1A] disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-90 cursor-pointer shadow-2xs"
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
            className="w-7 h-7 rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center text-[#888888] hover:text-[#1A1A1A] disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-90 cursor-pointer shadow-2xs"
          >
            <Plus size={12} className="stroke-[3]" />
          </button>
        </div>
      </div>

      {/* 3. Spinner: Marks per Question (Exactly matching - M + design in screenshot) */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => adjustMarks(-1)}
            disabled={config.marks <= 1}
            className="w-7 h-7 rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center text-[#888888] hover:text-[#1A1A1A] disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-90 cursor-pointer shadow-2xs"
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
            className="w-7 h-7 rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center text-[#888888] hover:text-[#1A1A1A] disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-90 cursor-pointer shadow-2xs"
          >
            <Plus size={12} className="stroke-[3]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionTypeRow;
