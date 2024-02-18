'use client';

import { AlertProvider } from '@/context/AlertContext';
import { Alert } from '@/components/Alert';
import { HistoricalView } from '@/components/HistoricalView';
import { CreateButton } from '@/components/CreateButton';

const Home = (): JSX.Element => {
  return (
    <AlertProvider>
      <Alert />
      <HistoricalView />
      <CreateButton />
    </AlertProvider>
  );
};

export default Home;
