import * as entity from '@/api/module/stat/entity';

export * from '@/api/module/stat/repository/indexeddb/calculate';

export function findStatType(id: number): entity.StatType {
  // @ts-expect-error access enum value with index
  return entity.StatType[Object.keys(entity.StatType)[id]];
}
