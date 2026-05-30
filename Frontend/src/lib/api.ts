import axios from 'axios';
import { Assignment } from '@/types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAssignments = async (): Promise<Assignment[]> => {
  const response = await api.get('/assignments');
  return response.data;
};

export const createAssignment = async (formData: FormData): Promise<Assignment> => {
  const response = await api.post('/assignments', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getAssignmentById = async (id: string): Promise<Assignment> => {
  const response = await api.get(`/assignments/${id}`);
  return response.data;
};

export const deleteAssignmentById = async (id: string): Promise<{ success: boolean }> => {
  const response = await api.delete(`/assignments/${id}`);
  return response.data;
};

export default api;
