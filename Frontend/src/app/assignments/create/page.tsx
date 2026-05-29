'use client';

import React from 'react';
import ProgressBar from '@/components/create/ProgressBar';
import Step1Details from '@/components/create/Step1Details';

export default function CreateAssignmentPage() {
  return (
    <div className="max-w-4xl mx-auto py-4 animate-in fade-in duration-200">
      {/* 2-Segment top Progress Bar */}
      <ProgressBar currentStep={1} />
      
      {/* Wizard Form details card */}
      <Step1Details />
    </div>
  );
}
