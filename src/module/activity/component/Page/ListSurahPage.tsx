'use client';

import { Base } from '@/shared/component/Base';

import { Form } from '../../component/Form';
import { useListSurahDataStore } from '../../store';
import { ListSurahView } from '../View';

export const ListSurahPage = (): React.JSX.Element => {
  const fetchData = useListSurahDataStore((state) => state.fetchData);

  return (
    <Base module="activity" name="ListSurahPage">
      <ListSurahView />
      <Form fetchData={fetchData} />
    </Base>
  );
};
