'use client';

import SVGIcon from '@/components/ui/SVGIcon';
import { Button } from '@/components/ui/button';

import AddDataSection from './AddDataSection';
import AddedListSection from './AddedListSection';
import { useAddList } from './hooks/useAddList';
import { titleStyle } from './styles.style';

export default function AddPage() {
  const { addItem } = useAddList();
  return (
    <div className="text-gray900 flex flex-col">
      <h1 className="text-2xl font-bold">데이터 추가하기</h1>
      <section>
        <div className={titleStyle}>
          <SVGIcon icon="IC_Add_File" />
          <p>Excel 파일 업로드</p>
        </div>
        <Button variant="outline" className="ml-2">
          파일 선택하기
        </Button>
      </section>

      {/* 데이터 입력 */}
      <AddDataSection onAdd={addItem} />
      {/* 추가된 데이터 리스트 */}
      <AddedListSection />

      <Button size="lg" className="mt-6">
        업로드
      </Button>
    </div>
  );
}
