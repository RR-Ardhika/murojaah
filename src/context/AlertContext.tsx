import { createContext, useContext, useState } from 'react';

const AlertContext: Context = createContext();

export const AlertProvider = ({ children }: JSX.Element): JSX.Element => {
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  function showAlert(): void {
    setIsAlertVisible(true);
    setTimeout(() => {
      setIsAlertVisible(false);
    }, 3000);
  }

  return (
    <AlertContext.Provider value={{ isAlertVisible, showAlert }}>{children}</AlertContext.Provider>
  );
};

export const useAlert = (): Context<AlertContextValues> => {
  const context: Context<AlertContextValues> = useContext(AlertContext);
  if (!context) throw new Error('useAlert must be used within AlertProvider');
  return context;
};
