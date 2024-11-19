import { Approach } from '@/api/module/approach/entity';
import { findApproachById } from '@/api/module/approach/repository/indexeddb';

export const show = (id: number): Approach => {
  return findApproachById(id);
};
