'use client';

import { useState } from 'react';
import { clsx } from 'clsx';
import { Form } from '@/components/Form';

const btnClass: Record<string, string> = {
  base: 'bg-white active:bg-cyan-300 border-2 text-teal border-teal rounded-full',
  main: 'relative right-1 w-16 h-16',
  mainLeft: 'left-[7px]',
  sub: 'p-2',
};

function renderSubButtons(
  setForm: Dispatch<SetStateAction<boolean>>
): JSX.Element {
  return (
    <div className="flex flex-col gap-4">
      <button
        className={clsx(btnClass.base, btnClass.sub)}
        onClick={() => setForm(true)}
      >
        <span className="text-xl">Juz</span>
      </button>
      <button className={clsx(btnClass.base, btnClass.sub)}>
        <span className="text-xl">Ayah</span>
      </button>
      <button className={clsx(btnClass.base, btnClass.sub)}>
        <span className="text-xl">Surah</span>
      </button>
    </div>
  );
}

export const CreateButton = (): JSX.Element => {
  const [showSubButtons, setShowSubButtons] = useState(false);
  const [showForm, setForm] = useState(false);

  function toggleShowSubButtons(): void {
    setShowSubButtons((showSubButtons: boolean) => !showSubButtons);
  }

  return (
    <div className="fixed bottom-16 right-4">
      <div className="flex flex-col gap-4">
        {showSubButtons && renderSubButtons(setForm)}

        <button
          className={clsx(
            btnClass.base,
            btnClass.main,
            showSubButtons && btnClass.mainLeft
          )}
          onClick={() => toggleShowSubButtons()}
        >
          <span className="relative bottom-1 text-6xl font-extralight">+</span>
        </button>

        <Form showForm={showForm} setForm={setForm} />
      </div>
    </div>
  );
};
