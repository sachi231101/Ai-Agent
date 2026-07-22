import { apiClient } from '@/lib/axios';

export const agentsApi = {
  getAll: async (params?: Record<string, unknown>) => {
    const res = await apiClient.get('/agents', { params });
    return res.data.data;
  },
  getById: async (id: string) => {
    const res = await apiClient.get(`/agents/${id}`);
    return res.data.data;
  },
  create: async (data: unknown) => {
    const res = await apiClient.post('/agents', data);
    return res.data.data;
  },
  update: async (id: string, data: unknown) => {
    const res = await apiClient.patch(`/agents/${id}`, data);
    return res.data.data;
  },
  remove: async (id: string) => {
    await apiClient.delete(`/agents/${id}`);
  },
};
