import { PrismaPg } from '@prisma/adapter-pg';
import { ActivityCategory, GhgScope, PrismaClient } from '@prisma/client';
import 'dotenv/config';

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

const ACTIVITY_UNITS: {
  category: ActivityCategory;
  unit: string;
  isDefault: boolean;
  sortOrder: number;
}[] = [
  { category: 'ELECTRICITY', unit: 'kWh', isDefault: true, sortOrder: 0 },
  { category: 'ELECTRICITY', unit: 'MWh', isDefault: false, sortOrder: 1 },
  { category: 'MATERIAL', unit: 'kg', isDefault: true, sortOrder: 0 },
  { category: 'MATERIAL', unit: 'g', isDefault: false, sortOrder: 1 },
  { category: 'MATERIAL', unit: 'ton', isDefault: false, sortOrder: 2 },
  { category: 'TRANSPORT', unit: 'ton-km', isDefault: true, sortOrder: 0 },
];

const ACTIVITIES: {
  category: ActivityCategory;
  name: string;
  scope: GhgScope;
  factor: number;
  inputUnit: string;
}[] = [
  { category: 'ELECTRICITY', name: '한국전력', scope: 'SCOPE_2', factor: 0.456, inputUnit: 'kWh' },
  { category: 'MATERIAL', name: '플라스틱 1', scope: 'SCOPE_3', factor: 2.3, inputUnit: 'kg' },
  { category: 'MATERIAL', name: '플라스틱 2', scope: 'SCOPE_3', factor: 3.2, inputUnit: 'kg' },
  { category: 'TRANSPORT', name: '트럭', scope: 'SCOPE_3', factor: 3.5, inputUnit: 'ton-km' },
];

async function main() {
  await prisma.company.upsert({
    where: { id: 'hana-loop' },
    update: {},
    create: {
      id: 'hana-loop',
      name: '하나루프(본사)',
      country: 'KR',
    },
  });

  console.log('Seed completed: Company');

  for (const data of ACTIVITY_UNITS) {
    await prisma.activityUnit.upsert({
      where: { category_unit: { category: data.category, unit: data.unit } },
      update: {},
      create: data,
    });
  }
  console.log('Seed completed: ActivityUnit');

  for (const data of ACTIVITIES) {
    const activity = await prisma.activity.upsert({
      where: { category_name: { category: data.category, name: data.name } },
      update: {},
      create: { category: data.category, name: data.name, scope: data.scope },
    });

    const existing = await prisma.emissionFactor.findFirst({
      where: { activityId: activity.id, isLatest: true },
    });

    if (!existing) {
      await prisma.emissionFactor.create({
        data: {
          activityId: activity.id,
          factor: data.factor,
          inputUnit: data.inputUnit,
          effectiveFrom: new Date('2024-01-01'),
          isLatest: true,
        },
      });
    }
  }
  console.log('Seed completed: Activity + EmissionFactor');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
