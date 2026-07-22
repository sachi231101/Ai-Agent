import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsApi } from '../api/settings.api';

const KEYS = { all: ['settingss'] as const, detail: (id: string) => ['settingss', id] as const };

export function useSettingss(params?: Record<string, unknown>) {
  return useQuery({ queryKey: [...KEYS.all, params], queryFn: () => settingsApi.getAll(params) });
}

export function useSettings(id: string) {
  return useQuery({ queryKey: KEYS.detail(id), queryFn: () => settingsApi.getById(id), enabled: !!id });
}

export function useCreateSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: unknown) => settingsApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all }),
  });
}

export function useUpdateSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: unknown }) => settingsApi.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all }),
  });
}

export function useDeleteSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => settingsApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all }),
  });
}
