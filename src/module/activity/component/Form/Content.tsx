import { useState } from 'react';
import Select, { StylesConfig, CSSObjectWithLabel } from 'react-select';

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

  const { activity } = useFormStore();

  return (
    <div className="flex flex-col gap-2 mt-2">
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
        <div className="flex flex-col gap-2">
          <label className="font-light">Start Ayah</label>
          <NumberInput value={p.startAyah} setValue={p.setStartAyah} />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-light">End Ayah</label>
          <NumberInput value={p.endAyah} setValue={p.setEndAyah} />
        </div>
      </div>

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
