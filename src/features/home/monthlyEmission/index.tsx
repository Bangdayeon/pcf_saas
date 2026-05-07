'use client';
import Loading from '@/components/ui/Loading';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  CategoryScale,
  Chart as ChartJS,
  Tooltip as ChartTooltip,
  Filler,
  LineElement,
  LinearScale,
  PointElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { useMonthlyEmission } from './useMonthlyEmission';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ChartTooltip, Filler);

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

function makeOptions(monthly: number[]) {
  return {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx: any) => `${ctx.parsed.y.toFixed(2)} tCO2e`,
          afterLabel: (ctx: any) => {
            const i = ctx.dataIndex;
            if (i === 0 || monthly[i - 1] === 0) return '';
            const pct = ((monthly[i] - monthly[i - 1]) / monthly[i - 1]) * 100;
            return pct >= 0 ? `전월 대비 +${pct.toFixed(1)}%` : `전월 대비 ${pct.toFixed(1)}%`;
          },
        },
      },
    },
    scales: { y: { beginAtZero: true } },
  };
}

export default function MonthlyEmission({ year }: { year: number | null }) {
  const { data, isPending, isError } = useMonthlyEmission(year);

  return (
    <section className="flex flex-col gap-3 rounded-2xl border px-5 py-4 shadow-md md:flex-1">
      <div className="flex items-center gap-2">
        <p className="text-lg font-bold">월 별 배출량 (tCO2e)</p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="h-5 w-5 cursor-default rounded-full border text-sm">
              ?
            </TooltipTrigger>
            <TooltipContent>
              <p>각 포인트에서 해당 월의 총 배출량과 전월 대비 증감을 확인할 수 있습니다.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {isError ? (
        <p className="text-sm text-red-500">데이터를 불러오지 못했습니다.</p>
      ) : isPending ? (
        <Loading />
      ) : (
        <Line
          options={makeOptions(data.monthly)}
          data={{
            labels: MONTHS,
            datasets: [
              {
                label: `${year}년 (tCO2e)`,
                data: data.monthly,
                borderColor: 'rgb(34, 197, 94)',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                tension: 0.4,
                fill: true,
              },
            ],
          }}
        />
      )}
    </section>
  );
}
