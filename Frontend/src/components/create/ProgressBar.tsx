'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  currentStep: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  return (
    <div className="w-full mb-8 select-none">
      {/* Dynamic step labels */}
      <div className="flex justify-between items-center mb-3">
        <span className={cn(
          "text-2xs font-extrabold uppercase tracking-widest transition-colors duration-300",
          currentStep >= 1 ? "text-text-primary" : "text-text-secondary"
        )}>
          Step 1: Assignment Details
        </span>
        <span className={cn(
          "text-2xs font-extrabold uppercase tracking-widest transition-colors duration-300",
          currentStep >= 2 ? "text-text-primary" : "text-text-secondary"
        )}>
          Step 2: Generation Result
        </span>
      </div>
      
      {/* 2-segment progress bar lines */}
      <div className="flex gap-3 h-1.5 w-full">
        <div className={cn(
          "flex-1 h-full rounded-full transition-all duration-500",
          currentStep >= 1 ? "bg-dark-btn" : "bg-gray-200"
        )} />
        <div className={cn(
          "flex-1 h-full rounded-full transition-all duration-500",
          currentStep >= 2 ? "bg-dark-btn" : "bg-gray-200"
        )} />
      </div>
    </div>
  );
};

export default ProgressBar;
