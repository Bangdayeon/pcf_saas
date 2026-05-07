import { fetcher } from '@/lib/fetcher';
import { useQuery } from '@tanstack/react-query';

export interface ScopeMonthlyData {
  scope1: number[];
  scope2: number[];
  scope3: number[];
}

export function useScopeMonthly(year: number | null) {
  return useQuery({
    queryKey: ['scopeMonthly', year],
    queryFn: () => fetcher<ScopeMonthlyData>(`/api/scope-monthly?year=${year}`),
    enabled: year !== null,
  });
}
