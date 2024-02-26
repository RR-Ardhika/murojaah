import { createContext, useContext, useState } from 'react';
import { Index } from '@/api/module/murojaah/service';

const DataContext: Context = createContext();

export const DataProvider = ({ children }: JSX.Element): JSX.Element => {
  const [data, setData] = useState(undefined);

  function fetchData(): void {
    Index().then((result: History[]) => setData(result));
  }

  return <DataContext.Provider value={{ data, fetchData }}>{children}</DataContext.Provider>;
};

export const useData = (): Context<DataContextValues> => {
  const context: Context<DataContextValues> = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};
