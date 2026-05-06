'use client';

import { ActivityOption, ActivityUnitOption, CompanyOption } from '@/types';
import { useState } from 'react';

import { useActivities } from './useActivities';
import { useActivityUnits } from './useActivityUnits';
import { useCompanies } from '../../hooks/useCompanies';

export function useFormSelections() {
  const [selectedCompany, setSelectedCompany] = useState<CompanyOption | null>(null);
  const [date, setDate] = useState<Date | undefined>();
  const [selectedActivity, setSelectedActivity] = useState<ActivityOption | null>(null);
  const [unitOverride, setUnitOverride] = useState<{
    activityId: string;
    unit: ActivityUnitOption;
  } | null>(null);

  const { data: companies } = useCompanies();
  const { data: activities } = useActivities();
  const { data: units } = useActivityUnits(selectedActivity?.category);

  const effectiveCompany = selectedCompany ?? companies?.[0] ?? null;

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
