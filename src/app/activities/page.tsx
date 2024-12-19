'use client';

import { View } from '@/module/activity/component/View';
import { DataProvider } from '@/module/activity/context/DataContext';
import { Base } from '@/shared/component/Base';

const Page = (): JSX.Element => {
  return (
    <Base module="activity" name="Page">
      <DataProvider>
        <View />
      </DataProvider>
    </Base>
  );
};

export default Page;
