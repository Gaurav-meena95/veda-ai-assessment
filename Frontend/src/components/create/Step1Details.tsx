'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-hot-toast';
import { UploadCloud, Calendar, Plus, Mic, ArrowLeft, ArrowRight, Loader2, FileCode } from 'lucide-react';
import { useAssignmentStore } from '@/store/useAssignmentStore';
import { createAssignment } from '@/lib/api';
import { QuestionTypeConfig } from '@/types';
import QuestionTypeRow from './QuestionTypeRow';
import Button from '@/components/ui/Button';

export const Step1Details: React.FC = () => {
  const router = useRouter();
  const { formData, updateFormData, addAssignment, setCurrentAssignment, setGenerationStatus, setGenerationProgress } = useAssignmentStore();
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Dropzone drag & drop setup
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB limit
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

  // Calculate live question totals
  const totalQuestions = formData.questionTypes.reduce((acc, row) => acc + row.noOfQuestions, 0);
  const totalMarks = formData.questionTypes.reduce((acc, row) => acc + (row.noOfQuestions * row.marks), 0);

  // Update a specific row in questionTypes
  const handleUpdateRow = (index: number, updated: QuestionTypeConfig) => {
    const nextList = [...formData.questionTypes];
    nextList[index] = updated;
    updateFormData({ questionTypes: nextList });
  };

  // Remove a row from questionTypes
  const handleRemoveRow = (index: number) => {
    const nextList = formData.questionTypes.filter((_, i) => i !== index);
    updateFormData({ questionTypes: nextList });
  };

  // Add a new row to questionTypes
  const handleAddRow = () => {
    const nextList = [
      ...formData.questionTypes,
      { type: 'Short Questions', noOfQuestions: 5, marks: 2 }
    ];
    updateFormData({ questionTypes: nextList });
  };

  // Trigger form submission and generation
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

      // Build multipart FormData
      const postData = new FormData();
      if (file) {
        postData.append('file', file);
      }
      postData.append('dueDate', formData.dueDate);
      postData.append('additionalInfo', formData.additionalInfo || '');
      postData.append('questionTypes', JSON.stringify(formData.questionTypes));

      // Append backend schemas defaults (since we are creating standard template documents)
      postData.append('title', `${formData.questionTypes[0]?.type || 'Standard'} Assessment`);
      postData.append('schoolName', 'Harvard Public School');
      postData.append('subject', 'English');
      postData.append('className', '5th');

      toast.loading('Initiating AI question generation...', { id: 'generation-toast' });
      
      const newAssignment = await createAssignment(postData);
      
      // Update store state
      addAssignment(newAssignment);
      setCurrentAssignment(newAssignment);
      
      toast.success('Assignment created, redirecting to generation progress!', { id: 'generation-toast' });
      
      // Redirect to the output results page which will monitor status live via WebSocket!
      router.push(`/assignments/${newAssignment._id}`);
    } catch (err) {
      console.error('Error creating assignment:', err);
      setGenerationStatus('failed');
      toast.error('Failed to submit assignment. Make sure backend is running at port 5000.', { id: 'generation-toast' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 select-none">
      <div className="bg-white border border-border-custom rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
        
        {/* SECTION 1: File Upload Zone */}
        <div>
          <div 
            {...getRootProps()} 
            className={`border-2 border-dashed rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 ${
              isDragActive 
                ? 'border-primary-orange bg-primary-orange/5' 
                : 'border-border-custom hover:border-primary-orange/30 bg-gray-50/50'
            }`}
          >
            <input {...getInputProps()} />
            
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-primary-orange mb-4 shadow-sm">
              <UploadCloud size={24} />
            </div>

            {file ? (
              <div className="space-y-1">
                <p className="text-sm font-bold text-text-primary flex items-center gap-1.5 justify-center">
                  <FileCode size={16} className="text-primary-orange" />
                  {file.name}
                </p>
                <p className="text-xs text-text-secondary">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB • Ready for parsing
                </p>
                <button 
                  type="button" 
                  onClick={(e) => { e.stopPropagation(); setFile(null); }}
                  className="text-xs font-bold text-badge-challenging-text hover:underline mt-2 cursor-pointer"
                >
                  Remove File
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-sm font-bold text-text-primary">
                  Choose a file or drag & drop it here
                </p>
                <p className="text-xs text-text-secondary">
                  JPEG, PNG, upto 10MB
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center justify-center h-9 px-4 rounded-lg border border-border-custom bg-white text-xs font-semibold text-text-primary hover:bg-gray-50 transition-colors shadow-sm">
                    Browse Files
                  </span>
                </div>
              </div>
            )}
          </div>
          <p className="text-2xs text-text-secondary mt-2 pl-1 leading-relaxed">
            Upload images of your preferred document/image to automatically extract context.
          </p>
        </div>

        {/* SECTION 2: Due Date Picker */}
        <div className="max-w-xs">
          <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
            Due Date
          </label>
          <div className="relative">
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => updateFormData({ dueDate: e.target.value })}
              className="w-full h-11 pl-4 pr-10 bg-white border border-border-custom text-sm text-text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange/50 focus:border-primary-orange transition-all cursor-pointer font-medium"
              placeholder="DD-MM-YYYY"
            />
            <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-text-secondary">
              <Calendar size={16} />
            </span>
          </div>
        </div>

        {/* SECTION 3: Question Types Config */}
        <div>
          {/* Header Column Labels */}
          <div className="hidden sm:grid grid-cols-[1fr_120px_120px] gap-4 mb-2 px-1 text-2xs font-bold text-text-secondary uppercase tracking-wider">
            <span>Question Type</span>
            <span>No. of Questions</span>
            <span>Marks per Question</span>
          </div>

          {/* Rows Repeater */}
          <div className="space-y-3 mb-4">
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

          {/* Add Row and Live Summary Column */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border-custom/60 pt-4">
            {/* Add Row Button */}
            <button
              type="button"
              onClick={handleAddRow}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-text-primary hover:text-primary-orange transition-colors active:scale-95 duration-100 cursor-pointer self-start"
            >
              <div className="w-6 h-6 bg-dark-btn text-white rounded-full flex items-center justify-center">
                <Plus size={14} className="stroke-[2.5]" />
              </div>
              <span>Add Question Type</span>
            </button>

            {/* Totals computation */}
            <div className="flex items-center gap-6 text-xs font-bold text-text-secondary bg-gray-50 border border-border-custom px-4 py-2.5 rounded-xl self-stretch sm:self-auto justify-between sm:justify-start">
              <span>Total Questions: <span className="text-text-primary font-extrabold">{totalQuestions}</span></span>
              <div className="w-px h-4 bg-border-custom" />
              <span>Total Marks: <span className="text-primary-orange font-black">{totalMarks}</span></span>
            </div>
          </div>
        </div>

        {/* SECTION 4: Additional Information text area */}
        <div className="relative">
          <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
            Additional Information (For better output)
          </label>
          <div className="relative">
            <textarea
              value={formData.additionalInfo || ''}
              onChange={(e) => updateFormData({ additionalInfo: e.target.value })}
              placeholder="e.g Generate a question paper for 3 hour exam duration..."
              rows={4}
              className="w-full p-4 pr-12 bg-white border border-border-custom text-sm text-text-primary placeholder:text-text-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange/50 focus:border-primary-orange transition-all font-medium resize-none"
            />
            {/* Decorative mic icon */}
            <button 
              type="button"
              className="absolute bottom-4 right-4 p-1.5 text-text-secondary hover:text-text-primary transition-all rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              <Mic size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM NAVIGATION ACTIONS */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.push('/assignments')}
          className="inline-flex items-center gap-2 h-11 px-6 border border-border-custom bg-white hover:bg-gray-50 text-sm font-semibold text-text-primary rounded-full transition-all duration-150 active:scale-95 cursor-pointer shadow-sm"
        >
          <ArrowLeft size={16} />
          <span>Previous</span>
        </button>

        <Button
          type="submit"
          variant="dark"
          size="pill-dark"
          disabled={submitting}
          className="inline-flex items-center gap-2 shadow-md px-8 font-semibold active:scale-95 duration-100 disabled:opacity-50"
        >
          {submitting ? (
            <>
              <Loader2 size={16} className="animate-spin text-primary-orange" />
              <span>Generating Assessment...</span>
            </>
          ) : (
            <>
              <span>Next</span>
              <ArrowRight size={16} />
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default Step1Details;
