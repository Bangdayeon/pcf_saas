import type { ActivityCategory, GhgScope } from './enums';
import type { ActivityData, ActivityDataDetail, UploadBatch } from './models';

// ====== 공통 ==============================
export interface ApiSuccess<T> {
  data: T;
}

export interface ApiError {
  error: string;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

// ====== ActivityData ======

// GET /api/activity-data
export interface GetActivityDataQuery {
  companyId: string;
  category?: ActivityCategory;
  scope?: GhgScope;
  startDate?: string; // ISO 8601
  endDate?: string;
  page?: number;
  pageSize?: number;
}

export interface GetActivityDataResponse {
  items: ActivityDataDetail[];
  total: number;
  page: number;
  pageSize: number;
}

// POST /api/activity-data
export interface CreateActivityDataBody {
  companyId: string;
  date: string; // ISO 8601
  activityId: string;
  quantity: number;
  activityUnitId: string;
}

export type CreateActivityDataResponse = ActivityData;

// ====== Upload ======

// POST /api/upload  (multipart/form-data)
// FormData: { file: File, companyId: string }
export type UploadResponse = UploadBatch;

// GET /api/upload/:batchId
export type GetUploadBatchResponse = UploadBatch;

// ====== Summary (대시보드) ======

// GET /api/summary
export interface GetSummaryQuery {
  companyId: string;
  year?: number;
}

export interface SummaryByCategory {
  category: ActivityCategory;
  emissionKgCo2e: number;
}

export interface SummaryByScope {
  scope: GhgScope;
  emissionKgCo2e: number;
}

export interface GetSummaryResponse {
  totalEmissionKgCo2e: number;
  byCategory: SummaryByCategory[];
  byScope: SummaryByScope[];
}
