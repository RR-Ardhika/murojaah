import { useEffect, useCallback } from 'react';

import { Base } from '@/shared/component/Base';
import { useGoToDateStore } from '@/shared/store';

import { Activity, ActivityGroup } from '../../entity';
import { useDataStore } from '../../store';
import { Card } from '../Card';

const findNearestId = (targetId: string, availableIds: string[]): string => {
  const sortedIds: string[] = [...availableIds].sort();
  return sortedIds.reduce((prev: string, curr: string): string => {
    const prevDiff: number = Math.abs(new Date(prev).getTime() - new Date(targetId).getTime());
    const currDiff: number = Math.abs(new Date(curr).getTime() - new Date(targetId).getTime());
    return currDiff < prevDiff ? curr : prev;
  });
};

const scrollToElement = (elementId: string): void => {
  const element: HTMLElement | null = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    element.classList.add('flash-highlight');
    setTimeout(() => element.classList.remove('flash-highlight'), 5000);
  }
};

export const View = (): React.JSX.Element => {
  const { data, fetchData } = useDataStore();
  const { currentDate } = useGoToDateStore();

  const memoizedFetchData: () => Promise<void> = useCallback((): Promise<void> => {
    return fetchData();
  }, [fetchData]);

  useEffect((): void => {
    memoizedFetchData();
  }, [memoizedFetchData]);

  useEffect((): void => {
    if (!currentDate || !data || data.length === 0) return;

    const targetElement: HTMLElement | null = document.getElementById(currentDate);

    if (targetElement) {
      scrollToElement(currentDate);
      return;
    }

    const allIds: string[] = data.map((g: ActivityGroup): string => g.id);
    const nearestId: string = findNearestId(currentDate, allIds);
    scrollToElement(nearestId);
  }, [currentDate, data]);

  return (
    <Base module="activity" name="View">
      <div className="flex flex-col pt-4 px-4 mt-[72px]">
        {data &&
          data.map((group: ActivityGroup): React.JSX.Element => {
            return (
              <div key={group.id} id={group.id} className="scroll-mt-20">
                <>
                  <p className="text-2xl font-medium text-custom-teal">{group.date}</p>
                  <p className="font-light text-custom-teal">
                    <span>{group.stat.juz} juz, </span>
                    <span>{group.stat.ayah} ayah, </span>
                    <span>{group.stat.lines} lines</span>
                  </p>
                  <hr className="mb-2 border-custom-teal" />
                </>
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
