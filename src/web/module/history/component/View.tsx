import { clsx } from 'clsx';
import { useEffect } from 'react';

import { History, HistoryGroup } from '@/module/history/entity';
import { Card } from '@/web/module/history/component/Card';
import { useData } from '@/web/module/history/context/DataContext';
import { Base } from '@/web/shared/component/Base';
import { useAlert } from '@/web/shared/context/AlertContext';

export const View = (): JSX.Element => {
  const { isAlertVisible } = useAlert();
  const { data, fetchData } = useData();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Base module="history" name="View">
      <div className={clsx('flex flex-col pt-4 px-4', isAlertVisible ? 'mt-[112px]' : 'mt-[72px]')}>
        {data &&
          data.map((group: HistoryGroup) => {
            return (
              <div key={group.date}>
                <>
                  <p className="text-2xl font-medium text-custom-teal">{group.date}</p>
                  <p className="font-light text-custom-teal">
                    <span>{group.stat.juz} juz, </span>
                    <span>{group.stat.ayah} ayah, </span>
                    <span>{group.stat.lines} lines</span>
                  </p>
                  <hr className="mb-2 border-custom-teal" />
                </>
                {group.histories.map((item: History) => {
                  return <Card key={item.id} {...item} />;
                })}
              </div>
            );
          })}
      </div>
    </Base>
  );
};
