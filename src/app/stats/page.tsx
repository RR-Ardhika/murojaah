'use client';

import View from '@/web/module/stat/component/View';
import DataProvider from '@/web/module/stat/context/DataContext';

const Page = (): JSX.Element => {
  return (
    <DataProvider>
      <View />
    </DataProvider>
  );
};

export default Page;
