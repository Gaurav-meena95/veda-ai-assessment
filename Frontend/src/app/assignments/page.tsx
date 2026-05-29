'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { Plus, Loader2 } from 'lucide-react';
import { useAssignmentStore } from '@/store/useAssignmentStore';
import { getAssignments, deleteAssignmentById } from '@/lib/api';
import EmptyState from '@/components/assignments/EmptyState';
import FilterBar from '@/components/assignments/FilterBar';
import AssignmentGrid from '@/components/assignments/AssignmentGrid';
import Button from '@/components/ui/Button';

export default function AssignmentsPage() {
  const { assignments, setAssignments, deleteAssignment } = useAssignmentStore();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch all assignments on mount
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        const data = await getAssignments();
        setAssignments(data);
      } catch (err) {
        console.error('Error fetching assignments:', err);
        toast.error('Failed to load assignments. Please check Express backend connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [setAssignments]);

  // Handle deleting an assignment
  const handleDeleteAssignment = async (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this assignment?');
    if (!confirmDelete) return;

    try {
      await deleteAssignmentById(id);
      deleteAssignment(id);
      toast.success('Assignment deleted successfully!');
    } catch (err) {
      console.error('Error deleting assignment:', err);
      toast.error('Failed to delete assignment. Please try again.');
    }
  };

  // Filter assignments based on search query
  const filteredAssignments = assignments.filter((assignment) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;

    return (
      assignment.title?.toLowerCase().includes(query) ||
      assignment.subject?.toLowerCase().includes(query) ||
      assignment.className?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex flex-col min-h-[calc(100vh-130px)] select-none">
      
      {/* Title Header area with active green dot */}
      <div className="flex items-center gap-3 mb-2">
        <span className="w-2.5 h-2.5 bg-active-green rounded-full shadow-sm shadow-green-500/50 animate-pulse" />
        <h1 className="text-2xl font-extrabold tracking-tight text-text-primary">
          Assignments
        </h1>
      </div>
      <p className="text-sm text-text-secondary mb-8">
        Manage and create assignments for your classes.
      </p>

      {/* Loading state indicator */}
      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center py-20">
          <Loader2 className="w-10 h-10 text-primary-orange animate-spin mb-4" />
          <p className="text-sm font-semibold text-text-secondary">
            Loading assessments from VedaAI...
          </p>
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          {assignments.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <EmptyState />
            </div>
          ) : (
            <div className="flex-1 flex flex-col pb-24">
              {/* Search & Filter Top Bar */}
              <FilterBar 
                searchQuery={searchQuery} 
                onSearchChange={setSearchQuery} 
              />

              {/* Assignments grid listing or Search Empty Results */}
              {filteredAssignments.length === 0 ? (
                <div className="text-center py-20 bg-white border border-border-custom rounded-2xl p-8 max-w-md mx-auto">
                  <p className="text-sm font-semibold text-text-secondary mb-2">
                    No results found for &quot;{searchQuery}&quot;
                  </p>
                  <p className="text-xs text-text-secondary">
                    Try adjusting your keywords or clearing the search text.
                  </p>
                </div>
              ) : (
                <AssignmentGrid 
                  assignments={filteredAssignments} 
                  onDelete={handleDeleteAssignment} 
                />
              )}

              {/* Floating Bottom Center "+ Create Assignment" pill button */}
              <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
                <Link href="/assignments/create" passHref>
                  <Button 
                    variant="dark" 
                    size="pill-dark"
                    className="flex items-center gap-2.5 shadow-xl shadow-black/15 px-8 font-bold border border-white/5 active:scale-95 hover:scale-[1.04] duration-150"
                  >
                    <Plus size={18} className="text-primary-orange stroke-[3px]" />
                    <span>Create Assignment</span>
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
