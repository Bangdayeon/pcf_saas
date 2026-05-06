'use client';

import { Button } from '@/components/ui/button';

import { AddListProvider } from './AddListContext';
import ExcelSection from './excel';
import AddDataSection from './form';
import AddedListSection from './list';

export default function AddPage() {
  return (
    <AddListProvider>
      <div className="text-gray900 flex flex-col">
        <h1 className="text-2xl font-bold">데이터 추가하기</h1>

        <ExcelSection />
        <AddDataSection />
        <AddedListSection />

        <Button size="lg" className="mt-6">
          업로드
        </Button>
      </div>
    </AddListProvider>
  );
}
