import { useEffect } from 'react';
import { Surah } from '@/api/shared/entity/surah';
// import { Counter } from '@/api/module/counter/entity';
import { useData } from '@/web/module/counter/context/DataContext';
import Card from '@/web/module/counter/component/Card';

const View = (): JSX.Element => {
  // const { data, fetchData } = useData();
  const data = Surah;

  useEffect(() => {
    //fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="gap-[20px] mt-[72px] pt-4 px-4">
      <p className="mb-2 text-2xl font-medium text-custom-teal">Last Read</p>
      {/* {data ? data.map((item: Counter) => <Card key={item.id} {...item} />) : <></>} */}
      {data ? data.map((item) => <Card key={item.id} {...item} />) : <></>}
    </div>
  );
};

export default View;
