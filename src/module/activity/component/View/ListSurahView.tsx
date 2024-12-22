import { clsx } from 'clsx';
import { Dispatch, SetStateAction, useEffect } from 'react';

import { Base } from '@/shared/component/Base';
import { useAlert } from '@/shared/context/AlertContext';
import { Option } from '@/shared/entity';
import { getOptionsFromSurahId } from '@/shared/service';

import { ListSurah } from '../../entity';
import { useFormStore, useListSurahDataStore } from '../../store';
import { ListSurahCard } from '../Card';

interface InternalProps {
  data: ListSurah[];
  // @ts-expect-error useAlert
  hideAlert: Context<AlertContextValues>;
  isFormVisible: boolean;
  setIsFormVisible: Dispatch<SetStateAction<boolean>>;
  parentSurah: Option[] | undefined;
  setParentSurah: unknown;
  setFormType: unknown;
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
  i.setFormType('Surah');
  i.setParentSurah(getOptionsFromSurahId(item.id));
  i.setIsFormVisible(true);
};

export const ListSurahView = (): React.JSX.Element => {
  const { hideAlert } = useAlert();

  const parentSurah = useFormStore((state) => state.parentSurah);
  const isFormVisible = useFormStore((state) => state.isFormVisible);
  const setIsFormVisible = useFormStore((state) => state.setIsFormVisible);
  const setFormType = useFormStore((state) => state.setFormType);
  const setParentSurah = useFormStore((state) => state.setParentSurah);

  const data = useListSurahDataStore((state) => state.data);
  const fetchData = useListSurahDataStore((state) => state.fetchData);

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
    setFormType,
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
      </div>
    </Base>
  );
};
