'use client';

import SVGIcon from '@/components/ui/SVGIcon';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';

import MonthlyEmission from './monthlyEmission';
import TotalEmission from './totalEmission';
import { useYears } from './totalEmission/useYears';

export default function HomePage() {
  const { data: yearsData } = useYears();
  const years = yearsData?.years ?? [];

  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const effectiveYear = selectedYear ?? years[0] ?? null;

  return (
    <div className="text-gray900 flex flex-col">
      <div className="mb-6 flex items-center gap-4">
        <h1 className="text-2xl font-bold">메인 대시보드</h1>
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" />}>
            <p>{effectiveYear ?? '연도 선택'}</p>
            <SVGIcon icon="IC_Arrow_Drop_Down" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {years.map(y => (
              <DropdownMenuItem key={y} onClick={() => setSelectedYear(y)}>
                {y}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-col gap-10">
        <TotalEmission year={effectiveYear} />

        <MonthlyEmission year={effectiveYear} />
      </div>
    </div>
  );
}
