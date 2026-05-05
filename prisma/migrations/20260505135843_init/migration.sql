-- CreateEnum
CREATE TYPE "ActivityCategory" AS ENUM ('ELECTRICITY', 'MATERIAL', 'TRANSPORT');

-- CreateEnum
CREATE TYPE "GhgScope" AS ENUM ('SCOPE_1', 'SCOPE_2', 'SCOPE_3');

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityUnit" (
    "id" TEXT NOT NULL,
    "category" "ActivityCategory" NOT NULL,
    "unit" TEXT NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ActivityUnit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "category" "ActivityCategory" NOT NULL,
    "name" TEXT NOT NULL,
    "scope" "GhgScope" NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmissionFactor" (
    "id" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,
    "factor" DOUBLE PRECISION NOT NULL,
    "inputUnit" TEXT NOT NULL,
    "outputUnit" TEXT NOT NULL DEFAULT 'kgCO2e',
    "version" INTEGER NOT NULL DEFAULT 1,
    "effectiveFrom" TIMESTAMP(3) NOT NULL,
    "effectiveTo" TIMESTAMP(3),
    "isLatest" BOOLEAN NOT NULL DEFAULT true,
    "changeNote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmissionFactor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityData" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "activityId" TEXT NOT NULL,
    "category" "ActivityCategory" NOT NULL,
    "scope" "GhgScope" NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "activityUnitId" TEXT NOT NULL,
    "emissionKgCo2e" DOUBLE PRECISION,
    "companyId" TEXT NOT NULL,
    "emissionFactorId" TEXT,
    "uploadBatchId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActivityData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UploadBatch" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "rowCount" INTEGER,
    "errorLog" TEXT,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UploadBatch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ActivityUnit_category_idx" ON "ActivityUnit"("category");

-- CreateIndex
CREATE UNIQUE INDEX "ActivityUnit_category_unit_key" ON "ActivityUnit"("category", "unit");

-- CreateIndex
CREATE INDEX "Activity_category_idx" ON "Activity"("category");

-- CreateIndex
CREATE UNIQUE INDEX "Activity_category_name_key" ON "Activity"("category", "name");

-- CreateIndex
CREATE INDEX "EmissionFactor_activityId_isLatest_idx" ON "EmissionFactor"("activityId", "isLatest");

-- CreateIndex
CREATE INDEX "EmissionFactor_activityId_effectiveFrom_idx" ON "EmissionFactor"("activityId", "effectiveFrom");

-- CreateIndex
CREATE INDEX "ActivityData_companyId_date_idx" ON "ActivityData"("companyId", "date");

-- CreateIndex
CREATE INDEX "ActivityData_companyId_category_idx" ON "ActivityData"("companyId", "category");

-- CreateIndex
CREATE INDEX "ActivityData_companyId_scope_idx" ON "ActivityData"("companyId", "scope");

-- AddForeignKey
ALTER TABLE "EmissionFactor" ADD CONSTRAINT "EmissionFactor_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityData" ADD CONSTRAINT "ActivityData_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityData" ADD CONSTRAINT "ActivityData_activityUnitId_fkey" FOREIGN KEY ("activityUnitId") REFERENCES "ActivityUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityData" ADD CONSTRAINT "ActivityData_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityData" ADD CONSTRAINT "ActivityData_emissionFactorId_fkey" FOREIGN KEY ("emissionFactorId") REFERENCES "EmissionFactor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityData" ADD CONSTRAINT "ActivityData_uploadBatchId_fkey" FOREIGN KEY ("uploadBatchId") REFERENCES "UploadBatch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UploadBatch" ADD CONSTRAINT "UploadBatch_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
