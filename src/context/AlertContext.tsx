import { Context, createContext, useContext, useState, ReactNode } from 'react';
import { AlertColor, AlertText } from '@/components/Alert';

// @ts-expect-error AlertContextValues
const AlertContext: Context<AlertContextValues> = createContext<AlertContextValues>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [alertColor, setAlertColor] = useState();
  const [alertText, setAlertText] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  function showAlert(color: AlertColor, text: AlertText): void {
    // @ts-expect-error AlertColor
    setAlertColor(color);
    setAlertText(text);
    setIsAlertVisible(true);
    setTimeout(() => {
      setIsAlertVisible(false);
    }, 3000);
  }

  return (
    <AlertContext.Provider value={{ alertColor, alertText, isAlertVisible, showAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

// @ts-expect-error AlertContextValues
export const useAlert = (): Context<AlertContextValues> => {
  // @ts-expect-error AlertContextValues
  const context: Context<AlertContextValues> = useContext(AlertContext);
  if (!context) throw new Error('useAlert must be used within AlertProvider');
  return context;
};
