'use client';

import { Base } from '@/shared/component/Base';

import { CreateButton } from '../../component/CreateButton';
import { View } from '../../component/View';
import { DataProvider } from '../../context/DataContext';

export const Page = (): React.JSX.Element => {
  return (
    <Base module="activity" name="Page">
      <DataProvider>
        <View />
        <CreateButton />
      </DataProvider>
    </Base>
  );
};
