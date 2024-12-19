import * as approachEntity from '@/module/approach/entity';

import * as service from '.';
import * as entity from '../entity';

export const juzOptions = (): entity.Option[] => {
  const options: entity.Option[] = [];

  // eslint-disable-next-line @typescript-eslint/typedef
  for (let i = 0; i < entity.juz.length; i++) {
    const option: entity.Option = { value: entity.juz[i].id, label: entity.juz[i].id };
    options.push(option);
  }

  return options;
};

export const surahOptions = (): entity.Option[] => {
  const options: entity.Option[] = [];

  // eslint-disable-next-line @typescript-eslint/typedef
  for (let i = 0; i < entity.surah.length; i++) {
    const option: entity.Option = { value: i + 1, label: entity.surah[i].name };
    options.push(option);
  }

  return options;
};

export const getOptionsFromSurahId = (id: number): entity.Option[] => {
  const options: entity.Option[] = [];
  const surah: entity.SurahType | undefined = service.getSurahById(id);
  // @ts-expect-error expected undefined
  const option: entity.Option = { value: id, label: surah.name };
  options.push(option);
  return options;
};

export const approachOptions = (): entity.Option[] => {
  const options: entity.Option[] = [];
  const approachs: approachEntity.Approach[] = Object.values(approachEntity.Approach);

  // eslint-disable-next-line @typescript-eslint/typedef
  approachs.forEach((v, i) => {
    const option: entity.Option = { value: i, label: v };
    options.push(option);
  });

  return options;
};
