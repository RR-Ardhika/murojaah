import { useEffect, useState } from 'react';
import Select, { StylesConfig, CSSObjectWithLabel } from 'react-select';

import { Option, surah, SurahType } from '@/shared/entity';
import { approachOptions, juzOptions, surahOptions } from '@/shared/service';

import { SharedProps as Props } from '.';
import { DateTimeInput } from './Input/DateTimeInput';
import { NumberInput } from './Input/NumberInput';
import { NumberStepper } from './Input/NumberStepper';
import { ActivityType } from '../../entity';
import { useFormStore } from '../../store';

const selectStyle: StylesConfig = {
  control: (base: CSSObjectWithLabel) => ({
    ...base,
    border: 0,
    boxShadow: 'none',
  }),
};

const JuzContent = (p: Props): React.JSX.Element => {
  return (
    <div className="flex flex-col gap-2 mt-2">
      <label className="font-light">Select Juz</label>
      <div className="border border-gray-300">
        <Select
          defaultValue={p.selectedJuz}
          // @ts-expect-error react-select props
          onChange={p.setSelectedJuz}
          options={juzOptions()}
          isSearchable={false}
          styles={selectStyle}
        />
      </div>

      <label className="font-light">Select Approach</label>
      <div className="border border-gray-300">
        <Select
          defaultValue={p.selectedApproach}
          // @ts-expect-error react-select props
          onChange={p.setSelectedApproach}
          options={approachOptions()}
          isSearchable={false}
          styles={selectStyle}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-light">Occured At</label>
        <DateTimeInput value={p.occuredAt} setValue={p.setOccuredAt} />
      </div>
    </div>
  );
};

const SurahContent = (p: Props): React.JSX.Element => {
  const [searchInput, setSearchInput] = useState('');
  const [surahMode, setSurahMode] = useState<'select' | 'range'>('select');
  const [startSurah, setStartSurah] = useState<Option | undefined>();
  const [endSurah, setEndSurah] = useState<Option | undefined>();
  const [lastChanged, setLastChanged] = useState<'start' | 'end' | null>(null);

  const { activity } = useFormStore();
  const isEditMode: boolean = !!activity;

  useEffect(() => {
    if (isEditMode) {
      setSurahMode('select');
    }
  }, [isEditMode]);

  useEffect(() => {
    if (surahMode === 'range' && startSurah && endSurah && startSurah.value <= endSurah.value) {
      const options: Option[] = surahOptions();
      const rangeOptions: Option[] = options.filter(
        (opt: Option) => opt.value >= startSurah.value && opt.value <= endSurah.value
      );

      const currentValues: number[] = Array.isArray(p.selectedSurah)
        ? p.selectedSurah.map((o: Option) => o.value).sort()
        : [];
      const newValues: number[] = rangeOptions.map((o: Option) => o.value).sort();

      if (JSON.stringify(currentValues) !== JSON.stringify(newValues)) {
        p.setSelectedSurah(rangeOptions.length > 0 ? rangeOptions : undefined);
      }
    }
  }, [surahMode, startSurah, endSurah, p]);

  const handleModeChange = (mode: 'select' | 'range'): void => {
    if (mode !== surahMode) {
      setSearchInput('');
      setSurahMode(mode);

      if (mode === 'range' && Array.isArray(p.selectedSurah) && p.selectedSurah.length > 0) {
        setStartSurah(p.selectedSurah[0]);
        setEndSurah(undefined);
      } else {
        p.setSelectedSurah(undefined);
        setStartSurah(undefined);
        setEndSurah(undefined);
      }
    }
  };

  const showRangeError: boolean =
    surahMode === 'range' &&
    startSurah !== undefined &&
    endSurah !== undefined &&
    startSurah.value > endSurah.value;

  const rangeErrorMessage: string =
    lastChanged === 'start' ? 'Start surah must be ≤ end surah' : 'End surah must be ≥ start surah';

  return (
    <div className="flex flex-col gap-2 mt-2">
      {!isEditMode && (
        <div className="flex gap-4">
          <label className="flex items-center gap-2 font-light cursor-pointer">
            <input
              type="radio"
              name="surahMode"
              value="select"
              checked={surahMode === 'select'}
              onChange={() => handleModeChange('select')}
              className="h-4 w-4"
            />
            Select
          </label>
          <label className="flex items-center gap-2 font-light cursor-pointer">
            <input
              type="radio"
              name="surahMode"
              value="range"
              checked={surahMode === 'range'}
              onChange={() => handleModeChange('range')}
              className="h-4 w-4"
            />
            Range
          </label>
        </div>
      )}

      {surahMode === 'select' && (
        <>
          <label className="font-light">Select Surah</label>
          <div className="border border-gray-300">
            <Select
              styles={selectStyle}
              tabIndex={-1}
              value={p.selectedSurah}
              inputValue={searchInput}
              options={surahOptions()}
              isSearchable={true}
              isMulti={activity ? false : true}
              isClearable={false}
              closeMenuOnSelect={false}
              blurInputOnSelect={false}
              // @ts-expect-error known type
              onChange={p.setSelectedSurah}
              // eslint-disable-next-line @typescript-eslint/typedef
              onInputChange={(value, action) => {
                if (action.action !== 'set-value') setSearchInput(value);
              }}
            />
          </div>
        </>
      )}

      {surahMode === 'range' && (
        <>
          <div className="flex gap-5">
            <div className="flex flex-col gap-2 flex-1">
              <label className="font-light">Start Surah</label>
              <div className="border border-gray-300">
                <Select
                  styles={selectStyle}
                  value={startSurah}
                  options={surahOptions()}
                  isSearchable={true}
                  // @ts-expect-error known type
                  onChange={(opt: Option) => {
                    setLastChanged('start');
                    setStartSurah(opt);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="font-light">End Surah</label>
              <div className="border border-gray-300">
                <Select
                  styles={selectStyle}
                  value={endSurah}
                  options={surahOptions()}
                  isSearchable={true}
                  // @ts-expect-error known type
                  onChange={(opt: Option) => {
                    setLastChanged('end');
                    setEndSurah(opt);
                  }}
                />
              </div>
            </div>
          </div>
          {showRangeError && <p className="text-red-500 text-sm">{rangeErrorMessage}</p>}
        </>
      )}

      <label className="font-light">Select Approach</label>
      <div className="border border-gray-300">
        <Select
          defaultValue={p.selectedApproach}
          // @ts-expect-error react-select props
          onChange={p.setSelectedApproach}
          options={approachOptions()}
          isSearchable={false}
          styles={selectStyle}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-light">Repeated Times</label>
        <NumberStepper value={p.repeat} setValue={p.setRepeat} />
      </div>

      <div className="flex gap-2">
        <label htmlFor="markJuzDone" className="font-light">
          Mark Juz Done
        </label>
        <input
          id="markJuzDone"
          className="h-5 w-5 mt-0.5"
          type="checkbox"
          checked={p.isJuzDone}
          onChange={() => p.setIsJuzDone(!p.isJuzDone)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-light">Occured At</label>
        <DateTimeInput value={p.occuredAt} setValue={p.setOccuredAt} />
      </div>
    </div>
  );
};

const AyahContent = (p: Props): React.JSX.Element => {
  const [lastChanged, setLastChanged] = useState<'start' | 'end' | null>(null);

  const selectedSurahId: number | undefined = Array.isArray(p.selectedSurah)
    ? p.selectedSurah[0]?.value
    : p.selectedSurah?.value;
  const selectedSurahData: SurahType | undefined = surah.find(
    (s: SurahType) => s.id === selectedSurahId
  );
  const maxAyah: number = selectedSurahData?.totalAyah ?? 0;

  const isValidationEnabled: boolean = maxAyah > 0;

  const startNum: number = parseInt(p.startAyah, 10);
  const endNum: number = parseInt(p.endAyah, 10);
  const showRangeError: boolean =
    !isNaN(startNum) && !isNaN(endNum) && startNum > endNum && !p.startAyahError && !p.endAyahError;

  const rangeErrorMessage: string =
    lastChanged === 'start' ? 'Start ayah must be ≤ end ayah' : 'End ayah must be ≥ start ayah';

  return (
    <div className="flex flex-col gap-2 mt-2">
      <label className="font-light">Select Surah</label>
      <div className="border border-gray-300">
        <Select
          defaultValue={p.selectedSurah}
          // @ts-expect-error react-select props
          onChange={p.setSelectedSurah}
          options={surahOptions()}
          isSearchable={true}
          styles={selectStyle}
        />
      </div>

      <label className="font-light">Select Approach</label>
      <div className="border border-gray-300">
        <Select
          defaultValue={p.selectedApproach}
          // @ts-expect-error react-select props
          onChange={p.setSelectedApproach}
          options={approachOptions()}
          isSearchable={false}
          styles={selectStyle}
        />
      </div>

      <div className="flex gap-5">
        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="startAyah" className="font-light">
            Start Ayah
          </label>
          <NumberInput
            id="startAyah"
            value={p.startAyah}
            setValue={(v: string) => {
              setLastChanged('start');
              p.setStartAyah(v);
            }}
            min={1}
            max={isValidationEnabled ? maxAyah : undefined}
            onError={p.setStartAyahError}
          />
        </div>

        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="endAyah" className="font-light">
            End Ayah
          </label>
          <NumberInput
            id="endAyah"
            value={p.endAyah}
            setValue={(v: string) => {
              setLastChanged('end');
              p.setEndAyah(v);
            }}
            min={1}
            max={isValidationEnabled ? maxAyah : undefined}
            onError={p.setEndAyahError}
          />
        </div>
      </div>

      {showRangeError && <p className="text-red-500 text-sm">{rangeErrorMessage}</p>}

      <label className="font-light">Repeated Times</label>
      <NumberStepper value={p.repeat} setValue={p.setRepeat} />

      <div className="grid grid-cols-2 grid-rows-2 gap-2">
        <label htmlFor="markSurahDone" className="font-light">
          Mark Surah Done
        </label>

        <input
          id="markSurahDone"
          className="h-5 w-5 mt-0.5"
          type="checkbox"
          checked={p.isSurahDone}
          onChange={() => p.setIsSurahDone(!p.isSurahDone)}
        />

        <label htmlFor="markJuzDone" className="font-light">
          Mark Juz Done
        </label>

        <input
          id="markJuzDone"
          className="h-5 w-5 mt-0.5"
          type="checkbox"
          checked={p.isJuzDone}
          onChange={() => p.setIsJuzDone(!p.isJuzDone)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-light">Occured At</label>
        <DateTimeInput value={p.occuredAt} setValue={p.setOccuredAt} />
      </div>
    </div>
  );
};

export const Content = (p: Props): React.JSX.Element => {
  const { formType } = useFormStore();

  switch (formType) {
    case ActivityType.Juz:
      return <JuzContent {...p} />;
    case ActivityType.Surah:
      return <SurahContent {...p} />;
    case ActivityType.Ayah:
      return <AyahContent {...p} />;
    default:
      return <></>;
  }
};
