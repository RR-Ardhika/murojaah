import { Fragment, useState, useEffect } from 'react';
import { JuzOptions } from '@/api/murojaah';
import { Transition, Dialog } from '@headlessui/react';
import Select from 'react-select';

interface Props {
  showForm: boolean;
  setShowForm: Dispatch<SetStateAction<boolean>>;
}

export const Form = ({ showForm, setShowForm }: Props): JSX.Element => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [disableSave, setDisableSave] = useState(true);

  useEffect(() => {
    if (showForm) {
      setSelectedOption(null);
      setDisableSave(true);
    }
  }, [showForm]);

  function setForm(option) {
    setSelectedOption(option);
    setDisableSave(false);
  }

  const Title = (): JSX.Element => {
    return (
      <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
        Create Juz Murojaah
      </Dialog.Title>
    );
  };

  const Content = (): JSX.Element => {
    const selectStyle: StylesConfig = {
      control: (base: CSSObjectWithLabel) => ({
        ...base,
        border: 0,
        boxShadow: 'none',
      }),
    };

    return (
      <div className="mt-2">
        <div className="border border-gray-300">
          <Select
            defaultValue={selectedOption}
            onChange={setForm}
            options={JuzOptions}
            placeholder={'Select Juz'}
            isSearchable={false}
            styles={selectStyle}
          />
        </div>
      </div>
    );
  };

  const Buttons = (): JSX.Element => {
    function save(): void {
      if (selectedOption) {
        console.log('saved'); // TODO Implement save callback
        closeForm();
      }
    }

    function cancel(): void {
      closeForm();
    }

    function closeForm(): void {
      setShowForm(false);
    }

    return (
      <div className="flex flex-row-reverse gap-2 mt-4">
        <button
          type="button"
          className="px-6 py-2 enabled:bg-custom-teal enabled:hover:bg-teal-700 disabled:bg-gray-400 text-white rounded"
          onClick={() => save()}
          disabled={disableSave}
        >
          Save
        </button>

        <button
          type="button"
          className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded"
          onClick={() => cancel()}
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
