import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { analyticsApi } from '../api/analytics.api';

const KEYS = { all: ['analyticss'] as const, detail: (id: string) => ['analyticss', id] as const };

export function useAnalyticss(params?: Record<string, unknown>) {
  return useQuery({ queryKey: [...KEYS.all, params], queryFn: () => analyticsApi.getAll(params) });
}

export function useAnalytics(id: string) {
  return useQuery({ queryKey: KEYS.detail(id), queryFn: () => analyticsApi.getById(id), enabled: !!id });
}

export function useCreateAnalytics() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: unknown) => analyticsApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all }),
  });
}

export function useUpdateAnalytics() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: unknown }) => analyticsApi.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all }),
  });
}

export function useDeleteAnalytics() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => analyticsApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all }),
  });
}
