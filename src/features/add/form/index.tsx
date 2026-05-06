import SVGIcon from '@/components/ui/SVGIcon';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { useRef } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { useAddListContext } from '../AddListContext';
import { titleStyle } from '../styles.style';
import { useFormSelections } from './hooks/useFormSelections';

const subTitleStyle = 'font-semibold mb-1';

interface FormValues {
  quantity: number;
  description?: string;
}

export default function AddDataSection() {
  const { addItem } = useAddListContext();
  const { register, handleSubmit, reset, control } = useForm<FormValues>();
  const quantity = useWatch({ control, name: 'quantity' });

  const { data, selections, actions } = useFormSelections();
  const { companies, activities, units } = data;
  const {
    selectedCompany,
    setSelectedCompany,
    date,
    setDate,
    selectedActivity,
    setSelectedActivity,
    selectedUnit,
    setSelectedUnit,
  } = selections;
  const { resetSelections } = actions;

  const calendarCloseRef = useRef<HTMLButtonElement>(null);

  const onSubmit = (formData: FormValues) => {
    if (!selectedCompany || !date || !selectedActivity || !formData.quantity || !selectedUnit)
      return;

    addItem({
      companyId: selectedCompany.id,
      companyName: selectedCompany.name,
      date: format(date, 'yyyy-MM-dd'),
      activityId: selectedActivity.id,
      activity: selectedActivity.name,
      quantity: Number(formData.quantity),
      activityUnitId: selectedUnit.id,
      unit: selectedUnit.unit,
      description: formData.description || undefined,
    });

    reset();
    resetSelections();
  };

  return (
    <section>
      <div className={titleStyle}>
        <SVGIcon icon="IC_Edit" />
        <p>데이터 직접 입력</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="ml-2 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <p className={subTitleStyle}>기업</p>
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" />}>
              <p>{selectedCompany?.name ?? '선택하기'}</p>
              <SVGIcon icon={'IC_Arrow_Drop_Down'} />
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
        <div className="flex items-center gap-3">
          <p className={subTitleStyle}>날짜</p>
          <Popover>
            <PopoverTrigger render={<Button variant="outline" />}>
              {date ? format(date, 'yyyy-MM-dd') : '날짜 선택'}
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={d => {
                  setDate(d);
                  calendarCloseRef.current?.click();
                }}
                disabled={{ after: new Date() }}
              />
              <PopoverClose ref={calendarCloseRef} className="hidden" />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex items-center gap-3">
          <p className={subTitleStyle}>활동 유형</p>
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" />}>
              <p>{selectedActivity?.name ?? '선택하기'}</p>
              <SVGIcon icon={'IC_Arrow_Drop_Down'} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {activities?.map(a => (
                <DropdownMenuItem
                  key={a.id}
                  onClick={() =>
                    setSelectedActivity({ id: a.id, name: a.name, category: a.category })
                  }
                >
                  {a.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <p className={subTitleStyle}>배출량</p>
          <Input
            type="number"
            placeholder="배출량을 입력해주세요."
            onKeyDown={e => ['-', '+', 'e', 'E'].includes(e.key) && e.preventDefault()}
            {...register('quantity', { required: true, min: 0.001 })}
          />
        </div>
        <div className="flex items-center gap-3">
          <p className={subTitleStyle}>단위</p>
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" />}>
              <p>{selectedUnit?.unit ?? '선택하기'}</p>
              <SVGIcon icon={'IC_Arrow_Drop_Down'} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {units?.map(u => (
                <DropdownMenuItem key={u.id} onClick={() => setSelectedUnit(u)}>
                  {u.unit}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <p className={subTitleStyle}>설명</p>
          <Input placeholder="설명을 입력해주세요." {...register('description')} />
        </div>
        <Button
          type="submit"
          size="lg"
          className="mt-2 w-full"
          disabled={
            !selectedCompany ||
            !date ||
            !selectedActivity ||
            !selectedUnit ||
            !quantity ||
            Number(quantity) <= 0
          }
        >
          데이터 추가
        </Button>
      </form>
    </section>
  );
}
