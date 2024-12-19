'use client';

import { Base } from '@/shared/component/Base';

import { CompactDateView } from '../../component/View';
import { DataProvider } from '../../context/CompactDateDataContext';

export const CompactDatePage = (): JSX.Element => {
  return (
    <Base module="activity" name="CompactDatePage">
      <DataProvider>
        <CompactDateView />
      </DataProvider>
    </Base>
  );
};
