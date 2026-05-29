'use client';

import React from 'react';
import { Download } from 'lucide-react';

interface AIMessageBannerProps {
  message?: string;
  onDownloadClick?: () => void;
  isDownloading?: boolean;
}

export const AIMessageBanner: React.FC<AIMessageBannerProps> = ({
  message,
  onDownloadClick,
  isDownloading = false
}) => {
  // Matches screenshot banner copy perfectly!
  const displayMessage = message || "Certainly, Lakshya! Here are customized Question Paper for your CBSE Grade 8 Science classes on the NCERT chapters:";

  return (
    <div className="bg-[#2A2A2A] text-white rounded-[24px] p-6 space-y-4 shadow-sm border border-white/5 select-none animate-in fade-in duration-300 font-sans">
      
      {/* 1. Header Copy Message (Text formatted elegantly as in screenshot) */}
      <p className="text-sm font-semibold leading-relaxed tracking-tight text-white/95">
        {displayMessage}
      </p>

      {/* 2. White Pill Download Button placed underneath the text (Exactly matches screenshot) */}
      <div>
        <button
          onClick={onDownloadClick}
          disabled={isDownloading}
          className="flex items-center gap-2 px-6 py-2.5 bg-white text-black font-bold text-xs rounded-full shadow-sm hover:scale-[1.02] active:scale-95 transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
        >
          <Download size={14} className="stroke-[3px] text-black" />
          <span>{isDownloading ? 'Building PDF...' : 'Download as PDF'}</span>
        </button>
      </div>
    </div>
  );
};

export default AIMessageBanner;
