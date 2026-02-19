import { create } from 'zustand';

interface ScrollState {
    scrollPositions: Record<string, number>;

    saveScrollPosition: (key: string, position: number) => void;
    getScrollPosition: (key: string) => number;
}

// eslint-disable-next-line @typescript-eslint/typedef
export const useScrollStore = create<ScrollState>()((set, get) => ({
    scrollPositions: {},

    saveScrollPosition: (key: string, position: number): void =>
        set((state: ScrollState) => ({
            scrollPositions: { ...state.scrollPositions, [key]: position },
        })),

    getScrollPosition: (key: string): number => {
        return get().scrollPositions[key] ?? 0;
    },
}));
