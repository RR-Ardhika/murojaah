import { Option } from '@/api/shared/entity';

export enum Approach {
  JahrWithMemory = 'jahr with memory',
  JahrWithReading = 'jahr with reading',
  SirrWithMemory = 'sirr with memory',
  SirrWithReading = 'sirr with reading',
}

export function ApproachOptions(): Option[] {
  const options: Option[] = [];
  const approachs: Approach[] = Object.values(Approach);

  // eslint-disable-next-line @typescript-eslint/typedef
  approachs.forEach((v, i) => {
    const option: Option = { value: i, label: v };
    options.push(option);
  });

  return options;
}
