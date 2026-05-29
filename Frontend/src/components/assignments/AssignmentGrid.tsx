'use client';

import React from 'react';
import { Assignment } from '@/types';
import AssignmentCard from './AssignmentCard';

interface AssignmentGridProps {
  assignments: Assignment[];
  onDelete: (id: string) => void;
}

export const AssignmentGrid: React.FC<AssignmentGridProps> = ({ assignments, onDelete }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full animate-in fade-in duration-200">
      {assignments.map((assignment) => (
        <AssignmentCard 
          key={assignment._id} 
          assignment={assignment} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default AssignmentGrid;
