'use client';

import { DataProvider } from '@/web/module/history/context/DataContext';
import { AlertProvider } from '@/web/shared/context/AlertContext';
import { Alert } from '@/web/shared/component/Alert';
import { HistoricalView } from '@/web/module/history/component/HistoricalView';
import { CreateButton } from '@/web/module/history/component/CreateButton';

const Home = (): JSX.Element => {
  return (
    <DataProvider>
      <AlertProvider>
        <Alert />
        <HistoricalView />
        <CreateButton />
      </AlertProvider>
    </DataProvider>
  );
};

export default Home;
