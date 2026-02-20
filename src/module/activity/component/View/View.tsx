import { useEffect, useCallback } from 'react';

import { Base } from '@/shared/component/Base';
import { useGoToDateStore } from '@/shared/store';
import { findNearestId, scrollToElement } from '@/shared/util/scroll';

import { Activity, ActivityGroup } from '../../entity';
import { useDataStore } from '../../store';
import { Card } from '../Card';
import { ConvertButton } from './ConvertButton';

export const View = (): React.JSX.Element => {
  const { data, fetchData } = useDataStore();
  const { currentDate, clearCurrentDate } = useGoToDateStore();

  const memoizedFetchData: () => Promise<void> = useCallback((): Promise<void> => {
    return fetchData();
  }, [fetchData]);

  useEffect((): void => {
    if (data.length === 0) {
      memoizedFetchData();
    }
  }, [memoizedFetchData, data]);

  useEffect((): (() => void) | void => {
    if (!currentDate || !data || data.length === 0) return;

    const targetElement: HTMLElement | null = document.getElementById(currentDate);

    if (targetElement) {
      const cleanup: () => void = scrollToElement(currentDate);
      clearCurrentDate();
      return cleanup;
    }

    const allIds: string[] = data.map((g: ActivityGroup): string => g.id);
    const nearestId: string = findNearestId(currentDate, allIds);
    const cleanup: () => void = scrollToElement(nearestId);
    clearCurrentDate();
    return cleanup;
  }, [currentDate, data, clearCurrentDate]);

  const getOccuredAtFromGroup = (group: ActivityGroup): Date => {
    const sortedActivities: Activity[] = [...group.activities].sort(
      (a: Activity, b: Activity): number => new Date(b.occuredAt).getTime() - new Date(a.occuredAt).getTime()
    );
    return sortedActivities[0]?.occuredAt ?? new Date();
  };

  return (
    <Base module="activity" name="View">
      <div className="flex flex-col pt-4 px-4 mt-[72px]">
        {data &&
          data.map((group: ActivityGroup): React.JSX.Element => {
            return (
              <div key={group.id} id={group.id} className="scroll-mt-20">
                <div className="flex justify-between items-center">
                  <p className="text-2xl font-medium text-custom-teal">{group.date}</p>
                  <ConvertButton
                    activities={group.activities}
                    occuredAt={getOccuredAtFromGroup(group)}
                  />
                </div>
                <p className="font-light text-custom-teal">
                  <span>{group.stat.juz} juz, </span>
                  <span>{group.stat.ayah} ayah, </span>
                  <span>{group.stat.lines} lines</span>
                </p>
                <hr className="mb-2 border-custom-teal" />
                {group.activities.map((item: Activity): React.JSX.Element => {
                  return <Card key={item.id} {...item} />;
                })}
              </div>
            );
          })}
      </div>
    </Base>
  );
};
