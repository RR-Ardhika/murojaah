'use client';

import { useState } from 'react';

const buttonClassnames: Record<string, string> = {
  button:
    'relative right-1 w-16 h-16 bg-white active:bg-cyan-300 border-2 text-teal border-teal rounded-full',
  subButton:
    'p-2 bg-white active:bg-cyan-300 border-2 text-teal border-teal rounded-full',
};

function showSubCreateButtons(): JSX.Element {
  return (
    <div className="flex flex-col gap-4">
      <button className={buttonClassnames.subButton}>
        <span className="text-xl">Juz</span>
      </button>
      <button className={buttonClassnames.subButton}>
        <span className="text-xl">Ayah</span>
      </button>
      <button className={buttonClassnames.subButton}>
        <span className="text-xl">Surah</span>
      </button>
    </div>
  );
}

export default function CreateButton(): JSX.Element {
  const [isShowSubButtons, setIsShowSubButtons]: [
    boolean,
    Dispatch<SetStateAction<boolean>>,
  ] = useState<boolean>(false);

  const createButtonClass: string = isShowSubButtons
    ? buttonClassnames.button + ' left-[7px]'
    : buttonClassnames.button;

  function toggleShowSubButtons(): void {
    setIsShowSubButtons((isShowSubButtons: boolean) => !isShowSubButtons);
  }

  return (
    <div className="fixed bottom-16 right-4">
      <div className="flex flex-col gap-4">
        {isShowSubButtons && showSubCreateButtons()}
        <button
          className={createButtonClass}
          onClick={() => toggleShowSubButtons()}
        >
          <span className="relative bottom-1 text-6xl font-extralight">+</span>
        </button>
      </div>
    </div>
  );
}
