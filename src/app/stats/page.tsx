'use client';

import DataProvider from '@/web/module/stat/context/DataContext';
import View from '@/web/module/stat/component/View';

const Page = (): JSX.Element => {
  return (
    <DataProvider>
      <View />
    </DataProvider>
  );
};

export default Page;
