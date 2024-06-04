'use client';

import AlertProvider from '@/web/shared/context/AlertContext';
import Alert from '@/web/shared/component/Alert';
import DataProvider from '@/web/module/history/context/DataContext';
import View from '@/web/module/history/component/View';
import CreateButton from '@/web/module/history/component/CreateButton';

const Page = (): JSX.Element => {
  return (
    <DataProvider>
      <AlertProvider>
        <Alert />
        <View />
        <CreateButton />
      </AlertProvider>
    </DataProvider>
  );
};

export default Page;
