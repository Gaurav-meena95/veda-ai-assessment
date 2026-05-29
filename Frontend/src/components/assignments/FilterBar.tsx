'use client';

import React from 'react';
import { SlidersHorizontal, Search } from 'lucide-react';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full bg-transparent mb-6 select-none">
      {/* Left side: Filter By Action */}
      <button className="flex items-center gap-2 px-4 h-11 border border-border-custom bg-white hover:bg-gray-50 text-sm font-semibold text-text-primary rounded-xl transition-all duration-150 active:scale-98 shadow-sm cursor-pointer self-start sm:self-auto">
        <SlidersHorizontal size={16} className="text-text-secondary" />
        <span>Filter By</span>
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
  );
};

export default FilterBar;
