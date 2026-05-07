'use client';

import { poster } from '@/lib/fetcher';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { PendingItem, useAddListContext } from '../AddListContext';

async function uploadItems(items: PendingItem[]) {
  const results = await Promise.allSettled(
    items.map(item =>
      poster('/api/activities', {
        companyId: item.companyId,
        date: item.date,
        activityId: item.activityId,
        quantity: item.quantity,
        activityUnitId: item.activityUnitId,
      }).then(() => item._id)
    )
  );

  const succeededIds = results
    .filter((r): r is PromiseFulfilledResult<string> => r.status === 'fulfilled')
    .map(r => r.value);

  return { succeededIds, failed: results.length - succeededIds.length };
}

export function useUpload() {
  const { items, removeItems } = useAddListContext();
  const queryClient = useQueryClient();

  const { mutate, isPending, data } = useMutation({
    mutationFn: () => uploadItems(items),
    onSuccess: ({ succeededIds }) => {
      removeItems(succeededIds);
      queryClient.invalidateQueries({ queryKey: ['totalEmission'] });
      queryClient.invalidateQueries({ queryKey: ['monthlyEmission'] });
      queryClient.invalidateQueries({ queryKey: ['sourceRatio'] });
      queryClient.invalidateQueries({ queryKey: ['scopeRatio'] });
      queryClient.invalidateQueries({ queryKey: ['scopeMonthly'] });
      queryClient.invalidateQueries({ queryKey: ['years'] });
    },
  });

  return {
    upload: () => mutate(),
    uploading: isPending,
    result: data ? { succeeded: data.succeededIds.length, failed: data.failed } : null,
  };
}
