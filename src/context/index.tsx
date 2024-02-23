import { createContext, useContext as uc, useState } from 'react';

const Context: Context = createContext(undefined);

export const ContextProvider = ({ children }: JSX.Element): JSX.Element => {
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  function showAlert(): void {
    setIsAlertVisible(true);
    setTimeout(() => {
      setIsAlertVisible(false);
    }, 3000);
  }

  return <Context.Provider value={{ isAlertVisible, showAlert }}>{children}</Context.Provider>;
};

export const useContext = (): Context => {
  const context: Context = uc(Context);
  if (!context) throw new Error('useContext must be used within ContextProvider');
  return context;
};
