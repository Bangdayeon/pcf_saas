'use client';

import { useCallback, useEffect, useState } from 'react';

export interface ActivityUnitOption {
  id: string;
  unit: string;
  isDefault: boolean;
  category: string;
}

export function useActivityUnits(category?: string) {
  const [data, setData] = useState<ActivityUnitOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        if (category) params.set('category', category);

        const res = await fetch(`/api/activity-unit?${params.toString()}`);
        const json = await res.json();

        if (!res.ok) throw new Error(json.error ?? 'Failed to fetch units');

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
