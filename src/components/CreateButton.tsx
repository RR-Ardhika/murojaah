'use client';

import { useState } from 'react';
import { twJoin } from 'tailwind-merge';

const btnClass: Record<string, string> = {
  base: 'bg-white active:bg-cyan-300 border-2 text-teal border-teal rounded-full',
  main: 'relative right-1 w-16 h-16',
  mainLeft: 'left-[7px]',
  sub: 'p-2',
};

function showSubCreateButtons(): JSX.Element {
  return (
    <div className="flex flex-col gap-4">
      <button className={twJoin(btnClass.base, btnClass.sub)}>
        <span className="text-xl">Juz</span>
      </button>
      <button className={twJoin(btnClass.base, btnClass.sub)}>
        <span className="text-xl">Ayah</span>
      </button>
      <button className={twJoin(btnClass.base, btnClass.sub)}>
        <span className="text-xl">Surah</span>
      </button>
    </div>
  );
}

export const CreateButton = (): JSX.Element => {
  const [isShowSubButtons, setIsShowSubButtons] = useState<boolean>(false);

  function toggleShowSubButtons(): void {
    setIsShowSubButtons((isShowSubButtons: boolean) => !isShowSubButtons);
  }

  return (
    <div className="fixed bottom-16 right-4">
      <div className="flex flex-col gap-4">
        {isShowSubButtons && showSubCreateButtons()}
        <button
          className={twJoin(
            btnClass.base,
            btnClass.main,
            isShowSubButtons && btnClass.mainLeft
          )}
          onClick={() => toggleShowSubButtons()}
        >
          <span className="relative bottom-1 text-6xl font-extralight">+</span>
        </button>
      </div>
    </div>
  );
};
