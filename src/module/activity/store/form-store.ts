import { create } from 'zustand';

import { Option } from '@/shared/entity';

interface FormState {
  isFormVisible: boolean;
  formType: string;
  parentSurah: Option[];

  setIsFormVisible: (value: boolean) => void;
  setFormType: (value: string) => void;
  setParentSurah: (value: Option[]) => void;

  showForm: (ft: string) => void;
  hideForm: () => void;
}

// eslint-disable-next-line @typescript-eslint/typedef
export const useFormStore = create<FormState>()((set) => ({
  isFormVisible: false,
  formType: '',
  parentSurah: [],

  setIsFormVisible: (value: boolean): void => set({ isFormVisible: value }),
  setFormType: (value: string): void => set({ formType: value }),
  setParentSurah: (value: Option[]): void => set({ parentSurah: value }),

  showForm: (ft: string): void => set({ isFormVisible: true, formType: ft }),
  hideForm: (): void => set({ isFormVisible: false }),
}));
