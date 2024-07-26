'use client';

import AlertProvider from '@/web/shared/context/AlertContext';
import Alert from '@/web/shared/component/Alert';
import DataProvider from '@/web/module/counter/context/DataContext';
import View from '@/web/module/counter/component/View';

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
