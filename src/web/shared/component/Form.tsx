import { Dispatch, Fragment, useEffect, useState, SetStateAction } from 'react';
import { Option, JuzOptions, SurahOptions } from '@/api/shared/entity';
import { HistoryType, Payload } from '@/api/module/history/entity';
import { ApproachOptions } from '@/api/module/approach/entity';
import { Create } from '@/api/module/history/service';
import { useAlert } from '@/web/shared/context/AlertContext';
import { formFormatDatetimes } from '@/web/shared/util/datetime';
import { AlertColor, AlertText } from '@/web/shared/component/Alert';
import { Transition, Dialog } from '@headlessui/react';
import { DateTime } from 'luxon';
import { clsx } from 'clsx';
import Select from 'react-select';

interface Props {
  formType: string;
  isFormVisible: boolean;
  setIsFormVisible: Dispatch<SetStateAction<boolean>>;
  setIsSubButtonsVisible?: Dispatch<SetStateAction<boolean>>;
  parentSurah?: Option;
  // @ts-expect-error DataContextValues
  fetchData?: Context<DataContextValues>;
}

const Form = ({
  formType,
  isFormVisible,
  setIsFormVisible,
  setIsSubButtonsVisible,
  parentSurah,
  fetchData,
}: Props): JSX.Element => {
  // @ts-expect-error useAlert
  const { showAlert } = useAlert();

  const [isCancelConfirmationVisible, setIsCancelConfirmationVisible] = useState(false);
  const [disableSaveButton, setDisableSaveButton] = useState(false);

  const [searchInput, setSearchInput] = useState('');
  const [selectedJuz, setSelectedJuz] = useState(undefined);
  const [selectedSurah, setSelectedSurah] = useState(undefined);
  const [selectedApproach, setSelectedApproach] = useState(ApproachOptions()[0]);
  const [startAyah, setStartAyah] = useState(undefined);
  const [endAyah, setEndAyah] = useState(undefined);
  const [repeat, setRepeat] = useState(1);
  const [isSurahDone, setIsSurahDone] = useState(false);
  const [isJuzDone, setIsJuzDone] = useState(false);
  const [occuredAt, setOccuredAt] = useState('');

  // @ts-expect-error react-select component
  const selectStyle: StylesConfig = {
    // @ts-expect-error react-select component
    control: (base: CSSObjectWithLabel) => ({
      ...base,
      border: 0,
      boxShadow: 'none',
    }),
  };

  useEffect(() => {
    setOccuredAt(DateTime.now().toFormat(formFormatDatetimes[0]));
  }, [isFormVisible]);

  useEffect(() => {
    // @ts-expect-error expected type
    if (parentSurah) setSelectedSurah(parentSurah);
  }, [parentSurah]);

  const Title = (): JSX.Element => {
    return (
      <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
        Create {formType} Murojaah
      </Dialog.Title>
    );
  };

  function juzContent(): JSX.Element {
    return (
      <div className="flex flex-col gap-2 mt-2">
        <label className="font-light">Select Juz</label>
        <div className="border border-gray-300">
          <Select
            defaultValue={selectedJuz}
            // @ts-expect-error react-select props
            onChange={setSelectedJuz}
            options={JuzOptions()}
            isSearchable={false}
            styles={selectStyle}
          />
        </div>

        <label className="font-light">Select Approach</label>
        <div className="border border-gray-300">
          <Select
            defaultValue={selectedApproach}
            // @ts-expect-error react-select props
            onChange={setSelectedApproach}
            options={ApproachOptions()}
            isSearchable={false}
            styles={selectStyle}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-light">Occured At</label>
          {occuredAtInput(occuredAt, setOccuredAt)}
        </div>
      </div>
    );
  }

  function surahContent(): JSX.Element {
    return (
      <div className="flex flex-col gap-2 mt-2">
        <label className="font-light">Select Surah</label>
        <div className="border border-gray-300">
          <Select
            styles={selectStyle}
            value={selectedSurah}
            inputValue={searchInput}
            options={SurahOptions()}
            isSearchable={true}
            isMulti={true}
            isClearable={false}
            closeMenuOnSelect={false}
            blurInputOnSelect={false}
            // @ts-expect-error known type
            onChange={setSelectedSurah}
            // eslint-disable-next-line @typescript-eslint/typedef
            onInputChange={(value, action) => {
              if (action.action !== 'set-value') setSearchInput(value);
            }}
          />
        </div>

        <label className="font-light">Select Approach</label>
        <div className="border border-gray-300">
          <Select
            defaultValue={selectedApproach}
            // @ts-expect-error react-select props
            onChange={setSelectedApproach}
            options={ApproachOptions()}
            isSearchable={false}
            styles={selectStyle}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-light">Repeated Times</label>
          <NumberStepper value={repeat} setValue={setRepeat} />
        </div>

        <div className="flex gap-2">
          <label htmlFor="markJuzDone" className="font-light">
            Mark Juz Done
          </label>
          <input
            id="markJuzDone"
            className="h-5 w-5 mt-0.5"
            type="checkbox"
            checked={isJuzDone}
            onChange={() => setIsJuzDone(!isJuzDone)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-light">Occured At</label>
          {occuredAtInput(occuredAt, setOccuredAt)}
        </div>
      </div>
    );
  }

  function ayahContent(): JSX.Element {
    return (
      <div className="flex flex-col gap-2 mt-2">
        <label className="font-light">Select Surah</label>
        <div className="border border-gray-300">
          <Select
            defaultValue={selectedSurah}
            // @ts-expect-error react-select props
            onChange={setSelectedSurah}
            options={SurahOptions()}
            isSearchable={true}
            styles={selectStyle}
          />
        </div>

        <label className="font-light">Select Approach</label>
        <div className="border border-gray-300">
          <Select
            defaultValue={selectedApproach}
            // @ts-expect-error react-select props
            onChange={setSelectedApproach}
            options={ApproachOptions()}
            isSearchable={false}
            styles={selectStyle}
          />
        </div>

        <div className="flex gap-5">
          <div className="flex flex-col gap-2">
            <label className="font-light">Start Ayah</label>
            {numberInput(startAyah, setStartAyah)}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-light">End Ayah</label>
            {numberInput(endAyah, setEndAyah)}
          </div>
        </div>

        <label className="font-light">Repeated Times</label>
        <NumberStepper value={repeat} setValue={setRepeat} />

        <div className="grid grid-cols-2 grid-rows-2 gap-2">
          <label htmlFor="markSurahDone" className="font-light">
            Mark Surah Done
          </label>

          <input
            id="markSurahDone"
            className="h-5 w-5 mt-0.5"
            type="checkbox"
            checked={isSurahDone}
            onChange={() => setIsSurahDone(!isSurahDone)}
          />

          <label htmlFor="markJuzDone" className="font-light">
            Mark Juz Done
          </label>

          <input
            id="markJuzDone"
            className="h-5 w-5 mt-0.5"
            type="checkbox"
            checked={isJuzDone}
            onChange={() => setIsJuzDone(!isJuzDone)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-light">Occured At</label>
          {occuredAtInput(occuredAt, setOccuredAt)}
        </div>
      </div>
    );
  }

  // @ts-expect-error known types
  // eslint-disable-next-line @typescript-eslint/typedef
  function numberInput(value, setValue): JSX.Element {
    // TD-3 Implement proper number input for ayah
    return (
      <div>
        <input
          className="w-full px-2 py-1 border border-gray-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          type="number"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        />
      </div>
    );
  }

  // @ts-expect-error known types
  // eslint-disable-next-line @typescript-eslint/typedef
  function occuredAtInput(value, setValue): JSX.Element {
    return (
      <div>
        <input
          className="w-full px-2 py-1 border border-gray-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          type="text"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        />
      </div>
    );
  }

  // @ts-expect-error known types
  // eslint-disable-next-line @typescript-eslint/typedef
  const NumberStepper = ({ value, setValue }): JSX.Element => {
    const baseClass: string = 'border px-4 py-2';
    const txtClass: string = 'bg-gray-100';

    function increase(): void {
      setValue(value + 1);
    }

    function decrease(): void {
      if (value - 1 < 1) return;
      setValue(value - 1);
    }

    return (
      <div className="flex">
        <button className={baseClass} onClick={decrease}>
          -
        </button>
        <p className={clsx(baseClass, txtClass)}>{value}</p>
        <button className={baseClass} onClick={increase}>
          +
        </button>
      </div>
    );
  };

  const Buttons = (): JSX.Element => {
    async function save(): Promise<void> {
      if (!isSaveable()) return;

      try {
        setDisableSaveButton(true); // Prevent multiple click by disable the button
        await Create(buildPayload());
        closeForm();
        if (setIsSubButtonsVisible) setIsSubButtonsVisible(false);
        showAlert(AlertColor.Green, AlertText.SuccessCreatedHistory);
        fetchData();
        setDisableSaveButton(false);
      } catch (err) {
        setDisableSaveButton(false);
        console.error(err);
        showAlert(AlertColor.Red, AlertText.FailedCreatedHistory);
      }
    }

    function cancel(): void {
      if (isChanged() && !isCancelConfirmationVisible) {
        setIsCancelConfirmationVisible(true);
        setTimeout(() => {
          setIsCancelConfirmationVisible(false);
        }, 2000);
        return;
      }
      closeForm();
    }

    function closeForm(): void {
      setIsFormVisible(false);
      setTimeout(() => {
        setSelectedJuz(undefined);
        setSelectedSurah(undefined);
        setSelectedApproach(ApproachOptions()[0]);
        setRepeat(1);
        setIsSurahDone(false);
        setIsJuzDone(false);
        setIsCancelConfirmationVisible(false);
      }, 500);
    }

    function buildPayload(): Payload {
      switch (formType) {
        case 'Juz':
          return buildJuzPayload();
        case 'Surah':
          return buildSurahPayload();
        case 'Ayah':
          return buildAyahPayload();
        default:
          // @ts-expect-error expected return value
          return undefined;
      }
    }

    function buildJuzPayload(): Payload {
      return {
        historyType: HistoryType.Juz,
        // @ts-expect-error handled undefined value
        juz: selectedJuz.value,
        approachId: selectedApproach.value,
        repeat: 1, // Hardcoded to 1 for juz
        occuredAt: getOccuredAt(),
      };
    }

    function buildSurahPayload(): Payload {
      return {
        historyType: HistoryType.Surah,
        surahOptions: selectedSurah,
        markJuzDone: isJuzDone,
        approachId: selectedApproach.value,
        repeat: repeat,
        occuredAt: getOccuredAt(),
      };
    }

    function buildAyahPayload(): Payload {
      return {
        historyType: HistoryType.Ayah,
        // @ts-expect-error handled undefined value
        surah: selectedSurah.value,
        // @ts-expect-error handled undefined value
        surahName: selectedSurah.label,
        // @ts-expect-error handled undefined value
        startAyah: parseInt(startAyah),
        // @ts-expect-error handled undefined value
        endAyah: parseInt(endAyah),
        markSurahDone: isSurahDone,
        markJuzDone: isJuzDone,
        approachId: selectedApproach.value,
        repeat: repeat,
        occuredAt: getOccuredAt(),
      };
    }

    function getOccuredAt(): Date {
      for (const format of formFormatDatetimes) {
        const dt: DateTime = DateTime.fromFormat(occuredAt, format);
        if (dt.isValid) return dt.toJSDate();
      }
      throw new Error('Invalid DateTime');
    }

    // TD-1 Utilize useMemo
    function isChanged(): boolean {
      switch (formType) {
        case 'Juz':
          if (!selectedJuz) return false;
          break;
        case 'Surah':
          if (!selectedSurah) return false;
          break;
        case 'Ayah':
          // TD-3 Implement proper number input for ayah
          if (!selectedSurah) return false;
          break;
      }
      return true;
    }

    // TD-1 Utilize useMemo
    function isSaveable(): boolean {
      switch (formType) {
        case 'Juz':
          if (!selectedJuz) return false;
          break;
        case 'Surah':
          if (!selectedSurah) return false;
          break;
        case 'Ayah':
          // TD-3 Implement proper number input for ayah
          if (!selectedSurah) return false;
          break;
      }
      return true;
    }

    return (
      <div className="flex flex-row-reverse gap-2 mt-4">
        <button
          type="button"
          className="px-6 py-2 enabled:bg-custom-teal enabled:hover:bg-teal-700 disabled:bg-gray-400 text-white rounded"
          onClick={save}
          disabled={!isSaveable() || disableSaveButton}
        >
          Save
        </button>

        {!isCancelConfirmationVisible ? (
          <button
            type="button"
            className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded"
            onClick={cancel}
          >
            Cancel
          </button>
        ) : (
          <button
            type="button"
            className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded"
            onClick={closeForm}
          >
            Confirm?
          </button>
        )}
      </div>
    );
  };

  function renderContent(): JSX.Element {
    switch (formType) {
      case 'Juz':
        return juzContent();
      case 'Surah':
        return surahContent();
      case 'Ayah':
        return ayahContent();
      default:
        return <></>;
    }
  }

  return (
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
                {renderContent()}
                <Buttons />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Form;
