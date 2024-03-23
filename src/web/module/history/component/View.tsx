import { useEffect } from 'react';
import { History } from '@/api/module/history/entity';
import { useData } from '@/web/module/history/context/DataContext';
import { useAlert } from '@/web/shared/context/AlertContext';
import { Card } from '@/web/module/history/component/Card';
import { formatDatetime } from '@/web/shared/util/datetime';
import { DateTime } from 'luxon';
import { clsx } from 'clsx';

export const View = (): JSX.Element => {
  // @ts-expect-error useAlert
  const { isAlertVisible } = useAlert();
  const { data, fetchData } = useData();
  let currentDate: Date;

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function updateAndRenderCurrentDate(item: History): JSX.Element {
    if (currentDate) {
      const parsedCurrentDate: DateTime = DateTime.fromJSDate(currentDate);
      const parsedOccuredAt: DateTime = DateTime.fromJSDate(item.occuredAt);
      if (parsedCurrentDate.hasSame(parsedOccuredAt, 'day')) return <></>;
    }

    currentDate = item.occuredAt;
    return (
      <>
        <p className="text-custom-teal">{formatDatetime(item.occuredAt)}</p>
        <hr className="mb-2 border-custom-teal" />
      </>
    );
  }

  return (
    <div className={clsx('flex flex-col pt-4 px-4', isAlertVisible ? 'mt-[112px]' : 'mt-[72px]')}>
      {data &&
        data.map((item: History) => {
          return (
            <>
              {currentDate !== item.occuredAt ? updateAndRenderCurrentDate(item) : <></>}
              <Card key={item.id} {...item} />
            </>
          );
        })}
    </div>
  );
};
