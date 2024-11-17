import { clsx } from 'clsx';

import { useAlert } from '@/web/shared/context/AlertContext';

interface InternalProps {
  alertColor: number;
}

export enum AlertColor {
  Red = 0,
  Green = 1,
}

export enum AlertText {
  SuccessCreatedHistory = 'Successfully created new murojaah',
  SuccessDeletedHistory = 'Murojaah deleted',
  FailedCreatedHistory = 'Failed created new murojaah',
  FailedDeletedHistory = 'Failed deleted murojaah',
}

// TD-1 Utilize useMemo
const getBtnColor = (i: InternalProps): string => {
  switch (i.alertColor) {
    case AlertColor.Red:
      return 'bg-red-500';
    case AlertColor.Green:
      return 'bg-green-500';
    default:
      return 'bg-white';
  }
};

export const Alert = (): JSX.Element => {
  const { alertColor, alertText, isAlertVisible } = useAlert();

  if (!isAlertVisible) return <></>;

  const i: InternalProps = {
    alertColor,
  };

  return (
    <div className={clsx('fixed w-full mt-[72px] p-2 text-white text', getBtnColor(i))}>
      <div className="flex justify-between">
        <p>{alertText}</p>
      </div>
    </div>
  );
};
