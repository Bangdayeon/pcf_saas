// 엑셀 열 이름 상수 — 실제 파일의 헤더(1행)와 정확히 일치해야 한다
const COL = {
  DATE: '일자(원본)',
  ACTIVITY: '활동 유형',
  QUANTITY: '량',
  UNIT: '단위',
  DESCRIPTION: '설명',
} as const;

// 파서가 반환하는 행 타입 — 이름만 포함, ID는 useExcelUpload에서 리졸브
export interface ParsedRow {
  date: string;
  activity: string;
  quantity: number;
  unit: string;
  description?: string;
}

interface ParseResult {
  succeeded: ParsedRow[];
  failedRows: number[];
}

export function normalizeDate(value: unknown): string {
  if (value instanceof Date) {
    const y = value.getFullYear();
    const m = String(value.getMonth() + 1).padStart(2, '0');
    const d = String(value.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
  return String(value ?? '').trim();
}

export function parseRows(rows: unknown[]): ParseResult {
  const succeeded: ParsedRow[] = [];
  const failedRows: number[] = [];

  rows.forEach((row: any, index) => {
    const date = normalizeDate(row[COL.DATE]);
    const activity = String(row[COL.ACTIVITY] ?? '').trim();
    const quantity = Number(row[COL.QUANTITY]);
    const unit = String(row[COL.UNIT] ?? '').trim();
    const description = String(row[COL.DESCRIPTION] ?? '').trim() || undefined;

    const isInvalid = !date || !activity || !unit || !Number.isFinite(quantity) || quantity <= 0;

    if (isInvalid) {
      failedRows.push(index + 2);
      return;
    }

    succeeded.push({ date, activity, quantity, unit, description });
  });

  return { succeeded, failedRows };
}
