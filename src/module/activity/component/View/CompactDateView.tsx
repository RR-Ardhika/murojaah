import { clsx } from 'clsx';
import { useEffect, useCallback } from 'react';

import { Base } from '@/shared/component/Base';
import { useGoToDateStore } from '@/shared/store';

import { CompactDate } from '../../entity';
import { useCompactDateDataStore } from '../../store';

const CLASS_NAMES: Record<string, string> = {
  container: 'flex justify-between scroll-mt-20',
  content: 'text-lg text-custom-teal',
  striped: 'bg-gray-100',
};

const addStripedClassNames = (i: number): string => {
  if (i % 2 === 0) return CLASS_NAMES.container;
  return clsx(CLASS_NAMES.container, CLASS_NAMES.striped);
};

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
  }
};

export const CompactDateView = (): React.JSX.Element => {
  const { data, fetchData } = useCompactDateDataStore();
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

    const allIds: string[] = data.map((item: CompactDate): string => item.id);
    const nearestId: string = findNearestId(currentDate, allIds);
    scrollToElement(nearestId);
  }, [currentDate, data]);

  return (
    <Base module="activity" name="CompactDateView">
      <div className="flex flex-col pt-4 px-4 mt-[72px]">
        {data &&
          data.map((item: CompactDate, i: number): React.JSX.Element => {
            return (
              <div key={item.id} id={item.id} className={addStripedClassNames(i)}>
                <p className={CLASS_NAMES.content}>{item.date}</p>
                <p className={CLASS_NAMES.content}>{item.stat.juz} juz</p>
              </div>
            );
          })}
      </div>
    </Base>
  );
};
