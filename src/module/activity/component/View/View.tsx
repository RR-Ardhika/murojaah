import { clsx } from 'clsx';
import { useEffect, useCallback } from 'react';

import { Base } from '@/shared/component/Base';
import { useAlertStore } from '@/shared/store';

import { Activity, ActivityGroup } from '../../entity';
import { useDataStore } from '../../store';
import { Card } from '../Card';

export const View = (): React.JSX.Element => {
  const { isAlertVisible } = useAlertStore();
  const { data, fetchData } = useDataStore();

  // Use useCallback to memoize the fetchData function
  const memoizedFetchData = useCallback(() => {
    fetchData();
  }, [fetchData]);

  // Now use the memoized function in useEffect with proper dependency
  useEffect(() => {
    memoizedFetchData();
  }, [memoizedFetchData]);

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
                {group.activities.map((item: Activity) => {
                  return <Card key={item.id} {...item} />;
                })}
              </div>
            );
          })}
      </div>
    </Base>
  );
};
