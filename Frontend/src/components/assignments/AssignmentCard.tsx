'use client';

import React from 'react';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { MoreVertical, Calendar, BookOpen, Eye, Trash2 } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Assignment } from '@/types';
import Badge from '@/components/ui/Badge';

interface AssignmentCardProps {
  assignment: Assignment;
  onDelete: (id: string) => void;
}

export const AssignmentCard: React.FC<AssignmentCardProps> = ({ assignment, onDelete }) => {
  // Safe date formatting helper using date-fns
  const formatDateString = (dateString: string) => {
    try {
      if (!dateString) return 'N/A';
      // If it is already in DD-MM-YYYY format, return it
      if (/^\d{2}-\d{2}-\d{4}$/.test(dateString)) return dateString;
      
      const date = parseISO(dateString);
      return format(date, 'dd-MM-yyyy');
    } catch (err) {
      console.warn('Date parsing error, falling back to raw value:', dateString, err);
      return dateString || 'N/A';
    }
  };

  const formattedAssigned = formatDateString(assignment.assignedOn);
  const formattedDue = formatDateString(assignment.dueDate);

  // Status-dependent difficulty badge or class details
  const getStatusBadge = () => {
    switch (assignment.status) {
      case 'generated':
        return <Badge difficulty="generated" className="uppercase tracking-wider text-[10px]" />;
      case 'failed':
        return <Badge difficulty="failed" className="uppercase tracking-wider text-[10px]" />;
      case 'pending':
      default:
        return <Badge difficulty="pending" className="uppercase tracking-wider text-[10px]" />;
    }
  };

  return (
    <div className="bg-white border border-border-custom hover:border-primary-orange/30 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between min-h-[190px] relative group select-none">
      
      {/* Top row: Status and 3-dot dropdown menu */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {getStatusBadge()}
          <span className="text-[11px] font-semibold text-text-secondary bg-gray-100 px-2 py-0.5 rounded-md">
            {assignment.className}
          </span>
        </div>

        {/* 3-Dot Radix UI Dropdown Menu */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="p-1.5 hover:bg-gray-100 rounded-lg text-text-secondary hover:text-text-primary transition-all active:scale-90 outline-none cursor-pointer">
              <MoreVertical size={18} />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="bg-white rounded-xl shadow-lg border border-border-custom p-1 min-w-[150px] z-50 animate-in fade-in slide-in-from-top-1 duration-100 outline-none"
              align="end"
              sideOffset={5}
            >
              <DropdownMenu.Item asChild>
                <Link 
                  href={`/assignments/${assignment._id}`}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-text-primary hover:bg-gray-50 rounded-lg transition-colors outline-none cursor-pointer"
                >
                  <Eye size={14} className="text-text-secondary" />
                  <span>View Assignment</span>
                </Link>
              </DropdownMenu.Item>

              <DropdownMenu.Separator className="h-px bg-border-custom my-1" />

              <DropdownMenu.Item 
                onClick={() => onDelete(assignment._id)}
                className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-badge-challenging-text hover:bg-red-50 rounded-lg transition-colors outline-none cursor-pointer"
              >
                <Trash2 size={14} />
                <span>Delete</span>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>

      {/* Middle row: Title & Subject */}
      <div className="flex-1 mb-4">
        <Link href={`/assignments/${assignment._id}`} passHref>
          <h3 className="font-extrabold text-base text-text-primary group-hover:underline decoration-primary-orange/50 underline-offset-4 cursor-pointer line-clamp-1 leading-snug">
            {assignment.title || `${assignment.subject} Assignment`}
          </h3>
        </Link>
        
        <div className="flex items-center gap-1.5 text-xs text-text-secondary mt-1.5">
          <BookOpen size={13} className="text-text-secondary" />
          <span>{assignment.subject}</span>
        </div>
      </div>

      {/* Bottom row: Assigned Date & Due Date */}
      <div className="border-t border-border-custom pt-4 flex items-center justify-between text-2xs font-semibold text-text-secondary">
        <div className="flex items-center gap-1">
          <Calendar size={12} className="text-text-secondary" />
          <span>Assigned: <span className="text-text-primary font-bold">{formattedAssigned}</span></span>
        </div>

        <div className="flex items-center gap-1">
          <Calendar size={12} className="text-primary-orange" />
          <span>Due: <span className="text-primary-orange font-extrabold">{formattedDue}</span></span>
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;
