import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { knowledgeApi } from '../api/knowledge.api';

const KEYS = { all: ['knowledge'] as const, detail: (id: string) => ['knowledge', id] as const };

export function useKnowledgeList(params?: Record<string, unknown>) {
  return useQuery({ queryKey: [...KEYS.all, params], queryFn: () => knowledgeApi.getAll(params) });
}

export function useKnowledges(params?: Record<string, unknown>) {
  return useKnowledgeList(params);
}

export function useKnowledgeItem(id: string) {
  return useQuery({ queryKey: KEYS.detail(id), queryFn: () => knowledgeApi.getById(id), enabled: !!id });
}

export function useKnowledge(id: string) {
  return useKnowledgeItem(id);
}

export function useCreateKnowledge() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: unknown) => knowledgeApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all }),
  });
}

export function useUpdateKnowledge() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: unknown }) => knowledgeApi.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all }),
  });
}

export function useDeleteKnowledge() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => knowledgeApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all }),
  });
}
