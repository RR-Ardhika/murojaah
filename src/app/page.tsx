'use client';

import { ContextProvider } from '@/context';
import { Alert } from '@/components/Alert';
import { HistoricalView } from '@/components/HistoricalView';
import { CreateButton } from '@/components/CreateButton';

const Home = (): JSX.Element => {
  return (
    <ContextProvider>
      <Alert />
      <HistoricalView />
      <CreateButton />
    </ContextProvider>
  );
};

export default Home;
