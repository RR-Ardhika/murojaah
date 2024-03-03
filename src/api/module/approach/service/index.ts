import { HistoryMethod } from '@/api/module/approach/entity';
import { FindHistoryMethodById } from '@/api/module/approach/repository/indexeddb';

export function Show(id: number): HistoryMethod {
  return FindHistoryMethodById(id);
}
