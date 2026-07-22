import { apiClient } from '@/lib/axios';

export const landingApi = {
  getLandingData: async () => {
    const res = await apiClient.get('/landing');
    return res.data.data;
  },
};
