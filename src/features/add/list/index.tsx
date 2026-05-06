import SVGIcon from '@/components/ui/SVGIcon';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';

import { useAddListContext } from '../AddListContext';
import { titleStyle } from '../styles.style';
import Pagination from './Pagination';

export default function AddedListSection() {
  const { items, removeItems } = useAddListContext();
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  const pageItems = [...items].reverse().slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pageIds = pageItems.map(item => item._id);
  const allPageChecked = pageIds.length > 0 && pageIds.every(id => checkedIds.has(id));

  const toggleCheck = (id: string, checked: boolean) => {
    setCheckedIds(prev => {
      const next = new Set(prev);
      checked ? next.add(id) : next.delete(id);
      return next;
    });
  };

  const togglePageAll = (checked: boolean) => {
    setCheckedIds(prev => {
      const next = new Set(prev);
      checked ? pageIds.forEach(id => next.add(id)) : pageIds.forEach(id => next.delete(id));
      return next;
    });
  };

  const handleDelete = () => {
    removeItems([...checkedIds]);
    setCheckedIds(new Set());
    setPage(p => {
      const nextTotal = items.length - checkedIds.size;
      const maxPage = Math.max(1, Math.ceil(nextTotal / PAGE_SIZE));
      return Math.min(p, maxPage);
    });
  };

  return (
    <section>
      <div className={titleStyle}>
        <SVGIcon icon="IC_Diamond" />
        <p>추가된 데이터 ({items.length})</p>
        <Button variant="destructive" disabled={checkedIds.size === 0} onClick={handleDelete}>
          삭제하기
        </Button>
      </div>
      <div className="mx-2 flex items-center">
        <Checkbox
          className="mr-3"
          checked={allPageChecked}
          onCheckedChange={checked => togglePageAll(checked as boolean)}
        />
        <p className="flex-1">기업명</p>
        <p className="flex-1">날짜</p>
        <p className="flex-1">활동 유형</p>
        <p className="flex-1">배출량</p>
        <p className="flex-2">설명</p>
      </div>
      <Separator />
      {pageItems.map(item => (
        <div className="mx-2 my-1 flex items-center" key={item._id}>
          <Checkbox
            className="mr-2"
            checked={checkedIds.has(item._id)}
            onCheckedChange={checked => toggleCheck(item._id, checked as boolean)}
          />
          <p className="flex-1 px-1">{item.companyName}</p>
          <p className="flex-1 px-1">{item.date}</p>
          <p className="flex-1 truncate overflow-x-hidden px-1">{item.activity}</p>
          <p className="flex-1 px-1">
            {item.quantity} {item.unit}
          </p>
          <p className="flex-2 truncate overflow-x-hidden px-1">{item.description ?? '-'}</p>
        </div>
      ))}
      <Pagination page={page} total={items.length} pageSize={PAGE_SIZE} onPageChange={setPage} />
    </section>
  );
}
