import { Dialog, Transition } from '@headlessui/react';
import { DateTime } from 'luxon';
import { Fragment } from 'react';

import { Base } from '@/shared/component/Base';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectDate: (date: string) => void;
}

export const GoToDateModal = ({
  isOpen,
  onClose,
  onSelectDate,
}: Props): React.JSX.Element => {
  const today: string = DateTime.now().toFormat('yyyy-MM-dd');

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedDate: string = e.target.value;
    if (selectedDate) {
      onSelectDate(selectedDate);
      onClose();
    }
  };

  return (
    <Base module="activity" name="GoToDateModal">
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-20" onClose={onClose}>
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
                <Dialog.Panel className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
                  <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
                    Go to Date
                  </Dialog.Title>
                  <input
                    type="date"
                    max={today}
                    onChange={handleDateChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-teal"
                    aria-label="Select date to navigate to"
                    autoFocus
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Base>
  );
};
