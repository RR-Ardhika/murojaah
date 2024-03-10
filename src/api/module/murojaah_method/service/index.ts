import { HistoryMethod } from '@/api/module/murojaah_method/entity';
import { FindHistoryMethodById } from '@/api/module/murojaah_method/repository/indexeddb';

export function Show(id: number): HistoryMethod {
  return FindHistoryMethodById(id);
}
