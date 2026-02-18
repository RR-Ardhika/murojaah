import { ArrowRightCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

import { Base } from '@/shared/component/Base';
import { useGoToDateStore } from '@/shared/store';

import { GoToDateModal } from './GoToDateModal';

const CLASS_NAMES: Record<string, string> = {
  button:
    'bg-white active:bg-teal-200 border-2 text-custom-teal border-custom-teal rounded-full w-16 h-16 flex items-center justify-center',
};

export const GoToDateButton = (): React.JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { setCurrentDate } = useGoToDateStore();

  const handleSelectDate = (date: string): void => {
    setCurrentDate(date);
  };

  return (
    <Base module="activity" name="GoToDateButton">
      <div className="fixed bottom-16 right-4">
        <button
          className={CLASS_NAMES.button}
          onClick={(): void => setIsModalOpen(true)}
          aria-label="Go to date"
        >
          <ArrowRightCircleIcon className="size-10" />
        </button>
      </div>
      <GoToDateModal
        isOpen={isModalOpen}
        onClose={(): void => setIsModalOpen(false)}
        onSelectDate={handleSelectDate}
      />
    </Base>
  );
};
