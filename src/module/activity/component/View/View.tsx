import { useEffect, useCallback, useRef } from 'react';

import { Base } from '@/shared/component/Base';
import { useGoToDateStore } from '@/shared/store';

import { Activity, ActivityGroup } from '../../entity';
import { useDataStore } from '../../store';
import { Card } from '../Card';

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

export const View = (): React.JSX.Element => {
  const { data, fetchData } = useDataStore();
  const { currentDate } = useGoToDateStore();
  const dateRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>> =
    useRef<Record<string, HTMLDivElement | null>>({});

  const memoizedFetchData: () => Promise<void> = useCallback((): Promise<void> => {
    return fetchData();
  }, [fetchData]);

  useEffect((): void => {
    memoizedFetchData();
  }, [memoizedFetchData]);

  useEffect((): void => {
    if (!currentDate || !data || data.length === 0) return;

    const targetElement: HTMLDivElement | null | undefined =
      dateRefs.current[currentDate];

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    const allDates: string[] = data.map((g: ActivityGroup): string => g.date);
    const nearestDate: string = findNearestDate(currentDate, allDates);

    const nearestElement: HTMLDivElement | null | undefined =
      dateRefs.current[nearestDate];
    if (nearestElement) {
      nearestElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentDate, data]);

  return (
    <Base module="activity" name="View">
      <div className="flex flex-col pt-4 px-4 mt-[72px]">
        {data &&
          data.map((group: ActivityGroup): React.JSX.Element => {
            return (
              <div
                key={group.date}
                ref={(el: HTMLDivElement | null): void => {
                  dateRefs.current[group.date] = el;
                }}
                className="scroll-mt-20"
              >
                <>
                  <p className="text-2xl font-medium text-custom-teal">
                    {group.date}
                  </p>
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
