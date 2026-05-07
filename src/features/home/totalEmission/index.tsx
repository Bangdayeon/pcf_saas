'use client';

import Loading from '@/components/ui/Loading';

import { useTotalEmission } from './useTotalEmission';

export default function TotalEmission({ year }: { year: number | null }) {
  const { data, isPending, isError } = useTotalEmission(year);

  return (
    <section className="flex flex-col gap-3 rounded-2xl border px-5 py-4 shadow-md">
      <p className="text-2xl font-bold">총 배출량</p>
      <div className="flex items-center gap-4">
        {year === null ? (
          <span className="text-muted-foreground text-sm">데이터가 없습니다.</span>
        ) : isError ? (
          <span className="text-sm text-red-500">데이터를 불러오지 못했습니다.</span>
        ) : (
          <>
            <span className="text-4xl font-bold">
              {isPending ? <Loading /> : data?.tCo2e.toLocaleString()}
            </span>
            <span className="text-green700 font-semibold">tCO2e</span>
          </>
        )}
      </div>
    </section>
  );
}
