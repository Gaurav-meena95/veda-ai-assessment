import { create } from 'zustand';
import { Assignment, CreateAssignmentFormData } from '@/types';

interface AssignmentState {
  assignments: Assignment[];
  currentAssignment: Assignment | null;
  formData: CreateAssignmentFormData;
  generationStatus: 'idle' | 'queued' | 'processing' | 'done' | 'failed';
  generationProgress: number;
  wsConnected: boolean;

  setAssignments: (assignments: Assignment[]) => void;
  addAssignment: (assignment: Assignment) => void;
  deleteAssignment: (id: string) => void;
  setCurrentAssignment: (assignment: Assignment | null) => void;
  updateFormData: (data: Partial<CreateAssignmentFormData> | ((prev: CreateAssignmentFormData) => CreateAssignmentFormData)) => void;
  resetFormData: () => void;
  setGenerationStatus: (status: 'idle' | 'queued' | 'processing' | 'done' | 'failed') => void;
  setGenerationProgress: (progress: number) => void;
  setWsConnected: (connected: boolean) => void;
}

const defaultFormData: CreateAssignmentFormData = {
  dueDate: '',
  questionTypes: [
    { type: 'MCQ', noOfQuestions: 5, marks: 1 }
  ],
  additionalInfo: '',
};

export const useAssignmentStore = create<AssignmentState>((set) => ({
  assignments: [],
  currentAssignment: null,
  formData: defaultFormData,
  generationStatus: 'idle',
  generationProgress: 0,
  wsConnected: false,

  setAssignments: (assignments) => set({ assignments }),
  addAssignment: (assignment) => set((state) => ({ 
    assignments: [assignment, ...state.assignments] 
  })),
  deleteAssignment: (id) => set((state) => ({ 
    assignments: state.assignments.filter(a => a._id !== id) 
  })),
  setCurrentAssignment: (currentAssignment) => set({ currentAssignment }),
  updateFormData: (data) => set((state) => {
    const nextFormData = typeof data === 'function' ? data(state.formData) : { ...state.formData, ...data };
    return { formData: nextFormData };
  }),
  resetFormData: () => set({ formData: defaultFormData }),
  setGenerationStatus: (generationStatus) => set({ generationStatus }),
  setGenerationProgress: (generationProgress) => set({ generationProgress }),
  setWsConnected: (wsConnected) => set({ wsConnected }),
}));
export default useAssignmentStore;
