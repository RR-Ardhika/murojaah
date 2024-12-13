import { Option } from '@/api/shared/entity';

export enum Approach {
  JahrMemory = 'jahr with memory',
  JahrReading = 'jahr with reading',
  SirrMemory = 'sirr with memory',
  SirrReading = 'sirr with reading',
  Memorizing = 'memorizing in progress',
}

export const approachOptions = (): Option[] => {
  const options: Option[] = [];
  const approachs: Approach[] = Object.values(Approach);

  // eslint-disable-next-line @typescript-eslint/typedef
  approachs.forEach((v, i) => {
    const option: Option = { value: i, label: v };
    options.push(option);
  });

  return options;
};
