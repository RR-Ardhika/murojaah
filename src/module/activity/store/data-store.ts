import { create } from 'zustand';

import * as entity from '../entity';
import * as service from '../service';

interface DataState {
  data: entity.ActivityGroup[];
  fetchData: () => Promise<void>;
}

interface CompactDateDataState {
  data: entity.CompactDate[];
  fetchData: () => Promise<void>;
}

interface ListSurahDataState {
  data: entity.ListSurah[];
  fetchData: () => Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/typedef
export const useDataStore = create<DataState>()((set) => ({
  data: [],
  fetchData: async (): Promise<void> => {
    set({ data: await service.index() });
  },
}));

// eslint-disable-next-line @typescript-eslint/typedef
export const useCompactDateDataStore = create<CompactDateDataState>()((set) => ({
  data: [],
  fetchData: async (): Promise<void> => {
    set({ data: await service.getCompactDate() });
  },
}));

// eslint-disable-next-line @typescript-eslint/typedef
export const useListSurahDataStore = create<ListSurahDataState>()((set) => ({
  data: [],
  fetchData: async (): Promise<void> => {
    set({ data: await service.getListSurah() });
  },
}));
