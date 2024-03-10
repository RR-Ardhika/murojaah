import { MurojaahMethod } from '@/api/module/murojaah_method/entity';
import { FindMurojaahMethodById } from '@/api/module/murojaah_method/repository/indexeddb';

export function Show(id: number): MurojaahMethod {
  return FindMurojaahMethodById(id);
}
