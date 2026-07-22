import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { studioApi } from '../api/studio.api';

const KEYS = { all: ['studios'] as const, detail: (id: string) => ['studios', id] as const };

export function useStudios(params?: Record<string, unknown>) {
  return useQuery({ queryKey: [...KEYS.all, params], queryFn: () => studioApi.getAll(params) });
}

export function useStudio(id: string) {
  return useQuery({ queryKey: KEYS.detail(id), queryFn: () => studioApi.getById(id), enabled: !!id });
}

export function useCreateStudio() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: unknown) => studioApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all }),
  });
}

export function useUpdateStudio() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: unknown }) => studioApi.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all }),
  });
}

export function useDeleteStudio() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => studioApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all }),
  });
}
