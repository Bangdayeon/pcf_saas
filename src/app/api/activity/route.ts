import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');

  const datas = await prisma.activity.findMany({
    where: category ? { category: category as any } : undefined,
    select: { id: true, name: true, category: true },
  });

  return Response.json(datas);
}
