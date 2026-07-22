import { apiClient } from '@/lib/axios';

export const analyticsApi = {
  getAll: async (params?: Record<string, unknown>) => {
    const res = await apiClient.get('/analytics', { params });
    return res.data.data;
  },
  getById: async (id: string) => {
    const res = await apiClient.get(`/analytics/${id}`);
    return res.data.data;
  },
  create: async (data: unknown) => {
    const res = await apiClient.post('/analytics', data);
    return res.data.data;
  },
  update: async (id: string, data: unknown) => {
    const res = await apiClient.patch(`/analytics/${id}`, data);
    return res.data.data;
  },
  remove: async (id: string) => {
    await apiClient.delete(`/analytics/${id}`);
  },
};
