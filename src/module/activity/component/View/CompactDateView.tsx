import { useEffect } from 'react';

import { Base } from '@/shared/component/Base';

import { CompactDate } from '../../entity';
import { useCompactDateDataStore } from '../../store';

const CLASS_NAMES: Record<string, string> = {
  container: 'flex justify-between',
  content: 'text-lg text-custom-teal',
};

export const CompactDateView = (): React.JSX.Element => {
  const data = useCompactDateDataStore((state) => state.data);
  const fetchData = useCompactDateDataStore((state) => state.fetchData);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Base module="activity" name="CompactDateView">
      <div className="flex flex-col pt-4 px-4 mt-[72px]">
        {data &&
          data.map((item: CompactDate) => {
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
