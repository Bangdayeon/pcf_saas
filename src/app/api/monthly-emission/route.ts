import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const year = Number(req.nextUrl.searchParams.get('year'));
  if (!year) return Response.json({ error: 'year is required' }, { status: 400 });

  const records = await prisma.activityData.findMany({
    where: {
      date: { gte: new Date(`${year}-01-01`), lt: new Date(`${year + 1}-01-01`) },
    },
    select: { date: true, emissionKgCo2e: true },
  });

  // 월별(0~11) tCO2e 합산 — kg → tCO2e 변환
  const monthly = Array<number>(12).fill(0);
  records.forEach(r => {
    monthly[r.date.getMonth()] += (r.emissionKgCo2e ?? 0) / 1000;
  });

  return Response.json({ monthly });
}
