import { apiClient } from '@/lib/axios';

export const workflowsApi = {
  getAll: async (params?: Record<string, unknown>) => {
    const res = await apiClient.get('/workflows', { params });
    return res.data.data;
  },
  getById: async (id: string) => {
    const res = await apiClient.get(`/workflows/${id}`);
    return res.data.data;
  },
  create: async (data: unknown) => {
    const res = await apiClient.post('/workflows', data);
    return res.data.data;
  },
  update: async (id: string, data: unknown) => {
    const res = await apiClient.patch(`/workflows/${id}`, data);
    return res.data.data;
  },
  remove: async (id: string) => {
    await apiClient.delete(`/workflows/${id}`);
  },
};
