import { clsx } from 'clsx';
import { useEffect, useCallback } from 'react';

import { Base } from '@/shared/component/Base';
import { getSurahOptionsFromSurahId } from '@/shared/service';
import { useAlertStore } from '@/shared/store';

import { ActivityType, ListSurah } from '../../entity';
import { useFormStore, useListSurahDataStore } from '../../store';
import { ListSurahCard } from '../Card';

const CLASS_NAMES: Record<string, string> = {
  juz: 'text-2xl font-medium text-custom-teal',
  juzRuler: 'mb-2 border-custom-teal',
};

export const ListSurahView = (): React.JSX.Element => {
  const { hideAlert } = useAlertStore();
  const { setIsFormVisible, setFormType, setParentSurah } = useFormStore();
  const { data, fetchData } = useListSurahDataStore();

  const memoizedFetchData: () => Promise<void> = useCallback(() => {
    return fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (data.length === 0) {
      memoizedFetchData();
    }
  }, [memoizedFetchData, data]);

  const showForm = (item: ListSurah): void => {
    hideAlert();
    setFormType(ActivityType.Surah);
    setParentSurah(getSurahOptionsFromSurahId(item.id));
    setIsFormVisible(true);
  };

  return (
    <Base module="activity" name="ListSurahView">
      <div className="gap-[20px] mt-[72px] pt-4 px-4">
        {data &&
          data.map((item: ListSurah, index: number) => {
            const isFirstItem: boolean = index === 0;
            const prevItem: ListSurah | null = index > 0 ? data[index - 1] : null;
            const showJuzHeader: boolean = isFirstItem || prevItem?.juz !== item.juz;

            return (
              <div key={`surah-${item.id}`}>
                {showJuzHeader && (
                  <>
                    <p className={clsx(CLASS_NAMES.juz, !isFirstItem && 'mt-5')}>Juz {item.juz}</p>
                    <hr className={CLASS_NAMES.juzRuler} />
                  </>
                )}
                <ListSurahCard item={item} showForm={() => showForm(item)} />
              </div>
            );
          })}
      </div>
    </Base>
  );
};
