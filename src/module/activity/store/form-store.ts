import { create } from 'zustand';

import { Option } from '@/shared/entity';

import { Activity, ActivityType } from '../entity';

interface FormState {
  isFormVisible: boolean;
  formType: number;
  parentSurah: Option[];
  activity: Activity | undefined;

  setIsFormVisible: (value: boolean) => void;
  setFormType: (value: number) => void;
  setParentSurah: (value: Option[]) => void;
  setActivity: (value: Activity | undefined) => void;

  showForm: (ft: number) => void;
  hideForm: () => void;
}

// eslint-disable-next-line @typescript-eslint/typedef
export const useFormStore = create<FormState>()((set) => ({
  isFormVisible: false,
  formType: ActivityType.Uninitialized,
  parentSurah: [],
  activity: undefined,

  setIsFormVisible: (value: boolean): void => set({ isFormVisible: value }),
  setFormType: (value: number): void => set({ formType: value }),
  setParentSurah: (value: Option[]): void => set({ parentSurah: value }),
  setActivity: (value: Activity | undefined): void => set({ activity: value }),

  showForm: (ft: number): void => set({ isFormVisible: true, formType: ft }),
  hideForm: (): void => set({ isFormVisible: false }),
}));
