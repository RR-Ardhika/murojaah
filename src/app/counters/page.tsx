'use client';

import { View } from '@/web/module/counter/component/View';
import { DataProvider } from '@/web/module/counter/context/DataContext';
import { Alert } from '@/web/shared/component/Alert';
import { Base } from '@/web/shared/component/Base';
import { AlertProvider } from '@/web/shared/context/AlertContext';

const Page = (): JSX.Element => {
  return (
    <Base module="counter" name="Page">
      <DataProvider>
        <AlertProvider>
          <Alert />
          <View />
        </AlertProvider>
      </DataProvider>
    </Base>
  );
};

export default Page;
