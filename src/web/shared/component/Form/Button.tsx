import { DateTime } from 'luxon';
import { Dispatch, useState, SetStateAction } from 'react';

import { approachOptions } from '@/api/module/approach/entity';
import { HistoryType, Payload } from '@/api/module/history/entity';
import { create } from '@/api/module/history/service';
import { Option } from '@/api/shared/entity';
import { AlertColor, AlertText } from '@/web/shared/component/Alert';
import { useAlert } from '@/web/shared/context/AlertContext';
import { formFormatDatetimes } from '@/web/shared/util/datetime';

interface Props {
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

const save = async (
  p: Props,
  // @ts-expect-error known type
  showAlert: Context<AlertContextValues>,
  setDisableSaveButton: Dispatch<SetStateAction<boolean>>,
  setIsCancelConfirmationVisible: Dispatch<SetStateAction<boolean>>
): Promise<void> => {
  if (!isSaveable(p)) return;

  try {
    setDisableSaveButton(true); // Prevent multiple click by disable the button
    await create(buildPayload(p));
    closeForm(p, setIsCancelConfirmationVisible);
    if (p.setIsSubButtonsVisible) p.setIsSubButtonsVisible(false);
    showAlert(AlertColor.Green, AlertText.SuccessCreatedHistory);
    p.fetchData();
    setDisableSaveButton(false);
  } catch (err) {
    setDisableSaveButton(false);
    console.error(err);
    showAlert(AlertColor.Red, AlertText.FailedCreatedHistory);
  }
};

const cancel = (
  p: Props,
  isCancelConfirmationVisible: boolean,
  setIsCancelConfirmationVisible: Dispatch<SetStateAction<boolean>>
): void => {
  if (isChanged(p) && !isCancelConfirmationVisible) {
    setIsCancelConfirmationVisible(true);
    setTimeout(() => {
      setIsCancelConfirmationVisible(false);
    }, 2000);
    return;
  }
  closeForm(p, setIsCancelConfirmationVisible);
};

const closeForm = (
  p: Props,
  setIsCancelConfirmationVisible: Dispatch<SetStateAction<boolean>>
): void => {
  p.setIsFormVisible(false);
  setTimeout(() => {
    p.setSelectedJuz(undefined);
    p.setSelectedSurah(undefined);
    p.setSelectedApproach(approachOptions()[0]);
    p.setRepeat(1);
    p.setIsSurahDone(false);
    p.setIsJuzDone(false);
    setIsCancelConfirmationVisible(false);
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
    occuredAt: getOccuredAt(p),
  };
};

const buildSurahPayload = (p: Props): Payload => {
  return {
    historyType: HistoryType.Surah,
    surahOptions: p.selectedSurah,
    markJuzDone: p.isJuzDone,
    approachId: p.selectedApproach.value,
    repeat: p.repeat,
    occuredAt: getOccuredAt(p),
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
    occuredAt: getOccuredAt(p),
  };
};

const getOccuredAt = (p: Props): Date => {
  for (const format of formFormatDatetimes) {
    const dt: DateTime = DateTime.fromFormat(p.occuredAt, format);
    if (dt.isValid) return dt.toJSDate();
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
  // @ts-expect-error useAlert
  const { showAlert } = useAlert();

  const [isCancelConfirmationVisible, setIsCancelConfirmationVisible] = useState(false);
  const [disableSaveButton, setDisableSaveButton] = useState(false);

  return (
    <div className="flex flex-row-reverse gap-2 mt-4">
      <button
        type="button"
        className="px-6 py-2 enabled:bg-custom-teal enabled:hover:bg-teal-700 disabled:bg-gray-400 text-white rounded"
        onClick={() => save(p, showAlert, setDisableSaveButton, setIsCancelConfirmationVisible)}
        disabled={!isSaveable(p) || disableSaveButton}
      >
        Save
      </button>

      {!isCancelConfirmationVisible ? (
        <button
          type="button"
          className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded"
          onClick={() => cancel(p, isCancelConfirmationVisible, setIsCancelConfirmationVisible)}
        >
          Cancel
        </button>
      ) : (
        <button
          type="button"
          className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded"
          onClick={() => closeForm(p, setIsCancelConfirmationVisible)}
        >
          Confirm?
        </button>
      )}
    </div>
  );
};
