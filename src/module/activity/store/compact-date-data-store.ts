import { create } from 'zustand';

import * as service from '../service';

export const useCompactDateDataStore = create((set) => ({
  data: [],
  fetchData: async () => {
    set({ data: await service.getCompactDate() });
  },
}));
