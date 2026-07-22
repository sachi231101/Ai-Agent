import { apiClient } from '@/lib/axios';

export const dashboardApi = {
  getAll: async (params?: Record<string, unknown>) => {
    const res = await apiClient.get('/dashboards', { params });
    return res.data.data;
  },
  getById: async (id: string) => {
    const res = await apiClient.get(`/dashboards/${id}`);
    return res.data.data;
  },
  create: async (data: unknown) => {
    const res = await apiClient.post('/dashboards', data);
    return res.data.data;
  },
  update: async (id: string, data: unknown) => {
    const res = await apiClient.patch(`/dashboards/${id}`, data);
    return res.data.data;
  },
  remove: async (id: string) => {
    await apiClient.delete(`/dashboards/${id}`);
  },
};
