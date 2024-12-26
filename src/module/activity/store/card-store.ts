import { create } from 'zustand';

interface CardState {
  expandedCardId: string | null;
  setExpandedCardId: (value: string | null) => void;
}

// eslint-disable-next-line @typescript-eslint/typedef
export const useCardStore = create<CardState>()((set) => ({
  expandedCardId: null,
  setExpandedCardId: (value: string | null): void => set({ expandedCardId: value }),
}));
