import { createContext, useContext, useState, ReactNode } from 'react';

import * as entity from '@/api/module/history/entity';
import * as service from '@/api/module/history/service';

// @ts-expect-error DataContextValues
const DataContext: Context<DataContextValues> = createContext<DataContextValues>(undefined);

// @ts-expect-error DataContextValues
export const useData = (): Context<DataContextValues> => {
  // @ts-expect-error DataContextValues
  const context: Context<DataContextValues> = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};

const DataProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [data, setData] = useState(undefined);

  function fetchData(): void {
    // @ts-expect-error DataProvider fetchData
    service.index().then((result: entity.History[]) => setData(result));
  }

  return <DataContext.Provider value={{ data, fetchData }}>{children}</DataContext.Provider>;
};

export default DataProvider;
