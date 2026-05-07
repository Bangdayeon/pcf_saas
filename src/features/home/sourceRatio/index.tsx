'use client';

import Loading from '@/components/ui/Loading';
import Pagination from '@/components/ui/Pagination';
import { useState } from 'react';

import { SourceRatioItem, useSourceRatio } from './useSourceRatio';

// 활동별 색상 (최대 10종)
const COLORS = [
  '#22c55e',
  '#3b82f6',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#06b6d4',
  '#f97316',
  '#ec4899',
  '#10b981',
  '#6366f1',
];

const PAGE_SIZE = 10;

function Bar({ items }: { items: SourceRatioItem[] }) {
  // 배출량 0 제외
  const visible = items.filter(item => item.tCo2e > 0);
  if (visible.length === 0)
    return <p className="text-muted-foreground text-sm">배출 데이터가 없습니다.</p>;

  return (
    <div className="flex h-6 w-full overflow-hidden rounded-md">
      {visible.map((item, i) => (
        <div
          key={item.name}
          style={{ width: `${item.percentage}%`, backgroundColor: COLORS[i % COLORS.length] }}
          title={`${item.name}: ${item.percentage.toFixed(1)}%`}
        />
      ))}
    </div>
  );
}

function List({ items }: { items: SourceRatioItem[] }) {
  const [page, setPage] = useState(1);
  const pageItems = items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="flex flex-col gap-2">
      {pageItems.map((item, i) => {
        const globalIndex = (page - 1) * PAGE_SIZE + i;
        const color = COLORS[globalIndex % COLORS.length];
        return (
          <div key={item.name} className="flex items-center gap-3 text-sm">
            {/* 색상 표시 (배출량 0이면 회색) */}
            <div
              className="h-4 w-4 shrink-0 rounded-lg"
              style={{ backgroundColor: item.tCo2e > 0 ? color : '#d1d5db' }}
            />
            <span className="flex-1 truncate">{item.name}</span>
            <span className="text-muted-foreground">
              {item.tCo2e.toFixed(2)} ({item.percentage.toFixed(1)}%)
            </span>
          </div>
        );
      })}
      <Pagination page={page} total={items.length} pageSize={PAGE_SIZE} onPageChange={setPage} />
    </div>
  );
}

export default function SourceRatio({ year }: { year: number | null }) {
  const { data, isPending, isError } = useSourceRatio(year);

  return (
    <section className="flex flex-col gap-4 rounded-2xl border px-5 py-4 shadow-md">
      <p className="text-lg font-bold">활동별 배출량 (tCO2e)</p>
      {year === null ? (
        <p className="text-muted-foreground text-sm">데이터가 없습니다.</p>
      ) : isError ? (
        <p className="text-sm text-red-500">데이터를 불러오지 못했습니다.</p>
      ) : isPending ? (
        <Loading />
      ) : (
        <>
          <Bar items={data.items} />
          <List items={data.items} />
        </>
      )}
    </section>
  );
}
