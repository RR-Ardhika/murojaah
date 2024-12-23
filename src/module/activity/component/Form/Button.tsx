import { DateTime } from 'luxon';
import { Dispatch, useState, SetStateAction } from 'react';

import { AlertColor, AlertText } from '@/shared/entity';
import { approachOptions } from '@/shared/service';
import { useAlertStore } from '@/shared/store';
import { formFormatDatetimes } from '@/shared/util';

import { SharedProps as Props } from '.';
import { Activity, ActivityType, Payload } from '../../entity';
import { create, update } from '../../service';
import { useFormStore } from '../../store';

interface InternalProps {
  formType: string;
  activity: Activity | undefined;
  setActivity: (value: Activity | undefined) => void;
  setIsFormVisible: (value: boolean) => void;
  showAlert: (color: number, text: string) => void;
  isCancelConfirmationVisible: boolean;
  setIsCancelConfirmationVisible: Dispatch<SetStateAction<boolean>>;
  disableSaveButton: boolean;
  setDisableSaveButton: Dispatch<SetStateAction<boolean>>;
}

const save = async (p: Props, i: InternalProps): Promise<void> => {
  if (!isSaveable(p, i)) return;

  try {
    i.setDisableSaveButton(true); // Prevent multiple click by disable the button
    if (i.activity) await update(buildPayload(p, i));
    else await create(buildPayload(p, i));
    closeForm(p, i);
    if (i.activity) i.showAlert(AlertColor.Green, AlertText.SuccessUpdatedActivity);
    else i.showAlert(AlertColor.Green, AlertText.SuccessCreatedActivity);
    p.fetchData();
    i.setDisableSaveButton(false);
  } catch (err) {
    i.setDisableSaveButton(false);
    console.error(err);
    i.showAlert(AlertColor.Red, AlertText.FailedCreatedActivity);
  }
};

const cancel = (p: Props, i: InternalProps): void => {
  if (isChanged(p, i) && !i.isCancelConfirmationVisible) {
    i.setIsCancelConfirmationVisible(true);
    setTimeout(() => {
      i.setIsCancelConfirmationVisible(false);
    }, 2000);
    return;
  }
  closeForm(p, i);
};

const closeForm = (p: Props, i: InternalProps): void => {
  i.setIsFormVisible(false);
  setTimeout(() => {
    i.setActivity(undefined);
    p.setSelectedJuz(undefined);
    p.setSelectedSurah(undefined);
    p.setSelectedApproach(approachOptions()[0]);
    p.setStartAyah('');
    p.setEndAyah('');
    p.setRepeat(1);
    p.setIsSurahDone(false);
    p.setIsJuzDone(false);
    i.setIsCancelConfirmationVisible(false);
  }, 500);
};

const buildPayload = (p: Props, i: InternalProps): Payload => {
  switch (i.formType) {
    case 'Juz':
      return buildJuzPayload(p, i);
    case 'Surah':
      return buildSurahPayload(p, i);
    case 'Ayah':
      return buildAyahPayload(p, i);
    default:
      // @ts-expect-error expected return value
      return undefined;
  }
};

const buildJuzPayload = (p: Props, i: InternalProps): Payload => {
  return {
    ...(i.activity?.id && { id: i.activity.id }),
    activityType: ActivityType.Juz,
    ...(p.selectedJuz?.value && { juz: p.selectedJuz.value }),
    approachId: p.selectedApproach.value,
    repeat: 1, // Hardcoded to 1 for juz
    occuredAt: buildOccuredAt(p),
  };
};

const buildSurahPayload = (p: Props, i: InternalProps): Payload => {
  return {
    ...(i.activity?.id && { id: i.activity.id }),
    activityType: ActivityType.Surah,
    ...(i.activity?.surah && {
      surah: Array.isArray(p.selectedSurah) ? p.selectedSurah[0].value : p.selectedSurah?.value,
    }),
    ...(Array.isArray(p.selectedSurah) && { surahOptions: p.selectedSurah }),
    markJuzDone: p.isJuzDone,
    approachId: p.selectedApproach.value,
    repeat: p.repeat,
    occuredAt: buildOccuredAt(p),
  };
};

const buildAyahPayload = (p: Props, i: InternalProps): Payload => {
  return {
    ...(i.activity?.id && { id: i.activity.id }),
    activityType: ActivityType.Ayah,
    ...(!Array.isArray(p.selectedSurah) && { surah: p.selectedSurah?.value }),
    startAyah: parseInt(p.startAyah),
    endAyah: parseInt(p.endAyah),
    markSurahDone: p.isSurahDone,
    markJuzDone: p.isJuzDone,
    approachId: p.selectedApproach.value,
    repeat: p.repeat,
    occuredAt: buildOccuredAt(p),
  };
};

const buildOccuredAt = (p: Props): Date => {
  for (const format of formFormatDatetimes) {
    let dt: DateTime = DateTime.fromFormat(p.occuredAt, format);

    if (dt.isValid) {
      const now: DateTime = DateTime.now();
      dt = dt.set({
        second: now.second,
        millisecond: now.millisecond,
      });

      return dt.toJSDate();
    }
  }

  throw new Error('Invalid DateTime');
};

// TD-1 Utilize useMemo
const isChanged = (p: Props, i: InternalProps): boolean => {
  switch (i.formType) {
    case 'Juz':
      if (!p.selectedJuz) return false;
      break;
    case 'Surah':
      if (!p.selectedSurah) return false;
      break;
    case 'Ayah':
      // TD-3 Implement proper number input for ayah
      if (!p.selectedSurah) return false;
      break;
  }
  return true;
};

// TD-1 Utilize useMemo
const isSaveable = (p: Props, i: InternalProps): boolean => {
  switch (i.formType) {
    case 'Juz':
      if (!p.selectedJuz) return false;
      break;
    case 'Surah':
      if (!p.selectedSurah) return false;
      break;
    case 'Ayah':
      // TD-3 Implement proper number input for ayah
      if (!p.selectedSurah) return false;
      break;
  }
  return true;
};

export const Button = (p: Props): React.JSX.Element => {
  const [isCancelConfirmationVisible, setIsCancelConfirmationVisible] = useState(false);
  const [disableSaveButton, setDisableSaveButton] = useState(false);

  const { showAlert } = useAlertStore();
  const { activity, setActivity, setIsFormVisible, formType } = useFormStore();

  const i: InternalProps = {
    formType,
    activity,
    setActivity,
    setIsFormVisible,
    showAlert,
    isCancelConfirmationVisible,
    setIsCancelConfirmationVisible,
    disableSaveButton,
    setDisableSaveButton,
  };

  return (
    <div className="flex flex-row-reverse gap-2 mt-4">
      <button
        type="button"
        className="px-6 py-2 enabled:bg-custom-teal enabled:hover:bg-teal-700 disabled:bg-gray-400 text-white rounded"
        onClick={() => save(p, i)}
        disabled={!isSaveable(p, i) || disableSaveButton}
      >
        Save
      </button>

      {!isCancelConfirmationVisible ? (
        <button
          type="button"
          className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded"
          onClick={() => cancel(p, i)}
        >
          Cancel
        </button>
      ) : (
        <button
          type="button"
          className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded"
          onClick={() => closeForm(p, i)}
        >
          Confirm?
        </button>
      )}
    </div>
  );
};
