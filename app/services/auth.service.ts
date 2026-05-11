import api from '@/lib/api';
import { LoginPayload, SignUpPayload } from '@/types/auth.types';

export const authService = {
  login: async (data: LoginPayload) => {
    const response = await api.post('/auth/login', data);
    const { accessToken } = response.data;
    
    // Store token in localStorage
    localStorage.setItem('accessToken', accessToken);
    
    return response;
  },

  signup: async (data: SignUpPayload) => {
    const response = await api.post('/auth/signup', data);
    const { accessToken, refreshToken } = response.data;
    
    // Store tokens in localStorage
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    
    return response;
  },

  getMe: async () => {
    const response = await api.get('/auth/me');
    return response;
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    
    // Clear tokens from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    
    return response;
  },
};