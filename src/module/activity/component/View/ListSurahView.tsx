import { clsx } from 'clsx';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Base } from '@/shared/component/Base';
import { Form } from '@/shared/component/Form';
import { useAlert } from '@/shared/context/AlertContext';
import { Option } from '@/shared/entity';
import { getOptionsFromSurahId } from '@/shared/service';

import { useData } from '../../context/ListSurahDataContext';
import { ListSurah } from '../../entity';
import { ListSurahCard } from '../Card';

interface InternalProps {
  data: ListSurah[];
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

const updateAndRenderCurrentJuz = (i: InternalProps, item: ListSurah): React.JSX.Element => {
  i.currentJuz = item.juz;
  return (
    <>
      <p className={clsx(CLASS_NAMES.juz, i.data[0].juz !== item.juz && 'mt-5')}>Juz {item.juz}</p>
      <hr className={CLASS_NAMES.juzRuler} />
    </>
  );
};

const showForm = (i: InternalProps, item: ListSurah): void => {
  i.hideAlert();
  i.setParentSurah(getOptionsFromSurahId(item.id));
  i.setIsFormVisible(true);
};

export const ListSurahView = (): React.JSX.Element => {
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
    <Base module="activity" name="ListSurahView">
      <div className="gap-[20px] mt-[72px] pt-4 px-4">
        {data &&
          data.map((item: ListSurah) => {
            return (
              <div key={Math.random()}>
                {i.currentJuz !== item.juz ? updateAndRenderCurrentJuz(i, item) : <></>}
                <ListSurahCard key={item.id} item={item} showForm={() => showForm(i, item)} />
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
