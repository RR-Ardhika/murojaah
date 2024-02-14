import { Fragment } from 'react';
import { Transition, Dialog } from '@headlessui/react';

interface Props {
  showForm: boolean;
  setForm: Dispatch<SetStateAction<boolean>>;
}

export const Form = ({ showForm, setForm }: Props): JSX.Element => {
  const Title = (): JSX.Element => {
    return (
      <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
        Murojaah Juz
      </Dialog.Title>
    );
  };

  const Content = (): JSX.Element => {
    return (
      <div className="mt-2">
        <p className="text-sm text-gray-500">
          Your payment has been successfully submitted. We’ve sent you an email with all of the
          details of your order.
        </p>
      </div>
    );
  };

  const Buttons = (): JSX.Element => {
    return (
      <div className="flex flex-row-reverse gap-2 mt-4">
        <button
          type="button"
          className="px-6 py-2 bg-custom-teal hover:bg-teal-700 text-white rounded"
          onClick={() => setForm(false)}
        >
          Save
        </button>

        <button
          type="button"
          className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded"
          onClick={() => setForm(false)}
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
              <Dialog.Panel className="max-w-md rounded-2xl bg-white p-6 shadow-xl">
                <Title />

                <Content />

                <Buttons setForm={setForm} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
