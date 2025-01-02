import { clsx } from 'clsx';
import { useEffect } from 'react';

import { Base } from '@/shared/component/Base';

import { CompactDate } from '../../entity';
import { useCompactDateDataStore } from '../../store';

const CLASS_NAMES: Record<string, string> = {
  container: 'flex justify-between',
  content: 'text-lg text-custom-teal',
  striped: 'bg-gray-100',
};

const addStripedClassNames = (i: number): string => {
  if (i % 2 === 0) return CLASS_NAMES.container;
  return clsx(CLASS_NAMES.container, CLASS_NAMES.striped);
};

export const CompactDateView = (): React.JSX.Element => {
  const { data, fetchData } = useCompactDateDataStore();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Base module="activity" name="CompactDateView">
      <div className="flex flex-col pt-4 px-4 mt-[72px]">
        {data &&
          data.map((item: CompactDate, i: number) => {
            return (
              <div key={item.date} className={addStripedClassNames(i)}>
                <p className={CLASS_NAMES.content}>{item.date}</p>
                <p className={CLASS_NAMES.content}>{item.stat.juz} juz</p>
              </div>
            );
          })}
      </div>
    </Base>
  );
};
