import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { agentsApi } from '../api/agents.api';

const KEYS = { all: ['agents'] as const, detail: (id: string) => ['agents', id] as const };

export function useAgentsList(params?: Record<string, unknown>) {
  return useQuery({ queryKey: [...KEYS.all, params], queryFn: () => agentsApi.getAll(params) });
}

// Alias for backwards compatibility
export function useAgentss(params?: Record<string, unknown>) {
  return useAgentsList(params);
}

export function useAgent(id: string) {
  return useQuery({ queryKey: KEYS.detail(id), queryFn: () => agentsApi.getById(id), enabled: !!id });
}

// Alias for backwards compatibility
export function useAgents(id: string) {
  return useAgent(id);
}

export function useCreateAgent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: unknown) => agentsApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all }),
  });
}

export function useCreateAgents() {
  return useCreateAgent();
}

export function useUpdateAgent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: unknown }) => agentsApi.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all }),
  });
}

export function useUpdateAgents() {
  return useUpdateAgent();
}

export function useDeleteAgent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => agentsApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all }),
  });
}

export function useDeleteAgents() {
  return useDeleteAgent();
}
