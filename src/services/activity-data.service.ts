import { prisma } from '@/lib/prisma';
import { CreateActivityDataBody } from '@/types';

export async function getActivityDataList(params: {
  companyId: string;
  page: number;
  pageSize: number;
}) {
  const where = { companyId: params.companyId };

  const [rows, total] = await Promise.all([
    prisma.activityData.findMany({
      where,
      select: {
        id: true,
        date: true,
        activityId: true,
        activity: { select: { name: true } },
        category: true,
        scope: true,
        quantity: true,
        activityUnit: { select: { unit: true } },
        emissionKgCo2e: true,
      },
      orderBy: { date: 'desc' },
      skip: (params.page - 1) * params.pageSize,
      take: params.pageSize,
    }),
    prisma.activityData.count({ where }),
  ]);

  const items = rows.map(r => ({
    id: r.id,
    date: r.date.toISOString(),
    activityId: r.activityId,
    activity: r.activity.name,
    category: r.category,
    scope: r.scope,
    quantity: r.quantity,
    unit: r.activityUnit.unit,
    emissionKgCo2e: r.emissionKgCo2e,
  }));

  return { items, total, page: params.page, pageSize: params.pageSize };
}

export async function createActivityData(body: CreateActivityDataBody) {
  const activity = await prisma.activity.findUnique({ where: { id: body.activityId } });
  if (!activity) throw new Error('invalid activity');

  const factor = await prisma.emissionFactor.findFirst({
    where: { activityId: body.activityId, isLatest: true },
  });

  return prisma.activityData.create({
    data: {
      date: new Date(body.date),
      activityId: body.activityId,
      category: activity.category,
      scope: activity.scope,
      quantity: body.quantity,
      activityUnitId: body.activityUnitId,
      emissionKgCo2e: factor ? body.quantity * factor.factor : null,
      companyId: body.companyId,
      emissionFactorId: factor?.id ?? null,
    },
  });
}
