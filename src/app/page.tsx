'use client';

import { DataProvider } from '@/web/module/history/context/DataContext';
import { AlertProvider } from '@/web/module/history//context/AlertContext';
import { Alert } from '@/components/Alert';
import { HistoricalView } from '@/components/HistoricalView';
import { CreateButton } from '@/components/CreateButton';

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
