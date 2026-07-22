import { apiClient } from '@/lib/axios';

export const profileApi = {
  getAll: async (params?: Record<string, unknown>) => {
    const res = await apiClient.get('/profile', { params });
    return res.data.data;
  },
  getById: async (id: string) => {
    const res = await apiClient.get(`/profile/${id}`);
    return res.data.data;
  },
  create: async (data: unknown) => {
    const res = await apiClient.post('/profile', data);
    return res.data.data;
  },
  update: async (id: string, data: unknown) => {
    const res = await apiClient.patch(`/profile/${id}`, data);
    return res.data.data;
  },
  remove: async (id: string) => {
    await apiClient.delete(`/profile/${id}`);
  },
};
