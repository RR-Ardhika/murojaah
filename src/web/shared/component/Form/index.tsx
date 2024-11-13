import { Transition, Dialog } from '@headlessui/react';
import { DateTime } from 'luxon';
import { Dispatch, Fragment, useEffect, useState, SetStateAction } from 'react';

import { approachOptions } from '@/api/module/approach/entity';
import { Option } from '@/api/shared/entity';
import { formFormatDatetimes } from '@/web/shared/util/datetime';

import { Button } from './Button';
import { Content } from './Content';
import { Title } from './Title';

interface Props {
  formType: string;
  isFormVisible: boolean;
  setIsFormVisible: Dispatch<SetStateAction<boolean>>;
  setIsSubButtonsVisible?: Dispatch<SetStateAction<boolean>>;
  parentSurah?: Option;
  // @ts-expect-error DataContextValues
  fetchData?: Context<DataContextValues>;
}

export interface SharedProps {
  formType: string;
  setIsFormVisible: Dispatch<SetStateAction<boolean>>;
  setIsSubButtonsVisible?: Dispatch<SetStateAction<boolean>>;
  // @ts-expect-error DataContextValues
  fetchData?: Context<DataContextValues>;
  selectedJuz: undefined;
  setSelectedJuz: Dispatch<SetStateAction<undefined>>;
  selectedSurah: undefined;
  setSelectedSurah: Dispatch<SetStateAction<undefined>>;
  selectedApproach: Option;
  setSelectedApproach: Dispatch<SetStateAction<Option>>;
  startAyah: string;
  setStartAyah: Dispatch<SetStateAction<string>>;
  endAyah: string;
  setEndAyah: Dispatch<SetStateAction<string>>;
  repeat: number;
  setRepeat: Dispatch<SetStateAction<number>>;
  isSurahDone: boolean;
  setIsSurahDone: Dispatch<SetStateAction<boolean>>;
  isJuzDone: boolean;
  setIsJuzDone: Dispatch<SetStateAction<boolean>>;
  occuredAt: string;
  setOccuredAt: Dispatch<SetStateAction<string>>;
}

export const Form = (p: Props): JSX.Element => {
  const [selectedJuz, setSelectedJuz] = useState(undefined);
  const [selectedSurah, setSelectedSurah] = useState(undefined);
  const [selectedApproach, setSelectedApproach] = useState(() => approachOptions()[0]);
  const [startAyah, setStartAyah] = useState('');
  const [endAyah, setEndAyah] = useState('');
  const [repeat, setRepeat] = useState(1);
  const [isSurahDone, setIsSurahDone] = useState(false);
  const [isJuzDone, setIsJuzDone] = useState(false);
  const [occuredAt, setOccuredAt] = useState('');

  useEffect(() => {
    setOccuredAt(DateTime.now().toFormat(formFormatDatetimes[0]));
  }, [p.isFormVisible]);

  useEffect(() => {
    // @ts-expect-error expected type
    if (p.parentSurah) setSelectedSurah(p.parentSurah);
  }, [p.parentSurah]);

  const sharedProps: SharedProps = {
    formType: p.formType,
    setIsFormVisible: p.setIsFormVisible,
    setIsSubButtonsVisible: p.setIsSubButtonsVisible,
    fetchData: p.fetchData,
    selectedJuz,
    setSelectedJuz,
    selectedSurah,
    setSelectedSurah,
    selectedApproach,
    setSelectedApproach,
    startAyah,
    setStartAyah,
    endAyah,
    setEndAyah,
    repeat,
    setRepeat,
    isSurahDone,
    setIsSurahDone,
    isJuzDone,
    setIsJuzDone,
    occuredAt,
    setOccuredAt,
  };

  return (
    <Transition appear show={p.isFormVisible} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                <Title formType={p.formType} />
                <Content {...sharedProps} />
                <Button {...sharedProps} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
