import { apiClient } from '@/lib/axios';

export const blueprintApi = {
  getAll: async (params?: Record<string, unknown>) => {
    const res = await apiClient.get('/blueprints', { params });
    return res.data.data;
  },
  getById: async (id: string) => {
    const res = await apiClient.get(`/blueprints/${id}`);
    return res.data.data;
  },
  create: async (data: unknown) => {
    const res = await apiClient.post('/blueprints', data);
    return res.data.data;
  },
  update: async (id: string, data: unknown) => {
    const res = await apiClient.patch(`/blueprints/${id}`, data);
    return res.data.data;
  },
  remove: async (id: string) => {
    await apiClient.delete(`/blueprints/${id}`);
  },
};
