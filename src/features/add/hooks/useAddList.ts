'use client';

import { useCallback, useState } from 'react';

export interface PendingItem {
  _id: string;
  companyName: string;
  date: string;
  activity: string;
  quantity: number;
  unit: string;
  description?: string;
}

const STORAGE_KEY = 'pcf_pending_items';

function loadFromStorage(): PendingItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function useAddList() {
  const [items, setItems] = useState<PendingItem[]>(loadFromStorage);

  const addItem = useCallback(
    (item: Omit<PendingItem, '_id'>) => {
      setItems(prev => {
        const next = [...prev, { ...item, _id: crypto.randomUUID() }];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    },
    [],
  );

  const removeItems = useCallback(
    (ids: string[]) => {
      setItems(prev => {
        const next = prev.filter(item => !ids.includes(item._id));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    },
    [],
  );

  const clear = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    setItems([]);
  }, []);

  return { items, addItem, removeItems, clear };
}
