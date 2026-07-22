import { apiClient } from '@/lib/axios';

export const settingsApi = {
  getAll: async (params?: Record<string, unknown>) => {
    const res = await apiClient.get('/settings', { params });
    return res.data.data;
  },
  getById: async (id: string) => {
    const res = await apiClient.get(`/settings/${id}`);
    return res.data.data;
  },
  create: async (data: unknown) => {
    const res = await apiClient.post('/settings', data);
    return res.data.data;
  },
  update: async (id: string, data: unknown) => {
    const res = await apiClient.patch(`/settings/${id}`, data);
    return res.data.data;
  },
  remove: async (id: string) => {
    await apiClient.delete(`/settings/${id}`);
  },
};
