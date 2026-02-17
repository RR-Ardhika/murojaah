import { DateTime } from 'luxon';
import { Dispatch, useState, SetStateAction, useMemo } from 'react';

import { AlertColor, AlertText, Option, surah } from '@/shared/entity';
import { approachOptions } from '@/shared/service';
import { useAlertStore } from '@/shared/store';
import { formFormatDatetimes } from '@/shared/util';

import { SharedProps as Props } from '.';
import { Activity, ActivityType, Payload } from '../../entity';
import { create, update } from '../../service';
import { useFormStore } from '../../store';

interface InternalProps {
  formType: number;
  activity: Activity | undefined;
  setActivity: (value: Activity | undefined) => void;
  setIsFormVisible: (value: boolean) => void;
  setParentSurah: (value: Option[]) => void;
  showAlert: (color: number, text: string) => void;
  isCancelConfirmationVisible: boolean;
  setIsCancelConfirmationVisible: Dispatch<SetStateAction<boolean>>;
  disableSaveButton: boolean;
  setDisableSaveButton: Dispatch<SetStateAction<boolean>>;
}

const checkIsChanged = (
  formType: number,
  activity: Activity | undefined,
  selectedJuz: Option | undefined,
  selectedSurah: Option | Option[] | undefined
): boolean => {
  if (!activity) return true;

  switch (formType) {
    case ActivityType.Juz:
      if (!selectedJuz) return false;
      break;
    case ActivityType.Surah:
      if (!selectedSurah) return false;
      break;
    case ActivityType.Ayah:
      if (!selectedSurah) return false;
      break;
  }
  return true;
};

const checkIsSaveable = (
  formType: number,
  selectedJuz: Option | undefined,
  selectedSurah: Option | Option[] | undefined,
  startAyah: string,
  endAyah: string,
  startAyahError: string | null,
  endAyahError: string | null
): boolean => {
  switch (formType) {
    case ActivityType.Juz:
      if (!selectedJuz) return false;
      break;
    case ActivityType.Surah:
      if (!selectedSurah) return false;
      break;
    case ActivityType.Ayah:
      if (!selectedSurah) return false;

      const selectedSurahId: number | undefined = Array.isArray(selectedSurah)
        ? selectedSurah[0]?.value
        : selectedSurah?.value;
      const selectedSurahData: (typeof surah)[number] | undefined = surah.find(
        (s: (typeof surah)[number]) => s.id === selectedSurahId
      );
      const totalAyah: number = selectedSurahData?.totalAyah ?? 0;

      if (startAyahError || endAyahError) return false;

      const start: number = parseInt(startAyah, 10);
      const end: number = parseInt(endAyah, 10);

      if (isNaN(start) || isNaN(end)) return false;
      if (start < 1 || end < 1) return false;
      if (start > end) return false;

      if (totalAyah > 0) {
        if (start > totalAyah || end > totalAyah) return false;
      }
      break;
  }
  return true;
};

const buildPayload = (p: Props, i: InternalProps): Payload => {
  switch (i.formType) {
    case ActivityType.Juz:
      return buildJuzPayload(p, i);
    case ActivityType.Surah:
      return buildSurahPayload(p, i);
    case ActivityType.Ayah:
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
    occuredAt: buildOccuredAt(p, i),
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
    occuredAt: buildOccuredAt(p, i),
  };
};

const buildAyahPayload = (p: Props, i: InternalProps): Payload => {
  return {
    ...(i.activity?.id && { id: i.activity.id }),
    activityType: ActivityType.Ayah,
    surah: Array.isArray(p.selectedSurah) ? p.selectedSurah[0].value : p.selectedSurah?.value,
    startAyah: parseInt(p.startAyah),
    endAyah: parseInt(p.endAyah),
    markSurahDone: p.isSurahDone,
    markJuzDone: p.isJuzDone,
    approachId: p.selectedApproach.value,
    repeat: p.repeat,
    occuredAt: buildOccuredAt(p, i),
  };
};

const buildOccuredAt = (p: Props, i: InternalProps): Date => {
  for (const format of formFormatDatetimes) {
    let dt: DateTime = DateTime.fromFormat(p.occuredAt, format);

    if (dt.isValid) {
      if (i.activity && checkActivityEqualsDateTime(i.activity, dt)) {
        return i.activity.occuredAt;
      }

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

const checkActivityEqualsDateTime = (activity: Activity, dateTime: DateTime): boolean => {
  let parsedOccuredAt: DateTime = DateTime.fromJSDate(activity.occuredAt);
  parsedOccuredAt = parsedOccuredAt.set({
    second: 0,
    millisecond: 0,
  });

  return parsedOccuredAt.equals(dateTime);
};

const closeForm = (p: Props, i: InternalProps): void => {
  i.setIsFormVisible(false);
  setTimeout(() => {
    i.setActivity(undefined);
    i.setParentSurah([]);
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

const handleSave = async (p: Props, i: InternalProps, isSaveable: boolean): Promise<void> => {
  if (!isSaveable) return;

  try {
    i.setDisableSaveButton(true);
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

const handleCancel = (p: Props, i: InternalProps, isFormChanged: boolean): void => {
  if (isFormChanged && !i.isCancelConfirmationVisible) {
    i.setIsCancelConfirmationVisible(true);
    setTimeout(() => {
      i.setIsCancelConfirmationVisible(false);
    }, 2000);
    return;
  }
  closeForm(p, i);
};

export const Button = (p: Props): React.JSX.Element => {
  const [isCancelConfirmationVisible, setIsCancelConfirmationVisible] = useState(false);
  const [disableSaveButton, setDisableSaveButton] = useState(false);

  const { showAlert } = useAlertStore();
  const { activity, formType, setActivity, setIsFormVisible, setParentSurah } = useFormStore();

  const i: InternalProps = {
    formType,
    activity,
    setActivity,
    setIsFormVisible,
    setParentSurah,
    showAlert,
    isCancelConfirmationVisible,
    setIsCancelConfirmationVisible,
    disableSaveButton,
    setDisableSaveButton,
  };

  const isFormChanged: boolean = useMemo(
    () => checkIsChanged(formType, activity, p.selectedJuz, p.selectedSurah),
    [formType, activity, p.selectedJuz, p.selectedSurah]
  );

  const isSaveable: boolean = useMemo(
    () =>
      checkIsSaveable(
        formType,
        p.selectedJuz,
        p.selectedSurah,
        p.startAyah,
        p.endAyah,
        p.startAyahError,
        p.endAyahError
      ),
    [formType, p.selectedJuz, p.selectedSurah, p.startAyah, p.endAyah, p.startAyahError, p.endAyahError]
  );

  return (
    <div className="flex flex-row-reverse gap-2 mt-4">
      <button
        type="button"
        className="px-6 py-2 enabled:bg-custom-teal enabled:hover:bg-teal-700 disabled:bg-gray-400 text-white rounded"
        onClick={() => handleSave(p, i, isSaveable)}
        disabled={!isSaveable || disableSaveButton}
      >
        Save
      </button>

      {!isCancelConfirmationVisible ? (
        <button
          type="button"
          className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded"
          onClick={() => handleCancel(p, i, isFormChanged)}
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
