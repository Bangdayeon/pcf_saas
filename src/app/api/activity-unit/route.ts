import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get('category');

  const data = await prisma.activityUnit.findMany({
    where: category ? { category: category as any } : undefined,
    select: {
      id: true,
      unit: true,
      isDefault: true,
    },
  });

  return Response.json(data);
}
