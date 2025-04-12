import { clsx } from 'clsx';
import { useMemo } from 'react';

import { Base } from '../component/Base';
import { AlertColor } from '../entity';
import { useAlertStore } from '../store';

interface InternalProps {
  alertColor: number;
}

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

  const btnColor: string = useMemo(() => {
    const i: InternalProps = {
      alertColor,
    };
    return getBtnColor(i);
  }, [alertColor]);

  // Always render the container but control visibility with opacity and pointer-events
  return (
    <Base module="shared" name="Alert">
      <div 
        className={clsx(
          'fixed w-full top-[72px] p-2 text-white text z-50 transition-opacity duration-300',
          btnColor,
          isAlertVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="flex justify-between">
          <p>{alertText}</p>
        </div>
      </div>
    </Base>
  );
};
