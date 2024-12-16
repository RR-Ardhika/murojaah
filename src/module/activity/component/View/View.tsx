import { clsx } from 'clsx';
import { useEffect } from 'react';

import { Base } from '@/shared/component/Base';
import { useAlert } from '@/shared/context/AlertContext';

import { useData } from '../../context/DataContext';
import { History, ActivityGroup } from '../../entity';
import { Card } from '../Card';

export const View = (): JSX.Element => {
  const { isAlertVisible } = useAlert();
  const { data, fetchData } = useData();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Base module="activity" name="View">
      <div className={clsx('flex flex-col pt-4 px-4', isAlertVisible ? 'mt-[112px]' : 'mt-[72px]')}>
        {data &&
          data.map((group: ActivityGroup) => {
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
