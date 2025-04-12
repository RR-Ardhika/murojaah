import { create } from 'zustand';

import { AlertColor, AlertConfig } from '../entity';

interface AlertState {
  isAlertVisible: boolean;
  alertColor: number;
  alertText: string;
  timerId: NodeJS.Timeout | null;

  setIsAlertVisible: (value: boolean) => void;
  setAlertColor: (value: number) => void;
  setAlertText: (value: string) => void;

  showAlert: (color: number, text: string) => void;
  hideAlert: () => void;
}

// eslint-disable-next-line @typescript-eslint/typedef
export const useAlertStore = create<AlertState>()((set, get) => ({
  isAlertVisible: false,
  alertColor: AlertColor.Uninitialized,
  alertText: '',
  timerId: null,

  setIsAlertVisible: (value: boolean): void => set({ isAlertVisible: value }),
  setAlertColor: (value: number): void => set({ alertColor: value }),
  setAlertText: (value: string): void => set({ alertText: value }),

  showAlert: (color: number, text: string): void =>
    set(() => {
      // Clear any existing timer to prevent multiple timers running
      const currentTimerId: NodeJS.Timeout | null = get().timerId;
      if (currentTimerId) {
        clearTimeout(currentTimerId);
      }

      // Create a new timer
      const newTimerId: NodeJS.Timeout = setTimeout(() => {
        set({ isAlertVisible: false });
      }, AlertConfig.Timeout);

      // eslint-disable-next-line @typescript-eslint/typedef
      const newState = {
        isAlertVisible: true,
        alertColor: color,
        alertText: text,
        timerId: newTimerId,
      };

      return newState;
    }),
  hideAlert: (): void => {
    const currentTimerId: NodeJS.Timeout | null = get().timerId;
    if (currentTimerId) clearTimeout(currentTimerId);
    set({ isAlertVisible: false, timerId: null });
  },
}));
