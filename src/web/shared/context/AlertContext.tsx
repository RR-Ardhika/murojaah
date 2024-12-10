import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

import { AlertColor, AlertText } from '@/web/shared/component/Alert';
import { Base } from '@/web/shared/component/Base';

interface InternalProps {
  setAlertColor: Dispatch<SetStateAction<number>>;
  setAlertText: Dispatch<SetStateAction<string>>;
  setIsAlertVisible: Dispatch<SetStateAction<boolean>>;
}

// @ts-expect-error AlertContextValues
const AlertContext: Context<AlertContextValues> = createContext<AlertContextValues>(undefined);

// @ts-expect-error AlertContextValues
export const useAlert = (): Context<AlertContextValues> => {
  // @ts-expect-error AlertContextValues
  const context: Context<AlertContextValues> = useContext(AlertContext);
  if (!context) throw new Error('useAlert must be used within AlertProvider');
  return context;
};

const showAlert = (i: InternalProps, color: AlertColor, text: AlertText): void => {
  i.setAlertColor(color);
  i.setAlertText(text);
  i.setIsAlertVisible(true);
  setTimeout(() => {
    i.setIsAlertVisible(false);
  }, 3000);
};

const hideAlert = (i: InternalProps): void => {
  i.setIsAlertVisible(false);
};

export const AlertProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [alertColor, setAlertColor] = useState();
  const [alertText, setAlertText] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const i: InternalProps = {
    // @ts-expect-error expected value
    setAlertColor,
    setAlertText,
    setIsAlertVisible,
  };

  return (
    <Base module="shared" name="AlertProvider">
      <AlertContext.Provider
        value={{
          alertColor,
          alertText,
          isAlertVisible,
          showAlert: (color: AlertColor, text: AlertText) => showAlert(i, color, text),
          hideAlert: () => hideAlert(i),
        }}
      >
        {children}
      </AlertContext.Provider>
    </Base>
  );
};
