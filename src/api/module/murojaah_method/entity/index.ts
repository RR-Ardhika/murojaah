import { Option } from '@/api/shared/entity';

export enum MurojaahMethod {
  JahrWithMemory = 'jahr with memory',
  JahrWithReading = 'jahr with reading',
  SirrWithMemory = 'sirr with memory',
  SirrWithReading = 'sirr with reading',
}

export function MurojaahMethodOptions(): Option[] {
  const options: Option[] = [];
  const murojaahMethods: MurojaahMethod[] = Object.values(MurojaahMethod);

  // eslint-disable-next-line @typescript-eslint/typedef
  murojaahMethods.forEach((v, i) => {
    const option: Option = { value: i, label: v };
    options.push(option);
  });

  return options;
}
