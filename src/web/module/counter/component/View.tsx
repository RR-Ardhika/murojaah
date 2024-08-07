import { useEffect } from 'react';
import { Counter } from '@/api/module/counter/entity';
import { useData } from '@/web/module/counter/context/DataContext';
import { clsx } from 'clsx';
import Card from '@/web/module/counter/component/Card';

const View = (): JSX.Element => {
  const viewClass: Record<string, string> = {
    juz: 'text-2xl font-medium text-custom-teal',
    juzRuler: 'mb-2 border-custom-teal',
  };

  const { data, fetchData } = useData();

  let currentJuz: number;

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function updateAndRenderCurrentJuz(item: Counter): JSX.Element {
    currentJuz = item.juz;
    return (
      <>
        <p className={clsx(viewClass.juz, data[0].juz !== item.juz && 'mt-5')}>Juz {item.juz}</p>
        <hr className={viewClass.juzRuler} />
      </>
    );
  }

  return (
    <div className="gap-[20px] mt-[72px] pt-4 px-4">
      {data &&
        data.map((item: Counter) => {
          return (
            <>
              {currentJuz !== item.juz ? updateAndRenderCurrentJuz(item) : <></>}
              <Card key={item.id} {...item} />
            </>
          );
        })}
    </div>
  );
};

export default View;
