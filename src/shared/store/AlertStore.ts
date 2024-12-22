import { create } from 'zustand';

export const useAlertStore = create((set) => ({
  isAlertVisible: false,
  alertColor: undefined,
  alertText: undefined,

  setIsAlertVisible: (value) => set({ isAlertVisible: value }),
  setAlertColor: (value) => set({ alertColor: value }),
  setAlertText: (value) => set({ alertText: value }),

  showAlert: (ac, at) =>
    set(() => {
      const newState = {
        isAlertVisible: true,
        alertColor: ac,
        alertText: at,
      };

      setTimeout(() => {
        set({ isAlertVisible: false });
      }, 3000);

      return newState;
    }),
  hideAlert: () => set({ isAlertVisible: false }),
}));
