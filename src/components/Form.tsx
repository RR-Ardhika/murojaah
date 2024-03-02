import { Dispatch, Fragment, useState, SetStateAction } from 'react';
import { Option, JuzOptions } from '@/api/module/murojaah/entity';
import { Create } from '@/api/module/murojaah/service';
import { useData } from '@/context/DataContext';
import { useAlert } from '@/context/AlertContext';
import { AlertColor, AlertText } from '@/components/Alert';
import { Transition, Dialog } from '@headlessui/react';
import Select from 'react-select';

interface Props {
  isFormVisible: boolean;
  setIsFormVisible: Dispatch<SetStateAction<boolean>>;
  setIsSubButtonsVisible: Dispatch<SetStateAction<boolean>>;
}

export const Form = ({
  isFormVisible,
  setIsFormVisible,
  setIsSubButtonsVisible,
}: Props): JSX.Element => {
  // @ts-expect-error useAlert
  const { showAlert } = useAlert();
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCancelConfirmationVisible, setIsCancelConfirmationVisible] = useState(false);
  const { fetchData } = useData();

  const Title = (): JSX.Element => {
    return (
      <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
        Create Juz Murojaah
      </Dialog.Title>
    );
  };

  const Content = (): JSX.Element => {
    // @ts-expect-error react-select component
    const selectStyle: StylesConfig = {
      // @ts-expect-error react-select component
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
            // @ts-expect-error react-select props
            onChange={setSelectedOption}
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
    async function save(): Promise<void> {
      if (!selectedOption) return;

      try {
        const payload: Option = selectedOption;
        setSelectedOption(null); // Prevent multiple click by disable the button
        await Create(payload);
        closeForm();
        setIsSubButtonsVisible(false);
        showAlert(AlertColor.Green, AlertText.SuccessCreatedMurojaah);
        fetchData();
      } catch (error) {
        showAlert(AlertColor.Red, AlertText.FailedCreatedMurojaah);
      }
    }

    function cancel(): void {
      if (selectedOption && !isCancelConfirmationVisible) {
        setIsCancelConfirmationVisible(true);
        setTimeout(() => {
          setIsCancelConfirmationVisible(false);
        }, 2000);
        return;
      }
      closeForm();
    }

    function closeForm(): void {
      setIsFormVisible(false);
      setTimeout(() => {
        setSelectedOption(null);
        setIsCancelConfirmationVisible(false);
      }, 500);
    }

    return (
      <div className="flex flex-row-reverse gap-2 mt-4">
        <button
          type="button"
          className="px-6 py-2 enabled:bg-custom-teal enabled:hover:bg-teal-700 disabled:bg-gray-400 text-white rounded"
          onClick={save}
          disabled={!selectedOption}
        >
          Save
        </button>

        {!isCancelConfirmationVisible ? (
          <button
            type="button"
            className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded"
            onClick={cancel}
          >
            Cancel
          </button>
        ) : (
          <button
            type="button"
            className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded"
            onClick={closeForm}
          >
            Confirm?
          </button>
        )}
      </div>
    );
  };

  return (
    <Transition appear show={isFormVisible} as={Fragment}>
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
