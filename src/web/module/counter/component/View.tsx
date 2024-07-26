import { useEffect, useState } from 'react';
import { useData } from '@/web/module/counter/context/DataContext';
import { useAlert } from '@/web/shared/context/AlertContext';
import { Counter } from '@/api/module/counter/entity';
import { clsx } from 'clsx';
import Card from '@/web/module/counter/component/Card';
import Form from '@/web/shared/component/Form';

const View = (): JSX.Element => {
  const viewClass: Record<string, string> = {
    juz: 'text-2xl font-medium text-custom-teal',
    juzRuler: 'mb-2 border-custom-teal',
  };

  const { data, fetchData } = useData();
  // @ts-expect-error useAlert
  const { hideAlert } = useAlert();
  const [isFormVisible, setIsFormVisible] = useState(false);

  const formType: string = 'Surah';

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

  function showForm(): void {
    hideAlert();
    setIsFormVisible(true);
  }

  return (
    <div className="gap-[20px] mt-[72px] pt-4 px-4">
      {data &&
        data.map((item: Counter) => {
          return (
            <div key={Math.random()}>
              {currentJuz !== item.juz ? updateAndRenderCurrentJuz(item) : <></>}
              <Card key={item.id} item={item} showForm={showForm} />
            </div>
          );
        })}

      <Form
        formType={formType}
        isFormVisible={isFormVisible}
        setIsFormVisible={setIsFormVisible}
        fetchData={fetchData}
      />
    </div>
  );
};

export default View;
