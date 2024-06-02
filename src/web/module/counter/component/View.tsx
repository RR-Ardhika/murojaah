import { useEffect } from 'react';
import { Counter } from '@/api/module/counter/entity';
import { useData } from '@/web/module/counter/context/DataContext';
import Card from '@/web/module/counter/component/Card';

const View = (): JSX.Element => {
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
        <p className="text-2xl font-medium text-custom-teal">Juz {item.juz}</p>
        <hr className="mb-2 border-custom-teal" />
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
