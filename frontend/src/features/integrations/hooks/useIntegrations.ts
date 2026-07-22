import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { integrationsApi } from '../api/integrations.api';

const KEYS = { all: ['integrationss'] as const, detail: (id: string) => ['integrationss', id] as const };

export function useIntegrationss(params?: Record<string, unknown>) {
  return useQuery({ queryKey: [...KEYS.all, params], queryFn: () => integrationsApi.getAll(params) });
}

export function useIntegrations(id: string) {
  return useQuery({ queryKey: KEYS.detail(id), queryFn: () => integrationsApi.getById(id), enabled: !!id });
}

export function useCreateIntegrations() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: unknown) => integrationsApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all }),
  });
}

export function useUpdateIntegrations() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: unknown }) => integrationsApi.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all }),
  });
}

export function useDeleteIntegrations() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => integrationsApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all }),
  });
}
