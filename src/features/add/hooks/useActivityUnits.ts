'use client';
import { fetcher } from '@/lib/fetcher';
import { ActivityUnitOption } from '@/types';
import { useQuery } from '@tanstack/react-query';

export function useActivityUnits(category?: string) {
  return useQuery({
    queryKey: ['activityUnits', category],
    queryFn: () =>
      fetcher<ActivityUnitOption[]>(`/api/activity-unit${category ? `?category=${category}` : ''}`),
  });
}
