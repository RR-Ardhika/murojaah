import { create } from 'zustand';

import * as entity from '../entity';
import * as service from '../service';

interface CompactDateDataState {
  data: entity.CompactDate[];
  fetchData: () => Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/typedef
export const useCompactDateDataStore = create<CompactDateDataState>()((set) => ({
  data: [],
  fetchData: async (): Promise<void> => {
    set({ data: await service.getCompactDate() });
  },
}));
