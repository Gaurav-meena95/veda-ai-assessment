'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Loader2, AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react';
import { useAssignmentStore } from '@/store/useAssignmentStore';
import { useWebSocket } from '@/hooks/useWebSocket';
import { getAssignmentById } from '@/lib/api';
import ProgressBar from '@/components/create/ProgressBar';
import AIMessageBanner from '@/components/output/AIMessageBanner';
import QuestionPaper from '@/components/output/QuestionPaper';
import Button from '@/components/ui/Button';

// Dynamically compile the PDF client-side only when triggered
import QuestionPaperPDF from '@/components/output/QuestionPaperPDF';

export default function AssignmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { 
    currentAssignment, 
    setCurrentAssignment, 
    generationStatus, 
    setGenerationStatus,
    generationProgress, 
    setGenerationProgress 
  } = useAssignmentStore();

  const [loading, setLoading] = useState(true);
  const [downloadingPDF, setDownloadingPDF] = useState(false);

  // Hook up WebSocket events for this specific assignment
  useWebSocket(id);

  // Load assignment on mount or page refresh
  useEffect(() => {
    const loadAssignment = async () => {
      try {
        setLoading(true);
        const data = await getAssignmentById(id);
        setCurrentAssignment(data);
        
        // Sync local generation status with backend status
        if (data.status === 'generated') {
          setGenerationStatus('done');
          setGenerationProgress(100);
        } else if (data.status === 'failed') {
          setGenerationStatus('failed');
        } else {
          setGenerationStatus('processing');
        }
      } catch (err) {
        console.error('Error loading assignment:', err);
        toast.error('Failed to retrieve assignment from Express API.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadAssignment();
    }
  }, [id, setCurrentAssignment, setGenerationStatus, setGenerationProgress]);

  // Handle client-side print PDF compilation and save
  const handleDownloadPDF = async () => {
    if (!currentAssignment || !currentAssignment.generatedPaper) {
      toast.error('Question paper is not ready yet.');
      return;
    }

    try {
      setDownloadingPDF(true);
      toast.loading('Compiling print-quality PDF document...', { id: 'pdf-toast' });

      // Dynamically load react-pdf client-side only
      const { pdf } = await import('@react-pdf/renderer');
      
      // Compile into standard document blob
      const doc = React.createElement(QuestionPaperPDF, { paper: currentAssignment.generatedPaper });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const blob = await pdf(doc as any).toBlob();
      
      // Generate object link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      const fileSafeTitle = currentAssignment.title 
        ? currentAssignment.title.toLowerCase().replace(/[^a-z0-9]+/g, '_') 
        : 'assessment';
      
      link.download = `${fileSafeTitle}_exam.pdf`;
      
      document.body.appendChild(link);
      link.click();
      
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success('PDF download completed successfully!', { id: 'pdf-toast' });
    } catch (err) {
      console.error('Error generating PDF:', err);
      toast.error('Failed to compile PDF. Please try again.', { id: 'pdf-toast' });
    } finally {
      setDownloadingPDF(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] select-none">
        <Loader2 className="w-10 h-10 text-primary-orange animate-spin mb-4" />
        <p className="text-sm font-semibold text-text-secondary">
          Loading assignment details...
        </p>
      </div>
    );
  }

  if (!currentAssignment) {
    return (
      <div className="max-w-md mx-auto text-center py-20 bg-white border border-border-custom rounded-2xl p-8 shadow-sm my-12 select-none">
        <AlertTriangle className="w-12 h-12 text-badge-challenging-text mx-auto mb-4" />
        <h3 className="text-base font-bold text-text-primary mb-2">
          Assignment not found
        </h3>
        <p className="text-xs text-text-secondary mb-6 leading-relaxed">
          The assignment might have been deleted, or does not exist under this workspace.
        </p>
        <Button 
          variant="outline" 
          size="pill-outline" 
          onClick={() => router.push('/assignments')}
          className="font-semibold"
        >
          Back to Assignments
        </Button>
      </div>
    );
  }

  // Active status checks
  const isPending = currentAssignment.status === 'pending' || generationStatus === 'queued' || generationStatus === 'processing';
  const isFailed = currentAssignment.status === 'failed' || generationStatus === 'failed';

  return (
    <div className="max-w-4xl mx-auto space-y-6 select-none animate-in fade-in duration-200">
      
      {/* 1. Header Navigation and Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-custom pb-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.push('/assignments')}
            className="p-2 hover:bg-gray-100 rounded-lg text-text-secondary hover:text-text-primary transition-all border border-border-custom/50 bg-white shadow-2xs"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 className="text-xl font-extrabold text-text-primary">
              {currentAssignment.title || 'Assignment Details'}
            </h1>
            <p className="text-2xs font-semibold text-text-secondary uppercase tracking-widest mt-0.5">
              Subject: {currentAssignment.subject} • Class: {currentAssignment.className}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Generation pending state panel */}
      {isPending && (
        <div className="bg-white border border-border-custom rounded-2xl p-8 shadow-sm space-y-6">
          <ProgressBar currentStep={2} />

          <div className="flex flex-col items-center justify-center text-center p-6 bg-gray-50 border border-border-custom rounded-xl space-y-4 max-w-lg mx-auto">
            <Loader2 className="w-8 h-8 text-primary-orange animate-spin" />
            
            <div className="space-y-1">
              <h3 className="text-sm font-extrabold text-text-primary">
                {generationStatus === 'queued' ? 'Assessment Queued' : 'AI drafting questions...'}
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed max-w-xs mx-auto">
                {generationStatus === 'queued' 
                  ? 'Your document is in queue. Preparing generation pipeline.'
                  : 'VedaAI is analyzing your files and constructing assessment blocks.'}
              </p>
            </div>

            {/* Live progress percentage bar */}
            <div className="w-full max-w-xs bg-gray-200 h-2.5 rounded-full overflow-hidden relative border border-gray-300">
              <div 
                className="bg-primary-orange h-full rounded-full transition-all duration-300 shadow-sm"
                style={{ width: `${generationProgress}%` }}
              />
            </div>
            <span className="text-xs font-black text-primary-orange">
              {generationProgress}% Complete
            </span>
          </div>
        </div>
      )}

      {/* 3. Generation Failure Panel */}
      {isFailed && (
        <div className="bg-white border border-border-custom rounded-2xl p-8 shadow-sm my-6 select-none text-center">
          <AlertTriangle className="w-12 h-12 text-badge-challenging-text mx-auto mb-4" />
          <h3 className="text-sm font-extrabold text-text-primary mb-2">
            Assessment Generation Failed
          </h3>
          <p className="text-xs text-text-secondary mb-6 leading-relaxed max-w-sm mx-auto">
            An error occurred in the AI extraction process or the format was unsupported. Please make sure the backend is active.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button 
              variant="outline" 
              size="pill-outline" 
              onClick={() => router.push('/assignments')}
              className="font-semibold"
            >
              Back to List
            </Button>
            <Button 
              variant="dark" 
              size="pill-dark" 
              onClick={() => router.push('/assignments/create')}
              className="font-semibold flex items-center gap-2"
            >
              <RefreshCw size={14} />
              <span>Try Again</span>
            </Button>
          </div>
        </div>
      )}

      {/* 4. Complete generated state */}
      {!isPending && !isFailed && currentAssignment.generatedPaper && (
        <div className="space-y-6">
          {/* AI Banner header */}
          <AIMessageBanner 
            message={currentAssignment.generatedPaper.aiMessage} 
            onDownloadClick={handleDownloadPDF}
            isDownloading={downloadingPDF}
          />

          {/* Core Printable Exam card sheet */}
          <QuestionPaper paper={currentAssignment.generatedPaper} />
        </div>
      )}
    </div>
  );
}
