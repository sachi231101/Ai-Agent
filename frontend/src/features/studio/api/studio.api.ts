import { apiClient } from '@/lib/axios';

export const studioApi = {
  getAll: async (params?: Record<string, unknown>) => {
    const res = await apiClient.get('/studio', { params });
    return res.data.data;
  },
  getById: async (id: string) => {
    const res = await apiClient.get(`/studio/${id}`);
    return res.data.data;
  },
  create: async (data: unknown) => {
    const res = await apiClient.post('/studio', data);
    return res.data.data;
  },
  update: async (id: string, data: unknown) => {
    const res = await apiClient.patch(`/studio/${id}`, data);
    return res.data.data;
  },
  remove: async (id: string) => {
    await apiClient.delete(`/studio/${id}`);
  },
};
