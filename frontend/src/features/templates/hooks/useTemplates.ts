import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { templatesApi } from '../api/templates.api';

const KEYS = { all: ['templatess'] as const, detail: (id: string) => ['templatess', id] as const };

export function useTemplatess(params?: Record<string, unknown>) {
  return useQuery({ queryKey: [...KEYS.all, params], queryFn: () => templatesApi.getAll(params) });
}

export function useTemplates(id: string) {
  return useQuery({ queryKey: KEYS.detail(id), queryFn: () => templatesApi.getById(id), enabled: !!id });
}

export function useCreateTemplates() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: unknown) => templatesApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all }),
  });
}

export function useUpdateTemplates() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: unknown }) => templatesApi.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all }),
  });
}

export function useDeleteTemplates() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => templatesApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all }),
  });
}
