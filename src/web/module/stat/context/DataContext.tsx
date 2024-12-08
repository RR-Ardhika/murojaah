import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

import * as entity from '@/api/module/stat/entity';
import * as service from '@/api/module/stat/service';
import { Base } from '@/web/shared/component/Base';

interface InternalProps {
  setData: Dispatch<SetStateAction<entity.Stat[] | undefined>>;
}

// @ts-expect-error DataContextValues
const DataContext: Context<DataContextValues> = createContext<DataContextValues>(undefined);

// @ts-expect-error DataContextValues
export const useData = (): Context<DataContextValues> => {
  // @ts-expect-error DataContextValues
  const context: Context<DataContextValues> = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};

const fetchData = (i: InternalProps): void => {
  service.index().then((result: entity.Stat[]) => i.setData(result));
};

export const DataProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [data, setData] = useState<entity.Stat[]>();

  const i: InternalProps = {
    setData,
  };

  return (
    <Base module="stat" name="DataProvider">
      <DataContext.Provider value={{ data, fetchData: () => fetchData(i) }}>
        {children}
      </DataContext.Provider>
    </Base>
  );
};
