'use client';

import View from '@/web/module/counter/component/View';
import DataProvider from '@/web/module/counter/context/DataContext';
import Alert from '@/web/shared/component/Alert';
import AlertProvider from '@/web/shared/context/AlertContext';

const Page = (): JSX.Element => {
  return (
    <DataProvider>
      <AlertProvider>
        <Alert />
        <View />
      </AlertProvider>
    </DataProvider>
  );
};

export default Page;
