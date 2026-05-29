'use client';

import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-12 bg-white rounded-2xl border border-border-custom shadow-sm max-w-xl mx-auto my-12 transition-all">
      {/* Centered Premium SVG Illustration */}
      <div className="w-48 h-48 mb-8 text-primary-orange/20 relative flex items-center justify-center">
        <div className="absolute inset-0 bg-primary-orange/5 rounded-full blur-2xl animate-pulse" />
        <svg 
          width="120" 
          height="120" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="text-primary-orange drop-shadow-md relative z-10"
        >
          {/* Main document shell */}
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          {/* Question placeholder lines */}
          <line x1="8" y1="13" x2="16" y2="13" strokeDasharray="2 1" />
          <line x1="8" y1="17" x2="12" y2="17" strokeDasharray="3 1" />
          {/* Star symbol for AI */}
          <path d="M9.5 7h.01M6.5 9h.01" className="stroke-primary-orange/60" />
          <path d="M18.5 13h.01" className="stroke-primary-orange/60" />
        </svg>
      </div>

      {/* Headline */}
      <h3 className="text-xl font-bold text-text-primary mb-2">
        No assignments yet
      </h3>

      {/* Subtitle description */}
      <p className="text-sm text-text-secondary mb-8 max-w-sm leading-relaxed">
        Create your first assignment to start collecting and grading student submissions...
      </p>

      {/* Call to action */}
      <Link href="/assignments/create" passHref>
        <Button 
          variant="dark" 
          size="pill-dark"
          className="shadow-md hover:scale-[1.02] active:scale-98 duration-100 font-semibold px-8"
        >
          + Create Your First Assignment
        </Button>
      </Link>
    </div>
  );
};

export default EmptyState;
