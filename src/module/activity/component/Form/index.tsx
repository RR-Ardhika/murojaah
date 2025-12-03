import { Transition, Dialog } from '@headlessui/react';
import { DateTime } from 'luxon';
import { Dispatch, Fragment, useEffect, useMemo, useState, SetStateAction } from 'react';

import { Base } from '@/shared/component/Base';
import { Option } from '@/shared/entity';
import {
  approachOptions,
  getJuzOptionsFromJuzId,
  getSurahOptionsFromSurahId,
} from '@/shared/service';
import { formFormatDatetimes } from '@/shared/util';

import { Button } from './Button';
import { Content } from './Content';
import { Title } from './Title';
import { ActivityType } from '../../entity';
import { useFormStore } from '../../store';

interface Props {
  fetchData: () => Promise<void>;
}

export interface SharedProps {
  fetchData: () => Promise<void>;
  selectedJuz: Option | undefined;
  setSelectedJuz: Dispatch<SetStateAction<Option | undefined>>;
  selectedSurah: Option | Option[] | undefined;
  setSelectedSurah: Dispatch<SetStateAction<Option[] | undefined>>;
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

export const Form = (p: Props): React.JSX.Element => {
  const [selectedJuz, setSelectedJuz] = useState<Option>();
  const [selectedSurah, setSelectedSurah] = useState<Option[]>();
  const [selectedApproach, setSelectedApproach] = useState(() => approachOptions()[0]);
  const [startAyah, setStartAyah] = useState('');
  const [endAyah, setEndAyah] = useState('');
  const [repeat, setRepeat] = useState(1);
  const [isSurahDone, setIsSurahDone] = useState(false);
  const [isJuzDone, setIsJuzDone] = useState(false);
  const [occuredAt, setOccuredAt] = useState('');

  const { activity, isFormVisible, parentSurah } = useFormStore();

  useEffect(() => {
    if (isFormVisible) setOccuredAt(DateTime.now().toFormat(formFormatDatetimes[0]));
    if (parentSurah) setSelectedSurah(parentSurah);
    if (activity) {
      switch (activity.activityType) {
        case ActivityType.Juz:
          if (activity.juz) setSelectedJuz(getJuzOptionsFromJuzId(activity.juz));
          setSelectedApproach(approachOptions()[activity.approachId]);
          setOccuredAt(DateTime.fromJSDate(activity.occuredAt).toFormat(formFormatDatetimes[0]));
          break;
        case ActivityType.Surah:
          if (activity.surah) setSelectedSurah(getSurahOptionsFromSurahId(activity.surah));
          if (activity.markJuzDone) setIsJuzDone(activity.markJuzDone);
          setSelectedApproach(approachOptions()[activity.approachId]);
          setRepeat(activity.repeat);
          setOccuredAt(DateTime.fromJSDate(activity.occuredAt).toFormat(formFormatDatetimes[0]));
          break;
        case ActivityType.Ayah:
          if (activity.surah) setSelectedSurah(getSurahOptionsFromSurahId(activity.surah));
          if (activity.startAyah) setStartAyah(activity.startAyah.toString());
          if (activity.endAyah) setEndAyah(activity.endAyah.toString());
          if (activity.markSurahDone) setIsSurahDone(activity.markSurahDone);
          if (activity.markJuzDone) setIsJuzDone(activity.markJuzDone);
          setSelectedApproach(approachOptions()[activity.approachId]);
          setRepeat(activity.repeat);
          setOccuredAt(DateTime.fromJSDate(activity.occuredAt).toFormat(formFormatDatetimes[0]));
          break;
      }
    }
  }, [isFormVisible, parentSurah, activity]);

  const sharedProps: SharedProps = useMemo(
    () => ({
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
    }),
    [
      p.fetchData,
      selectedJuz,
      selectedSurah,
      selectedApproach,
      startAyah,
      endAyah,
      repeat,
      isSurahDone,
      isJuzDone,
      occuredAt,
    ]
  );

  return (
    <Base module="shared" name="Form">
      <Transition appear show={isFormVisible} as={Fragment}>
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
                  <Title />
                  <Content {...sharedProps} />
                  <Button {...sharedProps} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Base>
  );
};
