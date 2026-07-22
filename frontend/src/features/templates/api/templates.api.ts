import { apiClient } from '@/lib/axios';

export const templatesApi = {
  getAll: async (params?: Record<string, unknown>) => {
    const res = await apiClient.get('/templates', { params });
    return res.data.data;
  },
  getById: async (id: string) => {
    const res = await apiClient.get(`/templates/${id}`);
    return res.data.data;
  },
  create: async (data: unknown) => {
    const res = await apiClient.post('/templates', data);
    return res.data.data;
  },
  update: async (id: string, data: unknown) => {
    const res = await apiClient.patch(`/templates/${id}`, data);
    return res.data.data;
  },
  remove: async (id: string) => {
    await apiClient.delete(`/templates/${id}`);
  },
};
