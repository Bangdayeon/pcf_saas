import { createActivityData, getActivityDataList } from '@/services/activity-data.service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const sp = req.nextUrl.searchParams;

    const companyId = sp.get('companyId');
    if (!companyId) {
      return NextResponse.json({ error: 'companyId is required' }, { status: 400 });
    }

    const page = Number(sp.get('page') ?? 1);
    const pageSize = Number(sp.get('pageSize') ?? 20);

    const result = await getActivityDataList({
      companyId,
      page,
      pageSize,
    });

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: 'internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const created = await createActivityData(body);

    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 400 }
    );
  }
}
