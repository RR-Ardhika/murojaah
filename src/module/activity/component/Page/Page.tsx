'use client';

import { Base } from '@/shared/component/Base';
import { Form } from '@/shared/component/Form';

import { CreateButton } from '../../component/CreateButton';
import { View } from '../../component/View';
import { useDataStore } from '../../store/DataStore';

export const Page = (): React.JSX.Element => {
  const fetchData = useDataStore((state) => state.fetchData);

  return (
    <Base module="activity" name="Page">
      <View />
      <CreateButton />
      <Form fetchData={fetchData} />
    </Base>
  );
};
