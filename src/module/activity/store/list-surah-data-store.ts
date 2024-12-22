import { create } from 'zustand';

import * as service from '../service';

export const useListSurahDataStore = create((set) => ({
  data: [],
  fetchData: async () => {
    set({ data: await service.getListSurah() });
  },
}));
