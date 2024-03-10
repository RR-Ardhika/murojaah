import { MurojaahMethod } from '@/api/module/murojaah_method/entity';

export function FindMurojaahMethodById(id: number): MurojaahMethod {
  // @ts-expect-error access enum value with index
  return MurojaahMethod[Object.keys(MurojaahMethod)[id]];
}
