import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { workflowsApi } from '../api/workflows.api';

const KEYS = { all: ['workflows'] as const, detail: (id: string) => ['workflows', id] as const };

export function useWorkflowsList(params?: Record<string, unknown>) {
  return useQuery({ queryKey: [...KEYS.all, params], queryFn: () => workflowsApi.getAll(params) });
}

export function useWorkflowss(params?: Record<string, unknown>) {
  return useWorkflowsList(params);
}

export function useWorkflow(id: string) {
  return useQuery({ queryKey: KEYS.detail(id), queryFn: () => workflowsApi.getById(id), enabled: !!id });
}

export function useWorkflows(id: string) {
  return useWorkflow(id);
}

export function useCreateWorkflow() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: unknown) => workflowsApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all }),
  });
}

export function useCreateWorkflows() {
  return useCreateWorkflow();
}

export function useUpdateWorkflow() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: unknown }) => workflowsApi.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all }),
  });
}

export function useUpdateWorkflows() {
  return useUpdateWorkflow();
}

export function useDeleteWorkflow() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => workflowsApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all }),
  });
}

export function useDeleteWorkflows() {
  return useDeleteWorkflow();
}
