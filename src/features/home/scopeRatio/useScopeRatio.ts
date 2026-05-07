import { fetcher } from '@/lib/fetcher';
import { useQuery } from '@tanstack/react-query';

export interface ScopeData {
  tCo2e: number;
  percentage: number;
}

export interface ScopeRatioData {
  scope1: ScopeData;
  scope2: ScopeData;
  scope3: ScopeData;
}

export function useScopeRatio(year: number | null) {
  return useQuery({
    queryKey: ['scopeRatio', year],
    queryFn: () => fetcher<ScopeRatioData>(`/api/scope-ratio?year=${year}`),
    enabled: year !== null,
  });
}
