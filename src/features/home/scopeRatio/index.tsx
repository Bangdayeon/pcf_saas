'use client';

import Loading from '@/components/ui/Loading';
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';

import { useScopeMonthly } from './useScopeMonthly';
import { useScopeRatio } from './useScopeRatio';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
);

const MONTHS = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
];

const SCOPES = [
  { label: 'Scope 1', color: '#148f5e' },
  { label: 'Scope 2', color: '#4fcfa0' },
  { label: 'Scope 3', color: '#bfebdc' },
];

export default function ScopeRatio({ year }: { year: number | null }) {
  const ratio = useScopeRatio(year);
  const monthly = useScopeMonthly(year);

  const isPending = ratio.isPending || monthly.isPending;
  const isError = ratio.isError || monthly.isError;

  return (
    <section className="flex flex-1 flex-col gap-4 rounded-2xl border px-5 py-4 shadow-md md:flex-1">
      <p className="text-lg font-bold">Scope별 비율 (tCO2e)</p>
      {year === null ? (
        <p className="text-muted-foreground text-sm">데이터가 없습니다.</p>
      ) : isError ? (
        <p className="text-sm text-red-500">데이터를 불러오지 못했습니다.</p>
      ) : isPending ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-8 md:items-center lg:flex-row">
          {/* 도넛 차트 + 범례 */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-36 shrink-0">
              <Doughnut
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                    tooltip: {
                      callbacks: { label: (ctx: any) => `${ctx.parsed.toFixed(2)} tCO2e` },
                    },
                  },
                }}
                data={{
                  labels: SCOPES.map(s => s.label),
                  datasets: [
                    {
                      data: [
                        ratio.data!.scope1.tCo2e,
                        ratio.data!.scope2.tCo2e,
                        ratio.data!.scope3.tCo2e,
                      ],
                      backgroundColor: SCOPES.map(s => s.color),
                      borderWidth: 0,
                    },
                  ],
                }}
              />
            </div>
            <ul className="flex flex-col gap-2 text-sm">
              {SCOPES.map((s, i) => {
                const d = [ratio.data!.scope1, ratio.data!.scope2, ratio.data!.scope3][i];
                return (
                  <li key={s.label} className="flex items-center gap-2">
                    <div
                      className="h-4 w-4 shrink-0 rounded-lg"
                      style={{ backgroundColor: s.color }}
                    />
                    <span className="font-medium">{s.label}</span>
                    <span className="text-muted-foreground">
                      {d.tCo2e.toFixed(2)} ({d.percentage.toFixed(1)}%)
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* 월별 추이 라인 차트 */}
          <div className="w-full max-w-150">
            <p className="p-2 text-sm font-semibold">월 별 Scope 변화량 추이</p>
            <Line
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'bottom' },
                  tooltip: {
                    callbacks: {
                      label: (ctx: any) => `${ctx.dataset.label}: ${ctx.parsed.y.toFixed(2)} tCO2e`,
                    },
                  },
                },
                scales: { y: { beginAtZero: true } },
              }}
              data={{
                labels: MONTHS,
                datasets: [
                  {
                    label: 'Scope 1',
                    data: monthly.data!.scope1,
                    borderColor: '#148f5e',
                    tension: 0.4,
                    fill: false,
                  },
                  {
                    label: 'Scope 2',
                    data: monthly.data!.scope2,
                    borderColor: '#4fcfa0',
                    tension: 0.4,
                    fill: false,
                  },
                  {
                    label: 'Scope 3',
                    data: monthly.data!.scope3,
                    borderColor: '#bfebdc',
                    tension: 0.4,
                    fill: false,
                  },
                ],
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
