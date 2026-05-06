import { PendingItem } from '../AddListContext';

const COL = {
  DATE: '일자(원본)',
  ACTIVITY: '활동 유형', // 공백 포함
  QUANTITY: '량',
  UNIT: '단위',
  DESCRIPTION: '설명', // 선택 열
} as const;

// 파싱 결과 타입
interface ParseResult {
  succeeded: Omit<PendingItem, '_id'>[];
  // 실패한 행 번호 목록
  failedRows: number[];
}

// 날짜 정규화
export function normalizeDate(value: unknown): string {
  if (value instanceof Date) {
    // Date 객체 → 'yyyy-MM-dd' 문자열
    const y = value.getFullYear();
    const m = String(value.getMonth() + 1).padStart(2, '0');
    const d = String(value.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
  return String(value ?? '').trim();
}

// 시트 JSON → PendingItem 변환 + 유효성 검사
export function parseRows(rows: unknown[]): ParseResult {
  const succeeded: Omit<PendingItem, '_id'>[] = [];
  const failedRows: number[] = [];

  rows.forEach((row: any, index) => {
    const date = normalizeDate(row[COL.DATE]);
    const activity = String(row[COL.ACTIVITY] ?? '').trim();
    const quantity = Number(row[COL.QUANTITY]);
    const unit = String(row[COL.UNIT] ?? '').trim();
    const description = String(row[COL.DESCRIPTION] ?? '').trim() || undefined;

    const isInvalid = !date || !activity || !unit || !Number.isFinite(quantity) || quantity <= 0;

    if (isInvalid) {
      // 엑셀 행 번호 = index(0-based) + 1(헤더) + 1(0→1 보정) = index + 2
      failedRows.push(index + 2);
      return;
    }
    succeeded.push({ companyName: '', date, activity, quantity, unit, description });
  });

  return { succeeded, failedRows };
}
