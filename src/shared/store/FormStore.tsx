import { create } from 'zustand';

export const useFormStore = create((set) => ({
  isFormVisible: false,
  formType: undefined,
  setIsFormVisible: (visible) => set(() => ({ isFormVisible: visible })),
  showForm: (ft) => set(() => ({ isFormVisible: true, formType: ft })),
  hideForm: () => set(() => ({ isFormVisible: false })),
  setFormType: (ft) => set(() => ({ formType: ft })),
}));
