import { clsx } from 'clsx';
import { useEffect, useCallback, useRef } from 'react';

import { Base } from '@/shared/component/Base';
import { getGoToDateState, useGoToDateStore } from '@/shared/store';

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

export const CompactDateView = (): React.JSX.Element => {
  const { data, fetchData } = useCompactDateDataStore();
  const { currentDate, isProgrammaticScroll, setIsProgrammaticScroll } =
    useGoToDateStore();
  const dateRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>> =
    useRef<Record<string, HTMLDivElement | null>>({});

  const memoizedFetchData: () => Promise<void> = useCallback((): Promise<void> => {
    return fetchData();
  }, [fetchData]);

  useEffect((): void => {
    memoizedFetchData();
  }, [memoizedFetchData]);

  useEffect((): void | (() => void) => {
    if (!currentDate || !data || data.length === 0) return;

    const targetElement: HTMLDivElement | null | undefined =
      dateRefs.current[currentDate];

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout((): void => {
        setIsProgrammaticScroll(false);
      }, 500);
      return;
    }

    const allDates: string[] = data.map((item: CompactDate): string => item.date);
    const nearestDate: string = findNearestDate(currentDate, allDates);

    const nearestElement: HTMLDivElement | null | undefined =
      dateRefs.current[nearestDate];
    if (nearestElement) {
      nearestElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout((): void => {
        setIsProgrammaticScroll(false);
      }, 500);
    }
  }, [currentDate, data, setIsProgrammaticScroll]);

  useEffect((): void | (() => void) => {
    if (isProgrammaticScroll || !data || data.length === 0) return;

    const observer: IntersectionObserver = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]): void => {
        const visibleEntries: IntersectionObserverEntry[] = entries.filter(
          (entry: IntersectionObserverEntry): boolean => entry.isIntersecting
        );
        if (visibleEntries.length === 0) return;

        const topEntry: IntersectionObserverEntry = visibleEntries.reduce(
          (
            prev: IntersectionObserverEntry,
            curr: IntersectionObserverEntry
          ): IntersectionObserverEntry => {
            return prev.boundingClientRect.top < curr.boundingClientRect.top
              ? prev
              : curr;
          }
        );

        const date: string | null = topEntry.target.getAttribute('data-date');
        if (date) {
          getGoToDateState().setCurrentDate(date);
        }
      },
      {
        root: null,
        threshold: 0,
        rootMargin: '-20% 0px -70% 0px',
      }
    );

    Object.values(dateRefs.current).forEach((ref: HTMLDivElement | null): void => {
      if (ref) observer.observe(ref);
    });

    return (): void => observer.disconnect();
  }, [data, isProgrammaticScroll]);

  return (
    <Base module="activity" name="CompactDateView">
      <div className="flex flex-col pt-4 px-4 mt-[72px]">
        {data &&
          data.map((item: CompactDate, i: number): React.JSX.Element => {
            return (
              <div
                key={item.date}
                ref={(el: HTMLDivElement | null): void => {
                  dateRefs.current[item.date] = el;
                }}
                data-date={item.date}
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
