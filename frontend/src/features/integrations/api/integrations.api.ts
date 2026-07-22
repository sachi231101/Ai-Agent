import { apiClient } from '@/lib/axios';

export const integrationsApi = {
  getAll: async (params?: Record<string, unknown>) => {
    const res = await apiClient.get('/integrations', { params });
    return res.data.data;
  },
  getById: async (id: string) => {
    const res = await apiClient.get(`/integrations/${id}`);
    return res.data.data;
  },
  create: async (data: unknown) => {
    const res = await apiClient.post('/integrations', data);
    return res.data.data;
  },
  update: async (id: string, data: unknown) => {
    const res = await apiClient.patch(`/integrations/${id}`, data);
    return res.data.data;
  },
  remove: async (id: string) => {
    await apiClient.delete(`/integrations/${id}`);
  },
};
