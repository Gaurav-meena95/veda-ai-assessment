'use client';

import React, { useState } from 'react';
import { SlidersHorizontal, Search, RotateCcw, ChevronDown } from 'lucide-react';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  subjects: string[];
  classes: string[];
  statuses: string[];
  selectedSubject: string;
  onSubjectChange: (value: string) => void;
  selectedClass: string;
  onClassChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  onReset: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  subjects,
  classes,
  statuses,
  selectedSubject,
  onSubjectChange,
  selectedClass,
  onClassChange,
  selectedStatus,
  onStatusChange,
  onReset,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const hasActiveFilters = 
    selectedSubject !== 'All' || 
    selectedClass !== 'All' || 
    selectedStatus !== 'All';

  return (
    <div className="flex flex-col gap-4 w-full bg-transparent mb-6 select-none font-sans">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
        {/* Left side: Filter By Action */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-4 h-11 border text-sm font-semibold rounded-xl transition-all duration-150 active:scale-98 shadow-sm cursor-pointer self-start sm:self-auto ${
            isOpen || hasActiveFilters
              ? 'border-primary-orange bg-orange-50/40 text-primary-orange' 
              : 'border-border-custom bg-white hover:bg-gray-50 text-text-primary'
          }`}
        >
          <SlidersHorizontal size={16} />
          <span>Filter By</span>
          {hasActiveFilters && (
            <span className="flex items-center justify-center w-5 h-5 text-2xs font-bold text-white bg-primary-orange rounded-full">
              !
            </span>
          )}
          <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Right side: Search Box */}
        <div className="relative w-full sm:w-72">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-secondary">
            <Search size={16} />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search Assignment"
            className="w-full h-11 pl-10 pr-4 bg-white border border-border-custom text-sm text-text-primary placeholder:text-text-secondary rounded-full focus:outline-none focus:ring-2 focus:ring-primary-orange/50 focus:border-primary-orange transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Expanded Filter Panel */}
      {isOpen && (
        <div className="w-full bg-white border border-border-custom rounded-2xl p-5 shadow-sm animate-in slide-in-from-top-4 duration-200 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* 1. Subject Select */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-text-secondary">
                Subject
              </label>
              <div className="relative">
                <select
                  value={selectedSubject}
                  onChange={(e) => onSubjectChange(e.target.value)}
                  className="w-full h-10 px-3 pr-10 bg-gray-50/50 border border-border-custom rounded-xl text-xs font-semibold text-text-primary appearance-none focus:outline-none focus:border-primary-orange cursor-pointer"
                >
                  {subjects.map((sub) => (
                    <option key={sub} value={sub}>{sub === 'All' ? 'All Subjects' : sub}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
              </div>
            </div>

            {/* 2. Class Select */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-text-secondary">
                Class / Grade
              </label>
              <div className="relative">
                <select
                  value={selectedClass}
                  onChange={(e) => onClassChange(e.target.value)}
                  className="w-full h-10 px-3 pr-10 bg-gray-50/50 border border-border-custom rounded-xl text-xs font-semibold text-text-primary appearance-none focus:outline-none focus:border-primary-orange cursor-pointer"
                >
                  {classes.map((cls) => (
                    <option key={cls} value={cls}>{cls === 'All' ? 'All Classes' : `${cls} Grade`}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
              </div>
            </div>

            {/* 3. Status Select */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-text-secondary">
                Generation Status
              </label>
              <div className="relative">
                <select
                  value={selectedStatus}
                  onChange={(e) => onStatusChange(e.target.value)}
                  className="w-full h-10 px-3 pr-10 bg-gray-50/50 border border-border-custom rounded-xl text-xs font-semibold text-text-primary appearance-none focus:outline-none focus:border-primary-orange cursor-pointer"
                >
                  {statuses.map((st) => (
                    <option key={st} value={st}>
                      {st === 'All' ? 'All Statuses' : st.charAt(0).toUpperCase() + st.slice(1)}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
              </div>
            </div>

          </div>

          {/* Reset Filters Option */}
          {hasActiveFilters && (
            <div className="flex items-center justify-end border-t border-gray-150/50 pt-3">
              <button
                onClick={onReset}
                className="flex items-center gap-1.5 text-2xs font-bold text-[#888888] hover:text-[#1A1A1A] transition-all cursor-pointer"
              >
                <RotateCcw size={12} />
                <span>Reset Filters</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterBar;
