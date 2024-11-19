import * as entity from '@/api/module/counter/entity';
import * as repo from '@/api/module/counter/repository/indexeddb';
import * as entityHistory from '@/api/module/history/entity';
import * as repoHistory from '@/api/module/history/repository/indexeddb';

// @ts-expect-error expected return value type
export async function index(): entity.Counter[] {
  const histories: entityHistory.History[] = await repoHistory.findAll();
  return repo.calculateCounters(histories);
}
