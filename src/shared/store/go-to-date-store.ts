import { StateCreator, StoreApi, UseBoundStore, create } from 'zustand';

interface GoToDateState {
  currentDate: string | null;
  isProgrammaticScroll: boolean;

  setCurrentDate: (date: string | null) => void;
  clearCurrentDate: () => void;
  setIsProgrammaticScroll: (value: boolean) => void;
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
  isProgrammaticScroll: false,

  setCurrentDate: (date: string | null): void => set({ currentDate: date }),
  clearCurrentDate: (): void => set({ currentDate: null }),
  setIsProgrammaticScroll: (value: boolean): void =>
    set({ isProgrammaticScroll: value }),
});

const goToDateStoreInstance: UseBoundStore<StoreApi<GoToDateState>> =
  create<GoToDateState>()(goToDateStore);

export const useGoToDateStore: () => GoToDateState = goToDateStoreInstance;
export const getGoToDateState: () => GoToDateState =
  goToDateStoreInstance.getState;
