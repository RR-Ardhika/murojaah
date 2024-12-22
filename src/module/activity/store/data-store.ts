import { create } from 'zustand';

import * as entity from '../entity';
import * as service from '../service';

interface DataState {
  data: entity.ActivityGroup[];
  fetchData: () => Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/typedef
export const useDataStore = create<DataState>()((set) => ({
  data: [],
  fetchData: async (): Promise<void> => {
    set({ data: await service.index() });
  },
}));
