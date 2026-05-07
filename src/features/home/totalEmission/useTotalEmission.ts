'use client';

import { fetcher } from '@/lib/fetcher';
import { useQuery } from '@tanstack/react-query';

export function useTotalEmission(year: number | null) {
  return useQuery({
    queryKey: ['totalEmission', year],
    queryFn: () => fetcher<{ tCo2e: number }>(`/api/total-emission?year=${year}`),
    enabled: year !== null,
  });
}
