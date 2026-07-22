import { apiClient } from '@/lib/axios';

export const knowledgeApi = {
  getAll: async (params?: Record<string, unknown>) => {
    const res = await apiClient.get('/knowledge', { params });
    return res.data.data;
  },
  getById: async (id: string) => {
    const res = await apiClient.get(`/knowledge/${id}`);
    return res.data.data;
  },
  create: async (data: unknown) => {
    const res = await apiClient.post('/knowledge', data);
    return res.data.data;
  },
  update: async (id: string, data: unknown) => {
    const res = await apiClient.patch(`/knowledge/${id}`, data);
    return res.data.data;
  },
  remove: async (id: string) => {
    await apiClient.delete(`/knowledge/${id}`);
  },
};
