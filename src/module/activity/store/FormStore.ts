import { create } from 'zustand';

import { Option } from '@/shared/entity';

export const useFormStore = create((set) => ({
  isFormVisible: false,
  formType: undefined,
  parentSurah: undefined,

  setIsFormVisible: (visible) => set(() => ({ isFormVisible: visible })),
  setFormType: (ft) => set(() => ({ formType: ft })),
  setParentSurah: (surah: Option): void => set(() => ({ parentSurah: surah })),

  showForm: (ft) => set(() => ({ isFormVisible: true, formType: ft })),
  hideForm: () => set(() => ({ isFormVisible: false })),
}));
