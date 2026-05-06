import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const year = Number(req.nextUrl.searchParams.get('year'));
  if (!year) return Response.json({ error: 'year is required' }, { status: 400 });

  const result = await prisma.activityData.aggregate({
    where: {
      date: { gte: new Date(`${year}-01-01`), lt: new Date(`${year + 1}-01-01`) },
    },
    _sum: { emissionKgCo2e: true },
  });

  return Response.json({ tCo2e: (result._sum.emissionKgCo2e ?? 0) / 1000 });
}
