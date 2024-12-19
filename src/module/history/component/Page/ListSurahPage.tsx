'use client';

import { Alert } from '@/shared/component/Alert';
import { Base } from '@/shared/component/Base';
import { AlertProvider } from '@/shared/context/AlertContext';

import { DataProvider } from '../../context/ListSurahDataContext';
import { ListSurahView } from '../View';

export const ListSurahPage = (): JSX.Element => {
  return (
    <Base module="history" name="ListSurahPage">
      <DataProvider>
        <AlertProvider>
          <Alert />
          <ListSurahView />
        </AlertProvider>
      </DataProvider>
    </Base>
  );
};
