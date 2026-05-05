'use client';

import SVGIcon from '@/components/ui/SVGIcon';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import AddedItem from './AddedItem';

const titleStyle = 'text-lg font-bold mb-4 mt-8 flex gap-2 items-center';
const subTitleStyle = 'font-semibold mb-1';

export default function AddPage() {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [date, setDate] = useState<Date | undefined>();

  const onSubmit = (data: any) => {
    console.log(data);
  };

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
      <section>
        <div className={titleStyle}>
          <SVGIcon icon="IC_Edit" />
          <p>데이터 직접 입력</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="ml-2 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <p className={subTitleStyle}>기업</p>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="outline">
                  <p>선택하기</p>
                  <SVGIcon icon={'IC_Arrow_Drop_Down'} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>하나루프(본사)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center gap-3">
            <p className={subTitleStyle}>날짜</p>
            <Popover>
              <PopoverTrigger>
                <Button variant="outline">{date ? format(date, 'yyyy-MM-dd') : '날짜 선택'}</Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex items-center gap-3">
            <p className={subTitleStyle}>활동 유형</p>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="outline">
                  <p>선택하기</p>
                  <SVGIcon icon={'IC_Arrow_Drop_Down'} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>전기</DropdownMenuItem>
                <DropdownMenuItem>원소재(플라스틱1)</DropdownMenuItem>
                <DropdownMenuItem>원소재(플라스틱2)</DropdownMenuItem>
                <DropdownMenuItem>운송</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div>
            <p className={subTitleStyle}>배출량</p>
            <Input placeholder="배출량을 입력해주세요." />
          </div>
          <div className="flex items-center gap-3">
            <p className={subTitleStyle}>단위</p>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="outline">
                  <p>선택하기</p>
                  <SVGIcon icon={'IC_Arrow_Drop_Down'} />
                </Button>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </div>
          <div>
            <p className={subTitleStyle}>설명</p>
            <Input placeholder="설명을 입력해주세요." />
          </div>
        </form>
        <Button size="lg" className="mt-6 w-full">
          데이터 추가
        </Button>
      </section>
      <section>
        <div className={titleStyle}>
          <SVGIcon icon="IC_Diamond" />
          <p>추가된 데이터</p>
          <Button variant="destructive">삭제하기</Button>
        </div>
        <div className="mx-2 flex items-center">
          <Checkbox className="mr-2" />
          <p className="flex-1">기업명</p>
          <p className="flex-1">날짜</p>
          <p className="flex-1">활동 유형</p>
          <p className="flex-1">배출량</p>
          <p className="flex-2">설명</p>
        </div>
        <Separator />
        <AddedItem />
      </section>
      <Button size="lg" className="mt-6">
        업로드
      </Button>
    </div>
  );
}
