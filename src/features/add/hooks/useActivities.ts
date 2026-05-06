'use client';

import { fetcher } from '@/lib/fetcher';
import { ActivityOption } from '@/types';
import { useQuery } from '@tanstack/react-query';

export function useActivities() {
  return useQuery({
    queryKey: ['activity'],
    queryFn: () => fetcher<ActivityOption[]>('api/activity'),
  });
}
