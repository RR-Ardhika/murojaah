import { clsx } from 'clsx';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Counter } from '@/module/counter/entity';
import { Option } from '@/shared/entity';
import { getOptionsFromSurahId } from '@/shared/entity/surah';
import { Card } from '@/web/module/counter/component/Card';
import { useData } from '@/web/module/counter/context/DataContext';
import { Base } from '@/web/shared/component/Base';
import { Form } from '@/web/shared/component/Form';
import { useAlert } from '@/web/shared/context/AlertContext';

interface InternalProps {
  data: Counter[];
  // @ts-expect-error useAlert
  hideAlert: Context<AlertContextValues>;
  isFormVisible: boolean;
  setIsFormVisible: Dispatch<SetStateAction<boolean>>;
  parentSurah: Option[] | undefined;
  setParentSurah: Dispatch<SetStateAction<Option[] | undefined>>;
  currentJuz: number;
}

const CLASS_NAMES: Record<string, string> = {
  juz: 'text-2xl font-medium text-custom-teal',
  juzRuler: 'mb-2 border-custom-teal',
};

const updateAndRenderCurrentJuz = (i: InternalProps, item: Counter): JSX.Element => {
  i.currentJuz = item.juz;
  return (
    <>
      <p className={clsx(CLASS_NAMES.juz, i.data[0].juz !== item.juz && 'mt-5')}>Juz {item.juz}</p>
      <hr className={CLASS_NAMES.juzRuler} />
    </>
  );
};

const showForm = (i: InternalProps, item: Counter): void => {
  i.hideAlert();
  // @ts-expect-error expected undefined
  i.setParentSurah(getOptionsFromSurahId(item.id));
  i.setIsFormVisible(true);
};

export const View = (): JSX.Element => {
  const { data, fetchData } = useData();
  const { hideAlert } = useAlert();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [parentSurah, setParentSurah] = useState<Option[]>();

  const formType: string = 'Surah';
  let currentJuz: number;

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const i: InternalProps = {
    data,
    hideAlert,
    isFormVisible,
    setIsFormVisible,
    parentSurah,
    setParentSurah,
    // @ts-expect-error expected assigned
    currentJuz,
  };

  return (
    <Base module="counter" name="View">
      <div className="gap-[20px] mt-[72px] pt-4 px-4">
        {data &&
          data.map((item: Counter) => {
            return (
              <div key={Math.random()}>
                {i.currentJuz !== item.juz ? updateAndRenderCurrentJuz(i, item) : <></>}
                <Card key={item.id} item={item} showForm={() => showForm(i, item)} />
              </div>
            );
          })}

        <Form
          formType={formType}
          isFormVisible={isFormVisible}
          setIsFormVisible={setIsFormVisible}
          parentSurah={parentSurah}
          fetchData={fetchData}
        />
      </div>
    </Base>
  );
};
