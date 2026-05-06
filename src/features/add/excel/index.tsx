'use client';

import SVGIcon from '@/components/ui/SVGIcon';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';

import { useAddListContext } from '../AddListContext';
import { useCompanies } from '../hooks/useCompanies';
import { titleStyle } from '../styles.style';
import { UploadStatusType, useExcelUpload } from './useExcelUpload';

const STATUS_COLOR: Record<UploadStatusType, string> = {
  idle: '',
  success: 'text-green-600',
  partial: 'text-yellow-600',
  error: 'text-red-500',
};

export default function ExcelSection() {
  const { addItem } = useAddListContext();
  const { data: companies } = useCompanies();
  const [selectedCompany, setSelectedCompany] = useState<{ id: string; name: string } | null>(null);
  const effectiveCompany = selectedCompany ?? companies?.[0] ?? null;

  const {
    fileInputRef,
    status,
    isDragging,
    openFilePicker,
    handleFileChange,
    handleDrop,
    handleDragOver,
    handleDragLeave,
  } = useExcelUpload(effectiveCompany, addItem);

  return (
    <section>
      <div className={titleStyle}>
        <SVGIcon icon="IC_Add_File" />
        <p>Excel 파일 업로드</p>
      </div>

      <div className="ml-2 mb-3 flex items-center gap-3">
        <p className="font-semibold">기업</p>
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" />}>
            {effectiveCompany?.name ?? '선택하기'}
            <SVGIcon icon="IC_Arrow_Drop_Down" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {companies?.map(c => (
              <DropdownMenuItem key={c.id} onClick={() => setSelectedCompany(c)}>
                {c.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`ml-2 flex flex-col items-center gap-3 rounded-lg border-2 border-dashed p-8 transition-colors ${
          isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/30'
        }`}
      >
        <p className="text-muted-foreground text-sm">파일을 드래그하거나 선택해주세요</p>
        <Button variant="outline" onClick={openFilePicker} disabled={!effectiveCompany}>
          파일 선택하기
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls"
        className="hidden"
        onChange={handleFileChange}
      />

      {status.type !== 'idle' && (
        <p className={`mt-2 ml-2 text-sm ${STATUS_COLOR[status.type]}`}>{status.message}</p>
      )}

      <p className="text-muted-foreground mt-3 ml-2 text-xs">
        필수 열: 일자(원본), 활동 유형, 량, 단위 &nbsp;|&nbsp; 선택 열: 설명
      </p>
    </section>
  );
}
