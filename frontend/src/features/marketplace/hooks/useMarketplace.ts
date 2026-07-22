import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { marketplaceApi } from '../api/marketplace.api';

const KEYS = { all: ['marketplaces'] as const, detail: (id: string) => ['marketplaces', id] as const };

export function useMarketplaces(params?: Record<string, unknown>) {
  return useQuery({ queryKey: [...KEYS.all, params], queryFn: () => marketplaceApi.getAll(params) });
}

export function useMarketplace(id: string) {
  return useQuery({ queryKey: KEYS.detail(id), queryFn: () => marketplaceApi.getById(id), enabled: !!id });
}

export function useCreateMarketplace() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: unknown) => marketplaceApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all }),
  });
}

export function useUpdateMarketplace() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: unknown }) => marketplaceApi.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all }),
  });
}

export function useDeleteMarketplace() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => marketplaceApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all }),
  });
}
