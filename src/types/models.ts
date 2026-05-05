import type { ActivityCategory, GhgScope, UploadStatus } from './enums';

// 현재는 하나루프(본사) 하나만 존재
export interface Company {
  id: string;
  name: string;
  country: number | null;
  createdAt: string;
  updatedAt: string;
}

// 엑셀 - 설명(한국전력, 플라스틱 1, 플라스틱 2, 트럭)
// seed로 초기 데이터를 넣어둠
export interface Activity {
  id: string;
  category: ActivityCategory;
  name: string;
  scope: GhgScope;
}

// 각 설명 항목에 대한 단위(kWh, kg, ton-km, ..)
export interface ActivityUnit {
  id: string;
  category: ActivityCategory;
  unit: string;
  isDefault: boolean;
  sortOrder: number;
}

// 배출 계수 - 버전 이력을 저장함
export interface EmissionFactor {
  id: string;
  activityId: string;
  factor: number;
  inputUnit: string;
  outputUnit: string;
  version: number;
  effectiveFrom: string;
  effectiveTo: string | null;
  isLatest: boolean;
  changeNote: string | null;
  createdAt: string;
}

// 각 활동 데이터
export interface ActivityData {
  id: string;
  date: string;
  activityId: string;
  category: ActivityCategory;
  scope: GhgScope;
  quantity: number;
  activityUnitId: string;
  emissionKgCo2e: number | null;
  companyId: string;
  emissionFactorId: string | null;
  uploadBatchId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityDataDetail extends ActivityData {
  activity: Activity;
  activityUnit: ActivityUnit;
  emissionFactor: EmissionFactor | null;
}

// 엑셀 파일 업로드 시 저장되는 ActivityData 묶음
export interface UploadBatch {
  id: string;
  filename: string;
  status: UploadStatus;
  rowCount: number | null;
  errorLog: string | null;
  companyId: string;
  createdAt: string;
}
