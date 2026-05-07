'use client';
import Loading from '@/components/ui/Loading';
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { useMonthlyEmission } from './useMonthlyEmission';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

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

const OPTIONS = {
  responsive: true,
  plugins: {
    tooltip: {
      callbacks: {
        // 툴팁에 단위 표시
        label: (ctx: any) => `${ctx.parsed.y.toFixed(2)} tCO2e`,
      },
    },
  },
  scales: { y: { beginAtZero: true } },
} as const;

export default function MonthlyEmission({ year }: { year: number | null }) {
  const { data, isPending, isError } = useMonthlyEmission(year);

  return (
    <section className="flex flex-col gap-3 rounded-2xl border px-5 py-4 shadow-md">
      <p className="text-lg font-bold">월 별 배출량 (tCO2e)</p>
      {isError ? (
        <p className="text-sm text-red-500">데이터를 불러오지 못했습니다.</p>
      ) : isPending ? (
        <Loading />
      ) : (
        <Line
          options={OPTIONS}
          data={{
            labels: MONTHS,
            datasets: [
              {
                label: `${year}년 (tCO2e)`,
                data: data.monthly,
                borderColor: 'rgb(34, 197, 94)',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                tension: 0.4, // 라인 곡률
                fill: true,
              },
            ],
          }}
        />
      )}
    </section>
  );
}
