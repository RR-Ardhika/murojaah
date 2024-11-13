import { Approach } from '@/api/module/approach/entity';
import { findApproachById } from '@/api/module/approach/repository/indexeddb';

export function show(id: number): Approach {
  return findApproachById(id);
}
