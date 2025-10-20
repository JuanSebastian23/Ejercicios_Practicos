import axios from 'axios';
import type { AuthResponse, LoginData, RegisterData, User, ProtectedData } from './types';

const API_URL = 'http://localhost:4001/api';

export const authService = {
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/auth/login`, data);
    return response.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/auth/register`, data);
    return response.data;
  },

  getProfile: async (token: string): Promise<User> => {
    const response = await axios.get(`${API_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  getProtectedData: async (token: string): Promise<ProtectedData> => {
    const response = await axios.get(`${API_URL}/protected`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};
