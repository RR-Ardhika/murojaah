import { useEffect } from 'react';

import { Activity } from '@/module/activity/entity';
import { useData } from '@/web/module/activity/context/DataContext';
import { Base } from '@/web/shared/component/Base';

const CLASS_NAMES: Record<string, string> = {
  container: 'flex justify-between',
  content: 'text-lg text-custom-teal',
};

export const View = (): JSX.Element => {
  const { data, fetchData } = useData();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Base module="activity" name="View">
      <div className="flex flex-col pt-4 px-4 mt-[72px]">
        {data &&
          data.map((item: Activity) => {
            return (
              <div key={item.date} className={CLASS_NAMES.container}>
                <p className={CLASS_NAMES.content}>{item.date}</p>
                <p className={CLASS_NAMES.content}>{item.stat.juz} juz</p>
              </div>
            );
          })}
      </div>
    </Base>
  );
};
