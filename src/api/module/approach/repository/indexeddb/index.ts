import { Approach } from '@/api/module/approach/entity';

export function FindApproachById(id: number): Approach {
  // @ts-expect-error access enum value with index
  return Approach[Object.keys(Approach)[id]];
}
