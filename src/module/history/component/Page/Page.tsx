'use client';

import { Alert } from '@/shared/component/Alert';
import { Base } from '@/shared/component/Base';
import { AlertProvider } from '@/shared/context/AlertContext';

import { CreateButton } from '../../component/CreateButton';
import { View } from '../../component/View';
import { DataProvider } from '../../context/DataContext';

export const Page = (): JSX.Element => {
  return (
    <Base module="history" name="Page">
      <DataProvider>
        <AlertProvider>
          <Alert />
          <View />
          <CreateButton />
        </AlertProvider>
      </DataProvider>
    </Base>
  );
};
