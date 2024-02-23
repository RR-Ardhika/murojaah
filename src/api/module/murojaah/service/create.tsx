import { Option } from '@/api/module/murojaah/entity/murojaah';
import { Insert } from '@/api/module/murojaah/repository/indexeddb/insert';
import { History } from '@/api/module/murojaah/entity/murojaah';

export function Create(payload: Option): [Murojaah, Error] {
  const history: History = {
    juzId: payload.value,
  };

  Insert(history);
}
