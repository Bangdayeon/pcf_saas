import { Checkbox } from '@/components/ui/checkbox';

export default function AddedItem() {
  return (
    <div className="mx-2 flex items-center">
      <Checkbox className="mr-2" />
      <p className="flex-1 px-1">하나루프(본사)</p>
      <p className="flex-1 px-1">2026.04.30</p>
      <p className="flex-1 truncate overflow-x-hidden px-1">원소재(플라스틱1)dd</p>
      <p className="flex-1 px-1">299kg</p>
      <p className="flex-2 truncate overflow-x-hidden px-1">
        아이템 만드는 데에 사용했습니다ㅇㅇㅇㅇ
      </p>
    </div>
  );
}
