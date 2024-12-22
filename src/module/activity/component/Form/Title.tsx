import { Dialog } from '@headlessui/react';

import { useFormStore } from '../../store';

export const Title = (): React.JSX.Element => {
  const { formType } = useFormStore();

  return (
    <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
      Create {formType} Murojaah
    </Dialog.Title>
  );
};
