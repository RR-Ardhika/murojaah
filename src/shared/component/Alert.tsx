import { clsx } from 'clsx';

import { Base } from '../component/Base';
import { AlertColor } from '../entity';
import { useAlertStore } from '../store';

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
