import * as entity from '@/api/module/stat/entity';
import * as entityHistory from '@/api/module/history/entity';
import * as repo from '@/api/module/stat/repository/indexeddb';
import * as repoHistory from '@/api/module/history/repository/indexeddb';

// @ts-expect-error expected return value type
export async function Index(): entity.Stat[] {
  // @ts-expect-error expected return value type
  const histories: entityHistory.History[] = await repoHistory.FindAll();
  return repo.CalculateStats(histories);
}

export function GetStatType(id: number): entity.StatType {
  return repo.FindStatType(id);
}
