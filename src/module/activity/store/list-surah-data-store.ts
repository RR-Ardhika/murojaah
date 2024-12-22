import { create } from 'zustand';

import * as entity from '../entity';
import * as service from '../service';

interface ListSurahDataState {
  data: entity.ListSurah[];
  fetchData: () => Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/typedef
export const useListSurahDataStore = create<ListSurahDataState>()((set) => ({
  data: [],
  fetchData: async (): Promise<void> => {
    set({ data: await service.getListSurah() });
  },
}));
