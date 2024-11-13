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
                <Content
                  formType={p.formType}
                  selectedJuz={selectedJuz}
                  setSelectedJuz={setSelectedJuz}
                  selectedSurah={selectedSurah}
                  setSelectedSurah={setSelectedSurah}
                  selectedApproach={selectedApproach}
                  setSelectedApproach={setSelectedApproach}
                  startAyah={startAyah}
                  setStartAyah={setStartAyah}
                  endAyah={endAyah}
                  setEndAyah={setEndAyah}
                  repeat={repeat}
                  setRepeat={setRepeat}
                  isSurahDone={isSurahDone}
                  setIsSurahDone={setIsSurahDone}
                  isJuzDone={isJuzDone}
                  setIsJuzDone={setIsJuzDone}
                  occuredAt={occuredAt}
                  setOccuredAt={setOccuredAt}
                />
                <Button
                  formType={p.formType}
                  setIsFormVisible={p.setIsFormVisible}
                  setIsSubButtonsVisible={p.setIsSubButtonsVisible}
                  fetchData={p.fetchData}
                  selectedJuz={selectedJuz}
                  setSelectedJuz={setSelectedJuz}
                  selectedSurah={selectedSurah}
                  setSelectedSurah={setSelectedSurah}
                  selectedApproach={selectedApproach}
                  setSelectedApproach={setSelectedApproach}
                  startAyah={startAyah}
                  setStartAyah={setStartAyah}
                  endAyah={endAyah}
                  setEndAyah={setEndAyah}
                  repeat={repeat}
                  setRepeat={setRepeat}
                  isSurahDone={isSurahDone}
                  setIsSurahDone={setIsSurahDone}
                  isJuzDone={isJuzDone}
                  setIsJuzDone={setIsJuzDone}
                  occuredAt={occuredAt}
                  setOccuredAt={setOccuredAt}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
