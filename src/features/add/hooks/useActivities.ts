'use client';

import { useCallback, useEffect, useState } from 'react';

export interface CompanyOption {
  id: string;
  name: string;
}

export function useCompanies() {
  const [data, setData] = useState<CompanyOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch('/api/companies');
        const json = await res.json();

        if (!res.ok) throw new Error(json.error ?? 'Failed to fetch companies');

        setData(json);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
}
