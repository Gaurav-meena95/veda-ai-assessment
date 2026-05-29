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
  { value: 'MCQ', label: 'MCQ' },
  { value: 'Short Questions', label: 'Short Questions' },
  { value: 'Long Questions', label: 'Long Questions' },
  { value: 'Diagram/Graph', label: 'Diagram/Graph' },
  { value: 'Numerical Problems', label: 'Numerical Problems' },
  { value: 'Essay', label: 'Essay' }
];

export const QuestionTypeRow: React.FC<QuestionTypeRowProps> = ({
  config,
  onUpdate,
  onRemove,
  isOnlyRow
}) => {
  
  // Number of questions counters (min 1, max 50)
  const adjustQuestions = (amount: number) => {
    const nextVal = Math.min(50, Math.max(1, config.noOfQuestions + amount));
    onUpdate({ ...config, noOfQuestions: nextVal });
  };

  // Marks counters (min 1, max 20)
  const adjustMarks = (amount: number) => {
    const nextVal = Math.min(20, Math.max(1, config.marks + amount));
    onUpdate({ ...config, marks: nextVal });
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-gray-50 border border-border-custom p-4 rounded-xl relative group transition-all duration-150 select-none">
      
      {/* 1. Dropdown Column: Question Type */}
      <div className="flex-1 min-w-[200px]">
        <select
          value={config.type}
          onChange={(e) => onUpdate({ ...config, type: e.target.value })}
          className="w-full h-11 px-3 py-2 bg-white border border-border-custom text-sm text-text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange/50 focus:border-primary-orange transition-all cursor-pointer font-medium"
        >
          {QUESTION_TYPES.map((qt) => (
            <option key={qt.value} value={qt.value}>
              {qt.label}
            </option>
          ))}
        </select>
      </div>

      {/* 2. Counter Column: No. of Questions */}
      <div className="flex items-center gap-2.5">
        <span className="text-2xs font-bold text-text-secondary uppercase tracking-wider block sm:hidden">
          No. of Questions
        </span>
        <div className="flex items-center border border-border-custom bg-white rounded-lg overflow-hidden h-11">
          <button
            type="button"
            onClick={() => adjustQuestions(-1)}
            disabled={config.noOfQuestions <= 1}
            className="w-10 h-full flex items-center justify-center text-text-secondary hover:bg-gray-50 disabled:opacity-30 disabled:pointer-events-none active:bg-gray-100 transition-all cursor-pointer"
          >
            <Minus size={14} />
          </button>
          <span className="w-10 text-center text-sm font-bold text-text-primary">
            {config.noOfQuestions}
          </span>
          <button
            type="button"
            onClick={() => adjustQuestions(1)}
            disabled={config.noOfQuestions >= 50}
            className="w-10 h-full flex items-center justify-center text-text-secondary hover:bg-gray-50 disabled:opacity-30 disabled:pointer-events-none active:bg-gray-100 transition-all cursor-pointer"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* 3. Counter Column: Marks */}
      <div className="flex items-center gap-2.5">
        <span className="text-2xs font-bold text-text-secondary uppercase tracking-wider block sm:hidden">
          Marks per Question
        </span>
        <div className="flex items-center border border-border-custom bg-white rounded-lg overflow-hidden h-11">
          <button
            type="button"
            onClick={() => adjustMarks(-1)}
            disabled={config.marks <= 1}
            className="w-10 h-full flex items-center justify-center text-text-secondary hover:bg-gray-50 disabled:opacity-30 disabled:pointer-events-none active:bg-gray-100 transition-all cursor-pointer"
          >
            <Minus size={14} />
          </button>
          <span className="w-10 text-center text-sm font-bold text-text-primary">
            {config.marks}
          </span>
          <button
            type="button"
            onClick={() => adjustMarks(1)}
            disabled={config.marks >= 20}
            className="w-10 h-full flex items-center justify-center text-text-secondary hover:bg-gray-50 disabled:opacity-30 disabled:pointer-events-none active:bg-gray-100 transition-all cursor-pointer"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* Remove (X) Button */}
      {!isOnlyRow && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute -top-2 -right-2 sm:relative sm:top-auto sm:right-auto p-1.5 bg-red-100 hover:bg-red-200 text-badge-challenging-text hover:text-red-700 rounded-full transition-all duration-150 active:scale-90 outline-none cursor-pointer border border-red-200"
          aria-label="Remove question type row"
        >
          <X size={14} className="stroke-[2.5]" />
        </button>
      )}
    </div>
  );
};

export default QuestionTypeRow;
