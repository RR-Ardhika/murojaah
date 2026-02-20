import { clsx } from 'clsx';
import { useEffect, useCallback } from 'react';

import { Base } from '@/shared/component/Base';
import { useGoToDateStore } from '@/shared/store';
import { findNearestId, scrollToElement } from '@/shared/util/scroll';

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

export const CompactDateView = (): React.JSX.Element => {
  const { data, fetchData } = useCompactDateDataStore();
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

    const allIds: string[] = data.map((item: CompactDate): string => item.id);
    const nearestId: string = findNearestId(currentDate, allIds);
    const cleanup: () => void = scrollToElement(nearestId);
    clearCurrentDate();
    return cleanup;
  }, [currentDate, data, clearCurrentDate]);

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
