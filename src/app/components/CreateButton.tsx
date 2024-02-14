'use client';

import { useState } from 'react';

const buttonClassnames: Record<string, string> = {
  sub: 'relative right-2 p-2 bg-white active:bg-cyan-300 border-2 text-teal border-teal rounded-full',
};

function showSubCreateButtons(): JSX.Element {
  return (
    <div className="flex flex-col gap-4">
      <button className={buttonClassnames.sub}>
        <span className="text-xl">Juz</span>
      </button>
      <button className={buttonClassnames.sub}>
        <span className="text-xl">Ayah</span>
      </button>
      <button className={buttonClassnames.sub}>
        <span className="text-xl">Surah</span>
      </button>
    </div>
  );
}

export default function CreateButton(): JSX.Element {
  const [isShowSubCreateButtons, setIsShowSubCreateButtons]: [
    boolean,
    Dispatch<SetStateAction<boolean>>,
  ] = useState<boolean>(false);

  function toggleShowSubCreateButtons(): void {
    setIsShowSubCreateButtons(
      (isShowSubCreateButtons: boolean) => !isShowSubCreateButtons
    );
  }

  return (
    <div className="fixed bottom-16 left-[280px]">
      <div className="flex flex-col gap-4">
        {isShowSubCreateButtons && showSubCreateButtons()}
        <button
          className="w-16 h-16 bg-white active:bg-cyan-300 border-2 text-teal border-teal rounded-full"
          onClick={() => toggleShowSubCreateButtons()}
        >
          <span className="relative bottom-1 text-6xl font-extralight">+</span>
        </button>
      </div>
    </div>
  );
}
