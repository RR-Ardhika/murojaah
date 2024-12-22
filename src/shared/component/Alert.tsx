import { clsx } from 'clsx';

import { Base } from '../component/Base';
import { useAlertStore } from '../store';

export enum AlertColor {
  Green = 1,
  Red = 2,
}

export enum AlertText {
  SuccessCreatedActivity = 'Successfully created new murojaah',
  SuccessDeletedActivity = 'Murojaah deleted',
  FailedCreatedActivity = 'Failed created new murojaah',
  FailedDeletedActivity = 'Failed deleted murojaah',
  SuccessExportedDB = 'Successfully exported database',
  FailedExportedDB = 'Failed to export database',
  SuccessImportedDB = 'Successfully imported database',
  FailedImportedDB = 'Failed to import database',
  SuccessDeletedDB = 'Successfully deleted database',
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

export const Alert = (): React.JSX.Element => {
  const { isAlertVisible, alertColor, alertText } = useAlertStore();

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
