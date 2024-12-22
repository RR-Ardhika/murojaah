import { create } from 'zustand';

import * as service from '../service';

export const useDataStore = create((set) => ({
  data: [],
  fetchData: async () => {
    set({ data: await service.index() });
  },
}));
