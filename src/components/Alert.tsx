import { useAlert } from '@/context/AlertContext';
import { clsx } from 'clsx';

export enum AlertColor {
  Red = 0,
  Green = 1,
}

export enum AlertText {
  SuccessCreatedMurojaah = 'Successfully created new murojaah',
  SuccessDeletedMurojaah = 'Murojaah deleted',
  FailedCreatedMurojaah = 'Failed created new murojaah',
  FailedDeletedMurojaah = 'Failed deleted murojaah',
}

export const Alert = (): JSX.Element => {
  // @ts-expect-error useAlert
  const { alertColor, alertText, isAlertVisible } = useAlert();

  if (!isAlertVisible) return <></>;

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
