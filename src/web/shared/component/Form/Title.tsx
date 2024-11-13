import { Dialog } from '@headlessui/react';

interface Props {
  formType: string;
}

export const Title = (p: Props): JSX.Element => {
  return (
    <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
      Create {p.formType} Murojaah
    </Dialog.Title>
  );
};
