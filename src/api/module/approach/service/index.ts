import { Approach } from '@/api/module/approach/entity';
import { FindApproachById } from '@/api/module/approach/repository/indexeddb';

export function Show(id: number): Approach {
  return FindApproachById(id);
}
