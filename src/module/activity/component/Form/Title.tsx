import { Dialog } from '@headlessui/react';

import { activityTypeLabel, ActivityType } from '../../entity';
import { useFormStore } from '../../store';

export const Title = (): React.JSX.Element => {
  const { formType, activity } = useFormStore();
  const label: string = activityTypeLabel[formType as ActivityType] ?? '';
  const action: string = activity ? 'Update' : 'Create';

  return (
    <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
      {action} {label} Murojaah
    </Dialog.Title>
  );
};
