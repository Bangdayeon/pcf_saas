import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const year = Number(req.nextUrl.searchParams.get('year'));
  if (!year) return Response.json({ error: 'year is required' }, { status: 400 });

  const grouped = await prisma.activityData.groupBy({
    by: ['scope'],
    where: { date: { gte: new Date(`${year}-01-01`), lt: new Date(`${year + 1}-01-01`) } },
    _sum: { emissionKgCo2e: true },
  });

  const toTco2e = (kg: number | null) => (kg ?? 0) / 1000;
  const scope1 = toTco2e(grouped.find(r => r.scope === 'SCOPE_1')?._sum.emissionKgCo2e ?? null);
  const scope2 = toTco2e(grouped.find(r => r.scope === 'SCOPE_2')?._sum.emissionKgCo2e ?? null);
  const scope3 = toTco2e(grouped.find(r => r.scope === 'SCOPE_3')?._sum.emissionKgCo2e ?? null);
  const total = scope1 + scope2 + scope3;

  const pct = (v: number) => (total > 0 ? (v / total) * 100 : 0);

  return Response.json({
    scope1: { tCo2e: scope1, percentage: pct(scope1) },
    scope2: { tCo2e: scope2, percentage: pct(scope2) },
    scope3: { tCo2e: scope3, percentage: pct(scope3) },
  });
}
