'use client';

import { ActivityOption, ActivityUnitOption, CompanyOption } from '@/types';
import { useRef, useState } from 'react';
import * as XLSX from 'xlsx';

import { PendingItem } from '../AddListContext';
import { useActivities } from '../hooks/useActivities';
import { useActivityUnits } from '../hooks/useActivityUnits';
import { ParsedRow, parseRows } from './excelParser';

export type UploadStatusType = 'idle' | 'success' | 'partial' | 'error';

export interface UploadStatus {
  type: UploadStatusType;
  message: string;
}

function resolveRow(
  row: ParsedRow,
  company: CompanyOption,
  activities: ActivityOption[],
  allUnits: ActivityUnitOption[]
): Omit<PendingItem, '_id'> | null {
  const matchedActivity = activities.find(a => a.name === row.activity);
  if (!matchedActivity) return null;

  const matchedUnit = allUnits.find(u => u.unit === row.unit);
  if (!matchedUnit) return null;

  return {
    companyId: company.id,
    companyName: company.name,
    date: row.date,
    activityId: matchedActivity.id,
    activity: matchedActivity.name,
    quantity: row.quantity,
    activityUnitId: matchedUnit.id,
    unit: matchedUnit.unit,
    description: row.description,
  };
}

export function useExcelUpload(
  company: CompanyOption | null,
  onAdd: (item: Omit<PendingItem, '_id'>) => boolean
) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<UploadStatus>({ type: 'idle', message: '' });
  const [isDragging, setIsDragging] = useState(false);

  const { data: activities } = useActivities();
  // category 없이 호출 → 전체 단위 조회
  const { data: allUnits } = useActivityUnits(undefined);

  const processFile = async (file: File) => {
    if (!/\.(xlsx|xls)$/i.test(file.name)) {
      setStatus({ type: 'error', message: '.xlsx 또는 .xls 파일만 업로드할 수 있습니다.' });
      return;
    }
    if (!company) {
      setStatus({ type: 'error', message: '기업을 먼저 선택해주세요.' });
      return;
    }

    try {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: 'array', cellDates: true });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });

      if (rows.length === 0) {
        setStatus({ type: 'error', message: '파일에 데이터가 없습니다.' });
        return;
      }

      const { succeeded: parsedRows, failedRows } = parseRows(rows);

      let added = 0;
      let skipped = 0;
      const unresolved: number[] = [];

      parsedRows.forEach((row, i) => {
        const resolved = resolveRow(row, company, activities ?? [], allUnits ?? []);
        if (!resolved) {
          // 엑셀 행 번호: parseRows가 이미 필터한 인덱스 기준이 아니므로 근사값
          unresolved.push(i + 2);
          return;
        }
        if (onAdd(resolved)) added++;
        else skipped++;
      });

      setStatus(buildStatus(added, skipped, [...failedRows, ...unresolved]));
    } catch {
      setStatus({ type: 'error', message: '파일을 읽는 중 오류가 발생했습니다.' });
    }

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return {
    fileInputRef,
    status,
    isDragging,
    openFilePicker: () => fileInputRef.current?.click(),
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
    },
    handleDrop: (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) processFile(file);
    },
    handleDragOver: (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(true);
    },
    handleDragLeave: () => setIsDragging(false),
  };
}

function buildStatus(added: number, skipped: number, failedRows: number[]): UploadStatus {
  const failed = failedRows.length;

  if (added > 0 && skipped === 0 && failed === 0) {
    return { type: 'success', message: `${added}건이 추가되었습니다.` };
  }
  if (added === 0 && skipped > 0 && failed === 0) {
    return { type: 'error', message: '모든 데이터가 이미 추가되어 있습니다.' };
  }

  const parts: string[] = [];
  if (added > 0) parts.push(`${added}건 추가`);
  if (skipped > 0) parts.push(`${skipped}건 중복 건너뜀`);
  if (failed > 0) parts.push(`${failed}건 실패 (행: ${failedRows.join(', ')})`);

  return {
    type: added === 0 ? 'error' : 'partial',
    message: parts.join(', '),
  };
}
