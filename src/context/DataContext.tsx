import { createContext, useContext, useState } from 'react';
import { initJsStore } from '@/api/database/indexeddb/connection';

const DataContext: Context = createContext();

export const DataProvider = ({ children }: JSX.Element): JSX.Element => {
  const idbCon = initJsStore();

  // not work too
  // const [idbCon, setIdbCon] = useState(false);
  // setIdbCon(initJsStore());

  return <DataContext.Provider value={{ idbCon }}>{children}</DataContext.Provider>;
};

export const useData = (): Context<DataContextValues> => {
  const context: Context<DataContextValues> = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};
