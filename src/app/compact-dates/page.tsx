'use client';

import { CompactDateView } from '@/module/history/component/View';
import { DataProvider } from '@/module/history/context/CompactDateDataContext';
import { Base } from '@/shared/component/Base';

const Page = (): JSX.Element => {
  return (
    <Base module="activity" name="Page">
      <DataProvider>
        <CompactDateView />
      </DataProvider>
    </Base>
  );
};

export default Page;
