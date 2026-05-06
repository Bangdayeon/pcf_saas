'use client';

import { Button } from '@/components/ui/button';

import { AddListProvider, useAddListContext } from './AddListContext';
import ExcelSection from './excel';
import AddDataSection from './form';
import { useUpload } from './hooks/useUpload';
import AddedListSection from './list';

function AddPageContent() {
  const { items } = useAddListContext();
  const { upload, uploading, result } = useUpload();

  return (
    <div className="text-gray900 flex flex-col">
      <h1 className="text-2xl font-bold">데이터 추가하기</h1>

      <ExcelSection />
      <AddDataSection />
      <AddedListSection />

      <Button
        size="lg"
        className="mt-6"
        disabled={items.length === 0 || uploading}
        onClick={upload}
      >
        {uploading ? '업로드 중...' : '업로드'}
      </Button>

      {result && (
        <p className={`mt-2 text-sm ${result.failed > 0 ? 'text-red-500' : 'text-green-600'}`}>
          {result.succeeded}건 업로드 완료
          {result.failed > 0 && `, ${result.failed}건 실패`}
        </p>
      )}
    </div>
  );
}

export default function AddPage() {
  return (
    <AddListProvider>
      <AddPageContent />
    </AddListProvider>
  );
}
