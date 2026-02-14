'use client';

import { Base } from '@/shared/component/Base';
import { useDataImportListener } from '@/shared/hook';

import { CreateButton } from '../../component/CreateButton';
import { Form } from '../../component/Form';
import { View } from '../../component/View';
import { useDataStore } from '../../store';

export const Page = (): React.JSX.Element => {
  const { fetchData } = useDataStore();

  // Auto-refresh data when import event is triggered
  useDataImportListener(fetchData);

  return (
    <Base module="activity" name="Page">
      <View />
      <CreateButton />
      <Form fetchData={fetchData} />
    </Base>
  );
};
