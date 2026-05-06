'use client';

import { useTotalEmission } from './useTotalEmission';

export default function TotalEmission({ year }: { year: number }) {
  const { data } = useTotalEmission(year);

  return (
    <section className="flex flex-col border">
      <p>총 배출량</p>
      <div className="flex gap-5">
        <span>{data?.tCo2e.toLocaleString() ?? '-'}</span>
        <span>tCO2e</span>
      </div>
    </section>
  );
}
