import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

import * as entity from '@/api/module/history/entity';
import * as service from '@/api/module/history/service';
import { Base } from '@/web/shared/component/Base';

interface InternalProps {
  setData: Dispatch<SetStateAction<entity.History[] | undefined>>;
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
  service.index().then((result: entity.History[]) => i.setData(result));
};

export const DataProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [data, setData] = useState<entity.History[]>();

  const i: InternalProps = {
    setData,
  };

  return (
    <Base module="activity" name="DataProvider">
      <DataContext.Provider value={{ data, fetchData: () => fetchData(i) }}>
        {children}
      </DataContext.Provider>
    </Base>
  );
};
