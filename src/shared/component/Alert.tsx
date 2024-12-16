import { clsx } from 'clsx';

import { Base } from '@/shared/component/Base';
import { useAlert } from '@/shared/context/AlertContext';

export enum AlertColor {
  Red = 0,
  Green = 1,
}

export enum AlertText {
  SuccessCreatedActivity = 'Successfully created new murojaah',
  SuccessDeletedActivity = 'Murojaah deleted',
  FailedCreatedActivity = 'Failed created new murojaah',
  FailedDeletedActivity = 'Failed deleted murojaah',
}

interface InternalProps {
  alertColor: number;
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
    <Base module="shared" name="Alert">
      <div className={clsx('fixed w-full mt-[72px] p-2 text-white text', getBtnColor(i))}>
        <div className="flex justify-between">
          <p>{alertText}</p>
        </div>
      </div>
    </Base>
  );
};
