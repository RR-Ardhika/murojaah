'use client';

import { View } from '@/module/counter/component/View';
import { DataProvider } from '@/module/counter/context/DataContext';
import { Alert } from '@/shared/component/Alert';
import { Base } from '@/shared/component/Base';
import { AlertProvider } from '@/shared/context/AlertContext';

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
