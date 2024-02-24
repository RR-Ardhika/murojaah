import { History } from '@/api/module/murojaah/entity';
import { useData } from '@/context/DataContext';

export function FindAll(): Promise<unknown> {
  const { idbCon } = useData();
  return idbCon.select<History>({ from: 'histories', order: { by: 'id', type: 'desc' } });
}

export function Insert(history: History): Promise<unknown> {
  const { idbCon } = useData();
  return idbCon.insert({ into: 'histories', values: [history] });
}
