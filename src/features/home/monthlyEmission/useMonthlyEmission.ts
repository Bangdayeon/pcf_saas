'use client';

import { fetcher } from '@/lib/fetcher';
import { useQuery } from '@tanstack/react-query';

export function useMonthlyEmission(year: number | null) {
  return useQuery({
    queryKey: ['monthlyEmission', year],
    queryFn: () => fetcher<{ monthly: number[] }>(`/api/monthly-emission?year=${year}`),
    enabled: year !== null,
  });
}
