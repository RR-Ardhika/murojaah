import { Option } from '@/api/shared/entity';

export enum HistoryMethod {
  JahrWithMemory = 'jahr with memory',
  JahrWithReading = 'jahr with reading',
  SirrWithMemory = 'sirr with memory',
  SirrWithReading = 'sirr with reading',
}

export function HistoryMethodOptions(): Option[] {
  const options: Option[] = [];
  const historyMethods: HistoryMethod[] = Object.values(HistoryMethod);

  // eslint-disable-next-line @typescript-eslint/typedef
  historyMethods.forEach((v, i) => {
    const option: Option = { value: i, label: v };
    options.push(option);
  });

  return options;
}
