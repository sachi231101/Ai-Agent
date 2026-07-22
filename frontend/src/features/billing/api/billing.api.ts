import { apiClient } from '@/lib/axios';

export const billingApi = {
  getAll: async (params?: Record<string, unknown>) => {
    const res = await apiClient.get('/billing', { params });
    return res.data.data;
  },
  getById: async (id: string) => {
    const res = await apiClient.get(`/billing/${id}`);
    return res.data.data;
  },
  create: async (data: unknown) => {
    const res = await apiClient.post('/billing', data);
    return res.data.data;
  },
  update: async (id: string, data: unknown) => {
    const res = await apiClient.patch(`/billing/${id}`, data);
    return res.data.data;
  },
  remove: async (id: string) => {
    await apiClient.delete(`/billing/${id}`);
  },
};
