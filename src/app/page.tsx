'use client';

import { CreateButton } from '@/module/history/component/CreateButton';
import { View } from '@/module/history/component/View';
import { DataProvider } from '@/module/history/context/DataContext';
import { Alert } from '@/shared/component/Alert';
import { Base } from '@/shared/component/Base';
import { AlertProvider } from '@/shared/context/AlertContext';

const Page = (): JSX.Element => {
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

export default Page;
