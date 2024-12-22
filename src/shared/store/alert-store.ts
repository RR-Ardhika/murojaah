import { create } from 'zustand';

interface AlertState {
  isAlertVisible: boolean;
  alertColor: number;
  alertText: string;

  setIsAlertVisible: (value: boolean) => void;
  setAlertColor: (value: number) => void;
  setAlertText: (value: string) => void;

  showAlert: (color: number, text: string) => void;
  hideAlert: () => void;
}

// eslint-disable-next-line @typescript-eslint/typedef
export const useAlertStore = create<AlertState>()((set) => ({
  isAlertVisible: false,
  alertColor: 0,
  alertText: '',

  setIsAlertVisible: (value: boolean): void => set({ isAlertVisible: value }),
  setAlertColor: (value: number): void => set({ alertColor: value }),
  setAlertText: (value: string): void => set({ alertText: value }),

  showAlert: (color: number, text: string): void =>
    set(() => {
      // eslint-disable-next-line @typescript-eslint/typedef
      const newState = {
        isAlertVisible: true,
        alertColor: color,
        alertText: text,
      };

      setTimeout(() => {
        set({ isAlertVisible: false });
      }, 3000);

      return newState;
    }),
  hideAlert: (): void => set({ isAlertVisible: false }),
}));
