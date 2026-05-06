'use client';

import { ActivityOption, ActivityUnitOption, CompanyOption } from '@/types';
import { useState } from 'react';

import { useActivities } from './useActivities';
import { useActivityUnits } from './useActivityUnits';
import { useCompanies } from './useCompanies';

export function useFormSelections() {
  const [selectedCompany, setSelectedCompany] = useState<CompanyOption | null>(null);
  const [date, setDate] = useState<Date | undefined>();
  const [selectedActivity, setSelectedActivity] = useState<ActivityOption | null>(null);
  // 유저가 명시적으로 고른 단위를 활동 ID와 함께 저장 — 활동 바뀌면 자동 무효화
  const [unitOverride, setUnitOverride] = useState<{ activityId: string; unit: ActivityUnitOption } | null>(null);

  const { data: companies } = useCompanies();
  const { data: activities } = useActivities();
  const { data: units } = useActivityUnits(selectedActivity?.category);

  // 유저가 직접 선택하지 않았으면 첫 번째 기업을 기본값으로 사용
  const effectiveCompany = selectedCompany ?? companies?.[0] ?? null;

  // 현재 활동에 대한 override가 있으면 사용, 없으면 isDefault 단위로 fallback
  const effectiveUnit =
    unitOverride !== null && unitOverride.activityId === selectedActivity?.id
      ? unitOverride.unit
      : (units?.find(u => u.isDefault) ?? units?.[0] ?? null);

  const setSelectedUnit = (unit: ActivityUnitOption | null) => {
    if (unit && selectedActivity) {
      setUnitOverride({ activityId: selectedActivity.id, unit });
    } else {
      setUnitOverride(null);
    }
  };

  const resetSelections = () => {
    setDate(undefined);
    setSelectedCompany(null);
    setSelectedActivity(null);
    setUnitOverride(null);
  };

  return {
    data: { companies, activities, units },
    selections: {
      selectedCompany: effectiveCompany,
      setSelectedCompany,
      date,
      setDate,
      selectedActivity,
      setSelectedActivity,
      selectedUnit: effectiveUnit,
      setSelectedUnit,
    },
    actions: { resetSelections },
  };
}
