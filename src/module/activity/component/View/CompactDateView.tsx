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

const dateToId = (date: string): string => {
  return `date-${date.replace(/[^a-zA-Z0-9]/g, '-')}`;
};

const findNearestDate = (
  targetDate: string,
  availableDates: string[]
): string => {
  const sortedDates: string[] = [...availableDates].sort();
  return sortedDates.reduce((prev: string, curr: string): string => {
    const prevDiff: number = Math.abs(
      new Date(prev).getTime() - new Date(targetDate).getTime()
    );
    const currDiff: number = Math.abs(
      new Date(curr).getTime() - new Date(targetDate).getTime()
    );
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

    const targetId: string = dateToId(currentDate);
    const targetElement: HTMLElement | null = document.getElementById(targetId);

    if (targetElement) {
      scrollToElement(targetId);
      return;
    }

    const allDates: string[] = data.map((item: CompactDate): string => item.date);
    const nearestDate: string = findNearestDate(currentDate, allDates);
    scrollToElement(dateToId(nearestDate));
  }, [currentDate, data]);

  return (
    <Base module="activity" name="CompactDateView">
      <div className="flex flex-col pt-4 px-4 mt-[72px]">
        {data &&
          data.map((item: CompactDate, i: number): React.JSX.Element => {
            return (
              <div
                key={item.date}
                id={dateToId(item.date)}
                className={addStripedClassNames(i)}
              >
                <p className={CLASS_NAMES.content}>{item.date}</p>
                <p className={CLASS_NAMES.content}>{item.stat.juz} juz</p>
              </div>
            );
          })}
      </div>
    </Base>
  );
};
