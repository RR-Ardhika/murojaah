import { useEffect } from 'react';
import { History } from '@/api/module/history/entity';
import { useData } from '@/context/DataContext';
import { useAlert } from '@/context/AlertContext';
import { Card } from '@/components/Card';
import { clsx } from 'clsx';

export const HistoricalView = (): JSX.Element => {
  // @ts-expect-error useAlert
  const { isAlertVisible } = useAlert();
  const { data, fetchData } = useData();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={clsx('flex flex-col pt-4 px-4', isAlertVisible ? 'mt-[112px]' : 'mt-[72px]')}>
      {data ? data.map((item: History) => <Card key={item.id} {...item} />) : <></>}
    </div>
  );
};
