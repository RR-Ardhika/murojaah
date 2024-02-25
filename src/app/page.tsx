'use client';

import { useEffect } from 'react';
import { initJsStore } from '@/api/database/indexeddb/connection';
import { AlertProvider } from '@/context/AlertContext';
import { Alert } from '@/components/Alert';
import { HistoricalView } from '@/components/HistoricalView';
import { CreateButton } from '@/components/CreateButton';

const Home = (): JSX.Element => {
  useEffect(() => {
    initJsStore();
  }, []);

  return (
    <AlertProvider>
      <Alert />
      <HistoricalView />
      <CreateButton />
    </AlertProvider>
  );
};

export default Home;
