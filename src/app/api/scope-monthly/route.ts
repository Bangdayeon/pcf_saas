import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const year = Number(req.nextUrl.searchParams.get('year'));
  if (!year) return Response.json({ error: 'year is required' }, { status: 400 });

  const records = await prisma.activityData.findMany({
    where: { date: { gte: new Date(`${year}-01-01`), lt: new Date(`${year + 1}-01-01`) } },
    select: { date: true, scope: true, emissionKgCo2e: true },
  });

  const scope1 = Array<number>(12).fill(0);
  const scope2 = Array<number>(12).fill(0);
  const scope3 = Array<number>(12).fill(0);

  records.forEach(r => {
    const m = r.date.getMonth();
    const val = (r.emissionKgCo2e ?? 0) / 1000;
    if (r.scope === 'SCOPE_1') scope1[m] += val;
    else if (r.scope === 'SCOPE_2') scope2[m] += val;
    else if (r.scope === 'SCOPE_3') scope3[m] += val;
  });

  return Response.json({ scope1, scope2, scope3 });
}
