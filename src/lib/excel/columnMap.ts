export const COLUMN_MAP = {
  date:     "일자(원본)",
  category: "활동 유형",
  name:     "설명",
  quantity: "량",
  unit:     "단위",
} as const;

export type ColumnMapKey = keyof typeof COLUMN_MAP;
