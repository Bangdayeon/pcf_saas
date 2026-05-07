import { fetcher } from '@/lib/fetcher';
import { useQuery } from '@tanstack/react-query';

export interface SourceRatioItem {
  name: string;
  tCo2e: number;
  percentage: number;
}

export function useSourceRatio(year: number | null) {
  return useQuery({
    queryKey: ['sourceRatio', year],
    queryFn: () => fetcher<{ items: SourceRatioItem[] }>(`/api/source-ratio?year=${year}`),
    enabled: year !== null,
  });
}
