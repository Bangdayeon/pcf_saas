'use client';

import { useCallback, useState } from 'react';

export interface PendingItem {
  _id: string; // 로컬 key용 임시 ID
  companyName: string;
  date: string;
  activity: string;
  quantity: number;
  unit: string;
}

export function useAddList() {
  const [items, setItems] = useState<PendingItem[]>([]);

  const addItem = useCallback((item: Omit<PendingItem, '_id'>) => {
    setItems(prev => [...prev, { ...item, _id: crypto.randomUUID() }]);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item._id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  return { items, addItem, removeItem, clear };
}
