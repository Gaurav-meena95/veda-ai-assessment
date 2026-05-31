import { create } from 'zustand';
import axios from 'axios';
import { User } from '@/types';

// Safe helper to access localStorage on client-side only
const getStoredToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('veda_auth_token');
  }
  return null;
};

const getStoredUser = (): User | null => {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('veda_auth_user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
  }
  return null;
};

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, school: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const useAuthStore = create<AuthState>((set, get) => ({
  user: getStoredUser(),
  token: getStoredToken(),
  isAuthenticated: !!getStoredToken(),
  loading: false,
  error: null,

  clearError: () => set({ error: null }),

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { token, user } = response.data;

      if (typeof window !== 'undefined') {
        localStorage.setItem('veda_auth_token', token);
        localStorage.setItem('veda_auth_user', JSON.stringify(user));
      }

      set({ token, user, isAuthenticated: true, loading: false });
      return true;
    } catch (err: any) {
      const errMsg = err.response?.data?.error || 'Invalid credentials or connection issue.';
      set({ error: errMsg, loading: false });
      return false;
    }
  },

  register: async (name, email, password, school) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
        school,
        role: 'Educator'
      });
      const { token, user } = response.data;

      if (typeof window !== 'undefined') {
        localStorage.setItem('veda_auth_token', token);
        localStorage.setItem('veda_auth_user', JSON.stringify(user));
      }

      set({ token, user, isAuthenticated: true, loading: false });
      return true;
    } catch (err: any) {
      const errMsg = err.response?.data?.error || 'Account registration failed. Please try again.';
      set({ error: errMsg, loading: false });
      return false;
    }
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('veda_auth_token');
      localStorage.removeItem('veda_auth_user');
    }
    set({ token: null, user: null, isAuthenticated: false, error: null });
  },

  checkAuth: async () => {
    const { token } = get();
    if (!token) {
      set({ isAuthenticated: false, user: null });
      return;
    }

    set({ loading: true });
    try {
      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const user = response.data;
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('veda_auth_user', JSON.stringify(user));
      }
      
      set({ user, isAuthenticated: true, loading: false });
    } catch {
      // Token is invalid or expired
      if (typeof window !== 'undefined') {
        localStorage.removeItem('veda_auth_token');
        localStorage.removeItem('veda_auth_user');
      }
      set({ token: null, user: null, isAuthenticated: false, loading: false });
    }
  }
}));

export default useAuthStore;
