import { useEffect } from 'react';

import { Stat } from '@/api/module/stat/entity';
import { Card } from '@/web/module/stat/component/Card';
import { useData } from '@/web/module/stat/context/DataContext';

export const View = (): JSX.Element => {
  const { data, fetchData } = useData();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="gap-[20px] mt-[72px] pt-4 px-4">
      {data && (
        <div className="flex flex-col gap-4 p-4 bg-custom-teal text-white rounded-lg">
          {data ? data.map((item: Stat) => <Card key={item.id} {...item} />) : <></>}
        </div>
      )}
    </div>
  );
};
