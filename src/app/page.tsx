'use client';

import { CreateButton } from '@/web/module/history/component/CreateButton';
import { View } from '@/web/module/history/component/View';
import { DataProvider } from '@/web/module/history/context/DataContext';
import { Alert } from '@/web/shared/component/Alert';
import { Base } from '@/web/shared/component/Base';
import { AlertProvider } from '@/web/shared/context/AlertContext';

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
