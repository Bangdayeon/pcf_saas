import type { ActivityCategory, GhgScope, UploadStatus } from './enums';

/* ================= 공통 ================= */

export type ApiResponse<T> = { data: T } | { error: string };

/* ================= ActivityData ================= */
// 리스트 화면
export interface ActivityDataItem {
  id: string;
  date: string;

  activityId: string;
  activity: string;

  category: ActivityCategory;
  scope: GhgScope;

  quantity: number;
  unit: string;

  emissionKgCo2e: number | null;
}

// 리스트 조회
export interface GetActivityDataResponse {
  items: ActivityDataItem[];
  total: number;
  page: number;
  pageSize: number;
}

// 데이터 추가
export interface CreateActivityDataBody {
  companyId: string;
  date: string;
  activityId: string;
  quantity: number;
  activityUnitId: string;
}

// Company dropdown
export interface CompanyOption {
  id: string;
  name: string;
}

// Activity dropdown
export interface ActivityOption {
  id: string;
  name: string;
  category: ActivityCategory;
}

// Unit dropdown
export interface ActivityUnitOption {
  id: string;
  unit: string;
  isDefault: boolean;
}

/* ================= Upload Excel ================= */
// 업로드 생성, 조회, UI로 상태 표시
export interface UploadBatch {
  id: string;
  filename: string;
  status: UploadStatus;
  rowCount: number | null;
  errorLog: string | null;
}

/* ================= Summary (전체 대시보드) ================= */

// 요약 데이터 조회 조건(회사, 특정 연도)
export interface GetSummaryQuery {
  companyId: string;
  startDate?: string;
  endDate?: string;
}

// 카테고리or스코프별 그룹의 총 배출량
export interface SummaryItem {
  key: string; // category or scope
  emissionKgCo2e: number;
}

// 대시보드 KPI 전체 응답구조
export interface GetSummaryResponse {
  totalEmissionKgCo2e: number;
  byCategory: SummaryItem[];
  byScope: SummaryItem[];
}
