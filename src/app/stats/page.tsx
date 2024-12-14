'use client';

import { View } from '@/module/stat/component/View';
import { DataProvider } from '@/module/stat/context/DataContext';
import { Base } from '@/web/shared/component/Base';

const Page = (): JSX.Element => {
  return (
    <Base module="stat" name="Page">
      <DataProvider>
        <View />
      </DataProvider>
    </Base>
  );
};

export default Page;
