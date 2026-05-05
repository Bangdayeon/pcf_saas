export type ActivityCategory = "ELECTRICITY" | "MATERIAL" | "TRANSPORT";
export type GhgScope = "SCOPE_1" | "SCOPE_2" | "SCOPE_3";
export type UploadStatus = "pending" | "processing" | "completed" | "failed";

export const ACTIVITY_CATEGORY_LABEL: Record<ActivityCategory, string> = {
  ELECTRICITY: "전기",
  MATERIAL:    "원소재",
  TRANSPORT:   "운송",
};

export const GHG_SCOPE_LABEL: Record<GhgScope, string> = {
  SCOPE_1: "Scope 1",
  SCOPE_2: "Scope 2",
  SCOPE_3: "Scope 3",
};
