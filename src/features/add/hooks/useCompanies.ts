'use client';

import { fetcher } from '@/lib/fetcher';
import { CompanyOption } from '@/types';
import { useQuery } from '@tanstack/react-query';

export function useCompanies() {
  return useQuery({
    queryKey: ['companies'],
    queryFn: () => fetcher<CompanyOption[]>('/api/companies'),
  });
}
