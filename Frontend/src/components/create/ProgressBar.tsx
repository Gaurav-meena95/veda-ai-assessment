'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  currentStep: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  return (
    <div className="w-full mb-6 select-none">
      {/* 2-segment progress bar lines without step text labels to match screenshot exactly */}
      <div className="flex gap-2 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
        <div className={cn(
          "flex-1 h-full transition-all duration-500",
          currentStep >= 1 ? "bg-[#1A1A1A]" : "bg-gray-200"
        )} />
        <div className={cn(
          "flex-1 h-full transition-all duration-500",
          currentStep >= 2 ? "bg-[#1A1A1A]" : "bg-gray-200"
        )} />
      </div>
    </div>
  );
};

export default ProgressBar;
