'use client';

import DataProvider from '@/web/module/counter/context/DataContext';
import View from '@/web/module/counter/component/View';

const Page = (): JSX.Element => {
  return (
    <DataProvider>
      <View />
    </DataProvider>
  );
};

export default Page;
