import { DateTime } from 'luxon';
import { Dispatch, useState, SetStateAction } from 'react';

import { HistoryType, Payload } from '@/module/activity/entity';
import { create } from '@/module/activity/service';
import { AlertColor, AlertText } from '@/shared/component/Alert';
import { useAlert } from '@/shared/context/AlertContext';
import { approachOptions } from '@/shared/service';
import { formFormatDatetimes } from '@/shared/util';

import { SharedProps as Props } from '.';

interface InternalProps {
  // @ts-expect-error useAlert
  showAlert: Context<AlertContextValues>;
  isCancelConfirmationVisible: boolean;
  setIsCancelConfirmationVisible: Dispatch<SetStateAction<boolean>>;
  disableSaveButton: boolean;
  setDisableSaveButton: Dispatch<SetStateAction<boolean>>;
}

const save = async (p: Props, i: InternalProps): Promise<void> => {
  if (!isSaveable(p)) return;

  try {
    i.setDisableSaveButton(true); // Prevent multiple click by disable the button
    await create(buildPayload(p));
    closeForm(p, i);
    if (p.setIsSubButtonsVisible) p.setIsSubButtonsVisible(false);
    i.showAlert(AlertColor.Green, AlertText.SuccessCreatedHistory);
    p.fetchData();
    i.setDisableSaveButton(false);
  } catch (err) {
    i.setDisableSaveButton(false);
    console.error(err);
    i.showAlert(AlertColor.Red, AlertText.FailedCreatedHistory);
  }
};

const cancel = (p: Props, i: InternalProps): void => {
  if (isChanged(p) && !i.isCancelConfirmationVisible) {
    i.setIsCancelConfirmationVisible(true);
    setTimeout(() => {
      i.setIsCancelConfirmationVisible(false);
    }, 2000);
    return;
  }
  closeForm(p, i);
};

const closeForm = (p: Props, i: InternalProps): void => {
  p.setIsFormVisible(false);
  setTimeout(() => {
    p.setSelectedJuz(undefined);
    p.setSelectedSurah(undefined);
    p.setSelectedApproach(approachOptions()[0]);
    p.setRepeat(1);
    p.setIsSurahDone(false);
    p.setIsJuzDone(false);
    i.setIsCancelConfirmationVisible(false);
  }, 500);
};

const buildPayload = (p: Props): Payload => {
  switch (p.formType) {
    case 'Juz':
      return buildJuzPayload(p);
    case 'Surah':
      return buildSurahPayload(p);
    case 'Ayah':
      return buildAyahPayload(p);
    default:
      // @ts-expect-error expected return value
      return undefined;
  }
};

const buildJuzPayload = (p: Props): Payload => {
  return {
    historyType: HistoryType.Juz,
    // @ts-expect-error handled undefined value
    juz: p.selectedJuz.value,
    approachId: p.selectedApproach.value,
    repeat: 1, // Hardcoded to 1 for juz
    occuredAt: buildOccuredAt(p),
  };
};

const buildSurahPayload = (p: Props): Payload => {
  return {
    historyType: HistoryType.Surah,
    surahOptions: p.selectedSurah,
    markJuzDone: p.isJuzDone,
    approachId: p.selectedApproach.value,
    repeat: p.repeat,
    occuredAt: buildOccuredAt(p),
  };
};

const buildAyahPayload = (p: Props): Payload => {
  return {
    historyType: HistoryType.Ayah,
    // @ts-expect-error handled undefined value
    surah: p.selectedSurah.value,
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
const isChanged = (p: Props): boolean => {
  switch (p.formType) {
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
const isSaveable = (p: Props): boolean => {
  switch (p.formType) {
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

export const Button = (p: Props): JSX.Element => {
  const { showAlert } = useAlert();

  const [isCancelConfirmationVisible, setIsCancelConfirmationVisible] = useState(false);
  const [disableSaveButton, setDisableSaveButton] = useState(false);

  const i: InternalProps = {
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
        disabled={!isSaveable(p) || disableSaveButton}
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
