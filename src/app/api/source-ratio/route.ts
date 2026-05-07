import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const year = Number(req.nextUrl.searchParams.get('year'));
  if (!year) return Response.json({ error: 'year is required' }, { status: 400 });

  const grouped = await prisma.activityData.groupBy({
    by: ['activityId'],
    where: { date: { gte: new Date(`${year}-01-01`), lt: new Date(`${year + 1}-01-01`) } },
    _sum: { emissionKgCo2e: true },
  });

  const activities = await prisma.activity.findMany({
    where: { id: { in: grouped.map(r => r.activityId) } },
    select: { id: true, name: true },
  });
  const nameMap = Object.fromEntries(activities.map(a => [a.id, a.name]));

  const items = grouped
    .map(r => ({ name: nameMap[r.activityId] ?? r.activityId, tCo2e: (r._sum.emissionKgCo2e ?? 0) / 1000 }))
    .sort((a, b) => b.tCo2e - a.tCo2e);

  const total = items.reduce((sum, r) => sum + r.tCo2e, 0);

  return Response.json({
    items: items.map(r => ({ ...r, percentage: total > 0 ? (r.tCo2e / total) * 100 : 0 })),
  });
}
