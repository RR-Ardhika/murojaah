'use client';

import { Base } from '@/shared/component/Base';
import { Form } from '@/shared/component/Form';

import { useDataStore } from '../../store/ListSurahDataStore';
import { ListSurahView } from '../View';

export const ListSurahPage = (): React.JSX.Element => {
  const fetchData = useDataStore((state) => state.fetchData);

  return (
    <Base module="activity" name="ListSurahPage">
      <ListSurahView />
      <Form fetchData={fetchData} />
    </Base>
  );
};
