import { apiClient } from '@/lib/axios';

export const marketplaceApi = {
  getAll: async (params?: Record<string, unknown>) => {
    const res = await apiClient.get('/marketplace', { params });
    return res.data.data;
  },
  getById: async (id: string) => {
    const res = await apiClient.get(`/marketplace/${id}`);
    return res.data.data;
  },
  create: async (data: unknown) => {
    const res = await apiClient.post('/marketplace', data);
    return res.data.data;
  },
  update: async (id: string, data: unknown) => {
    const res = await apiClient.patch(`/marketplace/${id}`, data);
    return res.data.data;
  },
  remove: async (id: string) => {
    await apiClient.delete(`/marketplace/${id}`);
  },
};
