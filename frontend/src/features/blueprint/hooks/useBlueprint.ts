import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { blueprintApi } from '../api/blueprint.api';

const KEYS = { all: ['blueprints'] as const, detail: (id: string) => ['blueprints', id] as const };

export function useBlueprints(params?: Record<string, unknown>) {
  return useQuery({ queryKey: [...KEYS.all, params], queryFn: () => blueprintApi.getAll(params) });
}

export function useBlueprint(id: string) {
  return useQuery({ queryKey: KEYS.detail(id), queryFn: () => blueprintApi.getById(id), enabled: !!id });
}

export function useCreateBlueprint() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: unknown) => blueprintApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all }),
  });
}

export function useUpdateBlueprint() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: unknown }) => blueprintApi.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all }),
  });
}

export function useDeleteBlueprint() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => blueprintApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all }),
  });
}
