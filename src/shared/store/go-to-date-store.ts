import { StateCreator, StoreApi, UseBoundStore, create } from 'zustand';

interface GoToDateState {
  currentDate: string | null;

  setCurrentDate: (date: string | null) => void;
  clearCurrentDate: () => void;
}

const goToDateStore: StateCreator<GoToDateState> = (
  set: (
    partial:
      | GoToDateState
      | Partial<GoToDateState>
      | ((state: GoToDateState) => GoToDateState | Partial<GoToDateState>)
  ) => void
) => ({
  currentDate: null,

  setCurrentDate: (date: string | null): void => set({ currentDate: date }),
  clearCurrentDate: (): void => set({ currentDate: null }),
});

const goToDateStoreInstance: UseBoundStore<StoreApi<GoToDateState>> =
  create<GoToDateState>()(goToDateStore);

export const useGoToDateStore: () => GoToDateState = goToDateStoreInstance;
