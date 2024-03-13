import { StatType } from '@/api/module/stat/entity';

export function FindStatType(id: number): StatType {
  // @ts-expect-error access enum value with index
  return StatType[Object.keys(StatType)[id]];
}
