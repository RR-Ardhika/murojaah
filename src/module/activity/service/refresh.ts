import { useDataStore, useCompactDateDataStore, useListSurahDataStore } from '@/module/activity/store';
import { useDataStore as useStatDataStore } from '@/module/stat/store';

export const refreshAllDataStores = async (): Promise<void> => {
  await Promise.all([
    useDataStore.getState().fetchData(),
    useCompactDateDataStore.getState().fetchData(),
    useListSurahDataStore.getState().fetchData(),
    useStatDataStore.getState().fetchData(),
  ]);
};
