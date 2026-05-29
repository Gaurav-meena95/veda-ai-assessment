'use client';

import React from 'react';
import ProgressBar from '@/components/create/ProgressBar';
import Step1Details from '@/components/create/Step1Details';

export default function CreateAssignmentPage() {
  return (
    <div className="max-w-3xl mx-auto py-2 animate-in fade-in duration-200 select-none font-sans">
      
      {/* Page Header (with active green dot) matching screenshot */}
      <div className="flex items-center gap-2.5 mb-1.5">
        <span className="w-2.5 h-2.5 bg-active-green rounded-full shadow-sm shadow-green-500/50 animate-pulse" />
        <h1 className="text-2xl font-black tracking-tight text-text-primary">
          Create Assignment
        </h1>
      </div>
      <p className="text-xs font-semibold text-[#888888] mb-6">
        Set up a new assignment for your students
      </p>

      {/* 2-Segment top Progress Bar */}
      <ProgressBar currentStep={1} />
      
      {/* Wizard Form details card */}
      <Step1Details />
    </div>
  );
}
