'use client';

import type { CreateActivityDataBody } from '@/types';
import { useCallback, useState } from 'react';

export function useCreateActivity() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createActivity = useCallback(async (body: CreateActivityDataBody) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Unknown error');
      return json;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { createActivity, loading, error };
}
