'use client';

import { Base } from '@/shared/component/Base';

import { DataProvider } from '../../context/ListSurahDataContext';
import { ListSurahView } from '../View';

export const ListSurahPage = (): React.JSX.Element => {
  return (
    <Base module="activity" name="ListSurahPage">
      <DataProvider>
        <ListSurahView />
      </DataProvider>
    </Base>
  );
};
