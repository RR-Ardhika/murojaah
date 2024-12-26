import { create } from 'zustand';

interface CardState {
  expandedCardId: string | null;
  setExpandedCardId: (id: string | null) => void;
}

// eslint-disable-next-line @typescript-eslint/typedef
export const useCardStore = create<CardState>()((set) => ({
  expandedCardId: null,
  setExpandedCardId: (id: string | null) => set({ expandedCardId: id }),
}));
