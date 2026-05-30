'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-hot-toast';
import { Upload, Calendar, Plus, Mic, ArrowLeft, ArrowRight, Loader2, FileCode } from 'lucide-react';
import { useAssignmentStore } from '@/store/useAssignmentStore';
import { createAssignment } from '@/lib/api';
import { QuestionTypeConfig } from '@/types';
import QuestionTypeRow from './QuestionTypeRow';

export const Step1Details: React.FC = () => {
  const router = useRouter();
  const { formData, updateFormData, addAssignment, setCurrentAssignment, setGenerationStatus, setGenerationProgress } = useAssignmentStore();
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Dropzone drag & drop setup matching screenshot
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
    },
    maxSize: 10 * 1024 * 1024,
    multiple: false,
    onDrop: (acceptedFiles, fileRejections) => {
      if (fileRejections.length > 0) {
        toast.error('File rejected! Ensure it is a JPEG or PNG and under 10MB.');
        return;
      }
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
        toast.success(`File "${acceptedFiles[0].name}" loaded successfully.`);
      }
    }
  });

  const totalQuestions = formData.questionTypes.reduce((acc, row) => acc + row.noOfQuestions, 0);
  const totalMarks = formData.questionTypes.reduce((acc, row) => acc + (row.noOfQuestions * row.marks), 0);

  const handleUpdateRow = (index: number, updated: QuestionTypeConfig) => {
    const nextList = [...formData.questionTypes];
    nextList[index] = updated;
    updateFormData({ questionTypes: nextList });
  };

  const handleRemoveRow = (index: number) => {
    const nextList = formData.questionTypes.filter((_, i) => i !== index);
    updateFormData({ questionTypes: nextList });
  };

  const handleAddRow = () => {
    const nextList = [
      ...formData.questionTypes,
      { type: 'Short Questions', noOfQuestions: 5, marks: 2 }
    ];
    updateFormData({ questionTypes: nextList });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.dueDate) {
      toast.error('Please select a Due Date for the assessment.');
      return;
    }

    if (formData.questionTypes.length === 0) {
      toast.error('Please configure at least one question type row.');
      return;
    }

    try {
      setSubmitting(true);
      setGenerationStatus('queued');
      setGenerationProgress(0);

      const postData = new FormData();
      if (file) {
        postData.append('file', file);
      }
      postData.append('dueDate', formData.dueDate);
      postData.append('additionalInfo', formData.additionalInfo || '');
      postData.append('questionTypes', JSON.stringify(formData.questionTypes));

      // Append backend schemas defaults (to matches the exact DPS Bokaro templates in the screenshot!)
      postData.append('title', 'Quiz on Electricity');
      postData.append('schoolName', 'Delhi Public School, Sector-4, Bokaro');
      postData.append('subject', 'English');
      postData.append('className', '5th');

      toast.loading('Initiating AI question generation...', { id: 'generation-toast' });

      const newAssignment = await createAssignment(postData);

      addAssignment(newAssignment);
      setCurrentAssignment(newAssignment);

      toast.success('Assignment created, redirecting to generation progress!', { id: 'generation-toast' });
      router.push(`/assignments/${newAssignment._id}`);
    } catch (err) {
      console.error('Error creating assignment:', err);
      setGenerationStatus('failed');
      toast.error('Failed to submit assignment. Make sure backend is running at port 3000.', { id: 'generation-toast' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 select-none font-sans max-w-3xl mx-auto">
      
      {/* Wizard Form details card */}
      <div className="bg-white border border-[#E5E7EB] rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6">
        
        <div>
          <h2 className="text-lg sm:text-xl font-black text-[#1A1A1A] tracking-tight">
            Assignment Details
          </h2>
          <p className="text-xs text-[#888888] font-semibold mt-0.5">
            Basic information about your assignment
          </p>
        </div>

        {/* SECTION 1: File Upload Zone */}
        <div>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-[24px] p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 ${
              isDragActive
                ? 'border-primary-orange bg-orange-50/20'
                : 'border-[#E5E7EB] hover:border-gray-300 bg-white'
            }`}
          >
            <input {...getInputProps()} />

            <div className="w-11 h-11 rounded-full bg-gray-50 flex items-center justify-center text-[#6B7280] mb-3 border border-[#E5E7EB]">
              <Upload size={20} className="stroke-[2.2px]" />
            </div>

            {file ? (
              <div className="space-y-1">
                <p className="text-sm font-bold text-text-primary flex items-center gap-1.5 justify-center">
                  <FileCode size={16} className="text-primary-orange" />
                  {file.name}
                </p>
                <p className="text-xs text-text-secondary">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB • Ready
                </p>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setFile(null); }}
                  className="text-xs font-bold text-[#FF4D4D] hover:underline mt-2 cursor-pointer"
                >
                  Remove File
                </button>
              </div>
            ) : (
              <div className="space-y-1">
                <p className="text-sm font-bold text-[#1A1A1A] tracking-tight">
                  Choose a file or drag & drop it here
                </p>
                <p className="text-2xs text-[#888888] font-bold">
                  JPEG, PNG, upto 10MB
                </p>
                <div className="pt-3">
                  <span className="inline-flex items-center justify-center h-9 px-5 rounded-full border border-[#E5E7EB] bg-gray-50 text-xs font-black text-[#1A1A1A] hover:bg-gray-100 transition-colors shadow-2xs">
                    Browse Files
                  </span>
                </div>
              </div>
            )}
          </div>
          <p className="text-[11px] text-[#888888] font-semibold mt-2.5 text-center">
            Upload images of your preferred document/image
          </p>
        </div>

        {/* SECTION 2: Due Date Picker */}
        <div className="space-y-2">
          <label className="block text-xs font-black text-[#1A1A1A] tracking-tight">
            Due Date
          </label>
          <div className="relative max-w-md">
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => updateFormData({ dueDate: e.target.value })}
              className="w-full h-11 px-4 bg-gray-50 border border-[#E5E7EB] text-sm text-[#1A1A1A] rounded-xl focus:outline-none focus:ring-1 focus:ring-primary-orange focus:border-primary-orange transition-all cursor-pointer font-bold tracking-tight"
              placeholder="DD-MM-YYYY"
            />
            <span className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-[#888888]">
              <Calendar size={16} className="stroke-[2.2px]" />
            </span>
          </div>
        </div>

        {/* SECTION 3: Question Types Config */}
        <div className="space-y-4">
          <div className="hidden sm:flex justify-between items-center px-1 text-xs font-black text-[#1A1A1A] tracking-tight border-b border-gray-100 pb-2">
            <span>Question Type</span>
            <div className="flex gap-14 pr-8">
              <span>No. of Questions</span>
              <span>Marks</span>
            </div>
          </div>

          {/* Rows Repeater */}
          <div className="space-y-1">
            {formData.questionTypes.map((row, index) => (
              <QuestionTypeRow
                key={index}
                index={index}
                config={row}
                onUpdate={(updated) => handleUpdateRow(index, updated)}
                onRemove={() => handleRemoveRow(index)}
                isOnlyRow={formData.questionTypes.length <= 1}
              />
            ))}
          </div>

          {/* Add Row and Live Summary Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            {/* Add Row Button */}
            <button
              type="button"
              onClick={handleAddRow}
              className="inline-flex items-center gap-2 text-xs font-black text-[#1A1A1A] hover:text-primary-orange transition-colors active:scale-95 duration-100 cursor-pointer self-start"
            >
              <div className="w-6 h-6 bg-[#1A1A1A] text-white rounded-full flex items-center justify-center shadow-xs">
                <Plus size={14} className="stroke-[3]" />
              </div>
              <span>Add Question Type</span>
            </button>

            {/* Totals Computation aligned right */}
            <div className="flex items-center gap-5 text-2xs font-extrabold text-[#6B7280] tracking-tight bg-gray-50 border border-[#E5E7EB] px-5 py-2.5 rounded-2xl">
              <span>Total Questions : <span className="text-[#1A1A1A] font-black">{totalQuestions}</span></span>
              <span>Total Marks : <span className="text-[#1A1A1A] font-black">{totalMarks}</span></span>
            </div>
          </div>
        </div>

        {/* SECTION 4: Additional Information text area with Microphone */}
        <div className="space-y-2">
          <label className="block text-xs font-black text-[#1A1A1A] tracking-tight">
            Additional Information (For better output)
          </label>
          <div className="relative">
            <textarea
              value={formData.additionalInfo || ''}
              onChange={(e) => updateFormData({ additionalInfo: e.target.value })}
              placeholder="e.g Generate a question paper for 3 hour exam duration..."
              rows={4}
              className="w-full p-4 pr-12 bg-gray-50 border border-[#E5E7EB] text-sm text-[#1A1A1A] placeholder:text-[#888888] rounded-2xl focus:outline-none focus:ring-1 focus:ring-primary-orange focus:border-primary-orange transition-all font-bold tracking-tight resize-none leading-relaxed"
            />
            {/* Microphone icon in bottom right */}
            <button
              type="button"
              className="absolute bottom-4 right-4 p-1.5 text-[#888888] hover:text-text-primary transition-all rounded-full hover:bg-gray-150 cursor-pointer bg-white border border-[#E5E7EB]"
            >
              <Mic size={16} className="stroke-[2.2px]" />
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM NAVIGATION ACTIONS */}
      <div className="flex items-center justify-between font-sans">
        <button
          type="button"
          onClick={() => router.push('/assignments')}
          className="inline-flex items-center gap-2 h-11 px-6 border border-[#E5E7EB] bg-white hover:bg-gray-50 text-xs font-bold text-[#1A1A1A] rounded-full transition-all duration-150 active:scale-95 cursor-pointer shadow-2xs"
        >
          <ArrowLeft size={14} className="stroke-[2.5]" />
          <span>Previous</span>
        </button>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 h-11 px-8 bg-[#1A1A1A] hover:bg-black text-white text-xs font-bold rounded-full transition-all duration-150 active:scale-95 cursor-pointer shadow-md disabled:opacity-50 disabled:pointer-events-none"
        >
          {submitting ? (
            <>
              <Loader2 size={14} className="animate-spin text-primary-orange" />
              <span>Generating Assessment...</span>
            </>
          ) : (
            <>
              <span>Next</span>
              <ArrowRight size={14} className="stroke-[2.5]" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default Step1Details;
