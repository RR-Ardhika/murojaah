import { Fragment, useState } from 'react';
import { JuzOptions } from '@/api/murojaah';
import { Transition, Dialog } from '@headlessui/react';
import Select from 'react-select';

interface Props {
  showForm: boolean;
  setShowForm: Dispatch<SetStateAction<boolean>>;
}

export const Form = ({ showForm, setShowForm }: Props): JSX.Element => {
  const Title = (): JSX.Element => {
    return (
      <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
        Create Murojaah
      </Dialog.Title>
    );
  };

  const Content = (): JSX.Element => {
    const [selectedOption, setSelectedOption] = useState(null);

    return (
      <div className="mt-2">
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={JuzOptions}
          placeholder={'Select Juz'}
          isSearchable={false}
        />
      </div>
    );
  };

  const Buttons = (): JSX.Element => {
    return (
      <div className="flex flex-row-reverse gap-2 mt-4">
        <button
          type="button"
          className="px-6 py-2 bg-custom-teal hover:bg-teal-700 text-white rounded"
          onClick={() => setShowForm(false)}
        >
          Save
        </button>

        <button
          type="button"
          className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded"
          onClick={() => setShowForm(false)}
        >
          Cancel
        </button>
      </div>
    );
  };

  return (
    <Transition appear show={showForm} as={Fragment}>
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
                <Content />
                <Buttons />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
