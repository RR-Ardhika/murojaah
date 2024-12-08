'use client';

import { View } from '@/web/module/activity/component/View';
import { DataProvider } from '@/web/module/activity/context/DataContext';
import { Base } from '@/web/shared/component/Base';

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
