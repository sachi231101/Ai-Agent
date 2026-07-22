import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { billingApi } from '../api/billing.api';

const KEYS = { all: ['billings'] as const, detail: (id: string) => ['billings', id] as const };

export function useBillings(params?: Record<string, unknown>) {
  return useQuery({ queryKey: [...KEYS.all, params], queryFn: () => billingApi.getAll(params) });
}

export function useBilling(id: string) {
  return useQuery({ queryKey: KEYS.detail(id), queryFn: () => billingApi.getById(id), enabled: !!id });
}

export function useCreateBilling() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: unknown) => billingApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all }),
  });
}

export function useUpdateBilling() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: unknown }) => billingApi.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all }),
  });
}

export function useDeleteBilling() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => billingApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all }),
  });
}
