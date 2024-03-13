import { StatType } from '@/api/module/stat/entity';
import { FindStatType } from '@/api/module/stat/repository/indexeddb';

export function GetStatType(id: number): StatType {
  return FindStatType(id);
}
