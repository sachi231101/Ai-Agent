import { apiClient } from '@/lib/axios';

export const notificationsApi = {
  getAll: async (params?: Record<string, unknown>) => {
    const res = await apiClient.get('/notifications', { params });
    return res.data.data;
  },
  getById: async (id: string) => {
    const res = await apiClient.get(`/notifications/${id}`);
    return res.data.data;
  },
  create: async (data: unknown) => {
    const res = await apiClient.post('/notifications', data);
    return res.data.data;
  },
  update: async (id: string, data: unknown) => {
    const res = await apiClient.patch(`/notifications/${id}`, data);
    return res.data.data;
  },
  remove: async (id: string) => {
    await apiClient.delete(`/notifications/${id}`);
  },
};
