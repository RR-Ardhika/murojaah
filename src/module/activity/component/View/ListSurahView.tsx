import { clsx } from 'clsx';
import { useEffect, useMemo } from 'react';

import { Base } from '@/shared/component/Base';
import { Option } from '@/shared/entity';
import { getSurahOptionsFromSurahId } from '@/shared/service';
import { useAlertStore } from '@/shared/store';

import { ActivityType, ListSurah } from '../../entity';
import { useFormStore, useListSurahDataStore } from '../../store';
import { ListSurahCard } from '../Card';

interface InternalProps {
  data: ListSurah[];
  hideAlert: () => void;
  isFormVisible: boolean;
  parentSurah: Option[] | undefined;
  setIsFormVisible: (value: boolean) => void;
  setFormType: (value: number) => void;
  setParentSurah: (value: Option[]) => void;
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
  i.setFormType(ActivityType.Surah);
  i.setParentSurah(getSurahOptionsFromSurahId(item.id));
  i.setIsFormVisible(true);
};

export const ListSurahView = (): React.JSX.Element => {
  const { hideAlert } = useAlertStore();
  const { parentSurah, isFormVisible, setIsFormVisible, setFormType, setParentSurah } =
    useFormStore();
  const { data, fetchData } = useListSurahDataStore();

  let currentJuz: number;

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const i: InternalProps = useMemo(
    () => ({
      data,
      hideAlert,
      isFormVisible,
      setIsFormVisible,
      parentSurah,
      setParentSurah,
      setFormType,
      // @ts-expect-error expected assigned
      currentJuz,
    }),
    [data, hideAlert, isFormVisible, parentSurah, setIsFormVisible, setParentSurah, setFormType]
  );

  const renderedData: React.JSX.Element[] | null = useMemo(() => {
    if (!data) return null;
    return data.map((item: ListSurah) => {
      return (
        <div key={Math.random()}>
          {i.currentJuz !== item.juz ? updateAndRenderCurrentJuz(i, item) : <></>}
          <ListSurahCard key={item.id} item={item} showForm={() => showForm(i, item)} />
        </div>
      );
    });
  }, [data, i]);

  return (
    <Base module="activity" name="ListSurahView">
      <div className="gap-[20px] mt-[72px] pt-4 px-4">{renderedData}</div>
    </Base>
  );
};
