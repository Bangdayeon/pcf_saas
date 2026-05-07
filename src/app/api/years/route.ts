import { prisma } from '@/lib/prisma';

export async function GET() {
  const dates = await prisma.activityData.findMany({
    select: { date: true },
    distinct: ['date'],
    orderBy: { date: 'desc' },
  });

  const years = [...new Set(dates.map(d => d.date.getFullYear()))];
  return Response.json({ years });
}
