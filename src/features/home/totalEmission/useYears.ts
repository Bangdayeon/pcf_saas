'use client';

import { fetcher } from '@/lib/fetcher';
import { useQuery } from '@tanstack/react-query';

export function useYears() {
  return useQuery({
    queryKey: ['years'],
    queryFn: () => fetcher<{ years: number[] }>('/api/years'),
  });
}
