import { useAlert } from '@/web/shared/context/AlertContext';
import { clsx } from 'clsx';

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

export const Alert = (): JSX.Element => {
  // @ts-expect-error useAlert
  const { alertColor, alertText, isAlertVisible } = useAlert();

  if (!isAlertVisible) return <></>;

  // TD-1 Utilize useMemo
  function getBtnColor(): string {
    switch (alertColor) {
      case AlertColor.Red:
        return 'bg-red-500';
      case AlertColor.Green:
        return 'bg-green-500';
      default:
        return 'bg-white';
    }
  }

  return (
    <div className={clsx('fixed w-full mt-[72px] p-2 text-white text', getBtnColor())}>
      <div className="flex justify-between">
        <p>{alertText}</p>
      </div>
    </div>
  );
};
