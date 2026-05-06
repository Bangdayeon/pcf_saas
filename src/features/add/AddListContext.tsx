'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

export interface PendingItem {
  _id: string;
  companyId: string;
  companyName: string;
  date: string;
  activityId: string;
  activity: string;
  quantity: number;
  activityUnitId: string;
  unit: string;
  description?: string;
}

interface AddListContextValue {
  items: PendingItem[];
  // true = added, false = skipped (duplicate)
  addItem: (item: Omit<PendingItem, '_id'>) => boolean;
  removeItems: (ids: string[]) => void;
  clear: () => void;
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

function itemKey(item: Omit<PendingItem, '_id' | 'description'>) {
  return `${item.companyName}|${item.date}|${item.activity}|${item.quantity}|${item.unit}`;
}

const AddListContext = createContext<AddListContextValue | null>(null);

export function AddListProvider({ children }: { children: React.ReactNode }) {
  // 서버/클라이언트 모두 []로 시작 → hydration mismatch 방지
  // 마운트 후 useEffect에서 localStorage와 동기화
  const [items, setItems] = useState<PendingItem[]>([]);
  // ref는 항상 최신 목록을 동기적으로 참조 — 배치 추가(Excel) 시 stale closure 방지
  const itemsRef = useRef<PendingItem[]>([]);

  useEffect(() => {
    const loaded = loadFromStorage();
    itemsRef.current = loaded;
    // 외부 시스템(localStorage) 읽기 후 단 1회 동기화. cascade 없음
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(loaded);
  }, []);

  const addItem = useCallback((item: Omit<PendingItem, '_id'>): boolean => {
    if (itemsRef.current.some(e => itemKey(e) === itemKey(item))) return false;

    const next = [...itemsRef.current, { ...item, _id: crypto.randomUUID() }];
    itemsRef.current = next;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setItems(next);
    return true;
  }, []);

  const removeItems = useCallback((ids: string[]) => {
    const next = itemsRef.current.filter(item => !ids.includes(item._id));
    itemsRef.current = next;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setItems(next);
  }, []);

  const clear = useCallback(() => {
    itemsRef.current = [];
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    setItems([]);
  }, []);

  return (
    <AddListContext.Provider value={{ items, addItem, removeItems, clear }}>
      {children}
    </AddListContext.Provider>
  );
}

export function useAddListContext() {
  const ctx = useContext(AddListContext);
  if (!ctx) throw new Error('useAddListContext must be used within AddListProvider');
  return ctx;
}
