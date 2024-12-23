import { useEffect } from 'react';

import { Base } from '@/shared/component/Base';

import { Card } from './Card';
import { Stat } from '../entity';
import { useDataStore } from '../store';

export const View = (): React.JSX.Element => {
  const { data, fetchData } = useDataStore();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Base module="stat" name="View">
      <div className="gap-[20px] mt-[72px] pt-4 px-4">
        {data && (
          <div className="flex flex-col gap-4 p-4 bg-custom-teal text-white rounded-lg">
            {data ? data.map((item: Stat) => <Card key={item.id} {...item} />) : <></>}
          </div>
        )}
      </div>
    </Base>
  );
};
