import { createContext, useContext, useState } from 'react';
import { AlertColor, AlertText } from '@/components/Alert';

const AlertContext: Context = createContext();

export const AlertProvider = ({ children }: JSX.Element): JSX.Element => {
  const [alertColor, setAlertColor] = useState();
  const [alertText, setAlertText] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  function showAlert(color: AlertColor, text: AlertText): void {
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

export const useAlert = (): Context<AlertContextValues> => {
  const context: Context<AlertContextValues> = useContext(AlertContext);
  if (!context) throw new Error('useAlert must be used within AlertProvider');
  return context;
};
