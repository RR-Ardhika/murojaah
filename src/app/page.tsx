'use client';

import { useEffect } from 'react';
import { initJsStore } from '@/api/database/indexeddb/connection';
import { DataProvider } from '@/context/DataContext';
import { AlertProvider } from '@/context/AlertContext';
import { Alert } from '@/components/Alert';
import { HistoricalView } from '@/components/HistoricalView';
import { CreateButton } from '@/components/CreateButton';

const Home = (): JSX.Element => {
  useEffect(() => {
    initJsStore();
  }, []);

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
