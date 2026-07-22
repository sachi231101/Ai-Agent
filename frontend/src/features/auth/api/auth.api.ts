import { apiClient } from '@/lib/axios';
import type { AuthUser } from '@/store/auth.store';

export interface LoginDto { email: string; password: string; }
export interface RegisterDto { name: string; email: string; password: string; }
export interface AuthResponse { user: AuthUser; tokens: { accessToken: string; refreshToken: string; }; }

export const authApi = {
  register: async (data: RegisterDto): Promise<AuthResponse> => {
    const res = await apiClient.post('/auth/register', data);
    return res.data.data;
  },

  login: async (data: LoginDto): Promise<AuthResponse> => {
    const res = await apiClient.post('/auth/login', data);
    return res.data.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },

  me: async (): Promise<AuthUser> => {
    const res = await apiClient.get('/auth/me');
    return res.data.data;
  },

  refresh: async (refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> => {
    const res = await apiClient.post('/auth/refresh', { refreshToken });
    return res.data.data;
  },

  forgotPassword: async (email: string): Promise<void> => {
    await apiClient.post('/auth/forgot-password', { email });
  },

  resetPassword: async (data: { token: string; password: string }): Promise<void> => {
    await apiClient.post('/auth/reset-password', data);
  },
};
