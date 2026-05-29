'use client';

import React from 'react';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { MoreVertical } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Assignment } from '@/types';

interface AssignmentCardProps {
  assignment: Assignment;
  onDelete: (id: string) => void;
}

export const AssignmentCard: React.FC<AssignmentCardProps> = ({ assignment, onDelete }) => {
  
  // Custom date formatting helper to match DD-MM-YYYY format in screenshot
  const formatDateString = (dateString?: string) => {
    try {
      if (!dateString) return 'N/A';
      if (/^\d{2}-\d{2}-\d{4}$/.test(dateString)) return dateString;
      
      const date = parseISO(dateString);
      return format(date, 'dd-MM-yyyy');
    } catch (err) {
      console.warn('Date parsing error, falling back to raw value:', dateString, err);
      return dateString || 'N/A';
    }
  };

  const formattedAssigned = formatDateString(assignment.assignedOn || assignment.createdAt);
  const formattedDue = formatDateString(assignment.dueDate);

  return (
    <div className="bg-white border border-[#E5E7EB] hover:border-gray-300 rounded-[24px] p-6 flex flex-col justify-between min-h-[170px] relative transition-all duration-200 select-none group hover:shadow-sm">
      
      {/* Top row: Title and 3-dot dropdown menu */}
      <div className="flex items-start justify-between gap-4">
        <Link href={`/assignments/${assignment._id}`} className="flex-1">
          <h3 className="text-xl font-bold tracking-tight text-[#1A1A1A] hover:underline underline-offset-4 decoration-1 decoration-gray-400 cursor-pointer leading-snug line-clamp-2">
            {assignment.title || 'Untitled Quiz'}
          </h3>
        </Link>

        {/* 3-Dot Radix UI Dropdown Menu */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="p-1.5 hover:bg-gray-50 rounded-full text-[#888888] hover:text-[#1A1A1A] transition-all outline-none cursor-pointer">
              <MoreVertical size={20} className="stroke-[2.2px]" />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-[#E5E7EB] p-1 min-w-[150px] z-50 animate-in fade-in slide-in-from-top-1 duration-100 outline-none"
              align="end"
              sideOffset={5}
            >
              <DropdownMenu.Item asChild>
                <Link 
                  href={`/assignments/${assignment._id}`}
                  className="flex items-center px-4 py-2.5 text-xs font-black text-[#1A1A1A] hover:bg-gray-50 rounded-xl transition-colors outline-none cursor-pointer tracking-tight"
                >
                  View Assignment
                </Link>
              </DropdownMenu.Item>

              <DropdownMenu.Item 
                onClick={() => onDelete(assignment._id)}
                className="flex items-center px-4 py-2.5 text-xs font-black text-[#FF4D4D] hover:bg-red-50 rounded-xl transition-colors outline-none cursor-pointer tracking-tight"
              >
                Delete
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>

      {/* Bottom row: Assigned Date & Due Date matching screenshot */}
      <div className="flex items-center justify-between text-2xs font-extrabold text-[#6B7280] tracking-tight mt-6">
        <div>
          <span>Assigned on : </span>
          <span className="text-[#1A1A1A]">{formattedAssigned}</span>
        </div>

        <div>
          <span>Due : </span>
          <span className="text-[#1A1A1A]">{formattedDue}</span>
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;
