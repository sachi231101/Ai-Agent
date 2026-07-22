import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationsApi } from '../api/notifications.api';

const KEYS = { all: ['notificationss'] as const, detail: (id: string) => ['notificationss', id] as const };

export function useNotificationss(params?: Record<string, unknown>) {
  return useQuery({ queryKey: [...KEYS.all, params], queryFn: () => notificationsApi.getAll(params) });
}

export function useNotifications(id: string) {
  return useQuery({ queryKey: KEYS.detail(id), queryFn: () => notificationsApi.getById(id), enabled: !!id });
}

export function useCreateNotifications() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: unknown) => notificationsApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all }),
  });
}

export function useUpdateNotifications() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: unknown }) => notificationsApi.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all }),
  });
}

export function useDeleteNotifications() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => notificationsApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all }),
  });
}
