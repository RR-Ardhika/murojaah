'use client';

import { useState } from 'react';
import { clsx } from 'clsx';
import { Form } from '@/components/Form';

export const CreateButton = (): JSX.Element => {
  const btnClass: Record<string, string> = {
    base: 'bg-white active:bg-teal-200 border-2 text-custom-teal border-custom-teal rounded-full',
    main: 'relative right-1 w-16 h-16',
    mainLeft: 'left-[7px]',
    sub: 'p-2',
  };

  const [isSubButtonsVisible, setIsSubButtonsVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  function toggleShowSubButtons(): void {
    setIsSubButtonsVisible((isSubButtonsVisible: boolean) => !isSubButtonsVisible);
  }

  function renderSubButtons(): JSX.Element {
    return (
      <div className="flex flex-col gap-4">
        <button
          className={clsx(btnClass.base, btnClass.sub)}
          onClick={() => setIsFormVisible(true)}
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

  return (
    <div className="fixed bottom-16 right-4">
      <div className="flex flex-col gap-4">
        {isSubButtonsVisible && renderSubButtons()}

        <button
          className={clsx(btnClass.base, btnClass.main, isSubButtonsVisible && btnClass.mainLeft)}
          onClick={() => toggleShowSubButtons()}
        >
          <span className="relative bottom-1 text-6xl font-extralight">+</span>
        </button>

        <Form
          isFormVisible={isFormVisible}
          setIsFormVisible={setIsFormVisible}
          setIsSubButtonsVisible={setIsSubButtonsVisible}
        />
      </div>
    </div>
  );
};
