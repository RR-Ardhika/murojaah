import { HistoryMethod } from '@/api/module/murojaah_method/entity';

export function FindHistoryMethodById(id: number): HistoryMethod {
  // @ts-expect-error access enum value with index
  return HistoryMethod[Object.keys(HistoryMethod)[id]];
}
