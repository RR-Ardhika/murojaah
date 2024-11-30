'use client';

import { View } from '@/web/module/activity/component/View';
import { DataProvider } from '@/web/module/activity/context/DataContext';

const Page = (): JSX.Element => {
  return (
    <DataProvider>
      <View />
    </DataProvider>
  );
};

export default Page;
