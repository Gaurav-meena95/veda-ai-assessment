'use client';

import React from 'react';
import { Download, Sparkles } from 'lucide-react';

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
  const displayMessage = message || "Certainly, John Doe! Here is the customized Question Paper for your Class 5th English assessment. It has been structured according to your custom parameters.";

  return (
    <div className="bg-dark-btn text-white rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md border border-white/5 select-none animate-in fade-in duration-300">
      {/* Dynamic message greet */}
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-primary-orange rounded-xl flex items-center justify-center text-white shrink-0 mt-0.5 shadow-md shadow-orange-500/20">
          <Sparkles size={20} className="fill-white" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-white tracking-wide">
            VedaAI Assistant
          </h4>
          <p className="text-xs text-gray-300 leading-relaxed max-w-2xl">
            {displayMessage}
          </p>
        </div>
      </div>

      {/* Outlined Download Button */}
      <button
        onClick={onDownloadClick}
        disabled={isDownloading}
        className="w-full md:w-auto h-10 px-5 rounded-lg border border-white/30 hover:border-white bg-transparent hover:bg-white/5 text-xs font-bold text-white transition-all duration-150 active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
      >
        <Download size={14} className="stroke-[2.5]" />
        <span>{isDownloading ? 'Building PDF...' : 'Download as PDF'}</span>
      </button>
    </div>
  );
};

export default AIMessageBanner;
