import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

import { Base } from '@/shared/component/Base';

import * as entity from '../entity';
import * as service from '../service';

interface InternalProps {
  setData: Dispatch<SetStateAction<entity.CompactDate[] | undefined>>;
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
  service.getCompactDate().then((result: entity.CompactDate[]) => i.setData(result));
};

export const DataProvider = ({ children }: { children: ReactNode }): React.JSX.Element => {
  const [data, setData] = useState<entity.CompactDate[]>();

  const i: InternalProps = {
    setData,
  };

  return (
    <Base module="activity" name="CompactDateDataProvider">
      <DataContext.Provider value={{ data, fetchData: () => fetchData(i) }}>
        {children}
      </DataContext.Provider>
    </Base>
  );
};
