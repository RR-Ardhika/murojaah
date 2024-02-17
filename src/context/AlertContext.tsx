import { createContext, useContext, useState } from 'react';

type AlertContextType = {
  isAlertVisible: boolean;
  setIsAlertVisible: Dispatch<SetStateAction<boolean>>;
};

const AlertContext: Context<AlertContextType> = createContext<AlertContextType>({
  isAlertVisible: false,
  setIsAlertVisible: () => {},
});

export const AlertProvider = ({ children }: JSX.Element): JSX.Element => {
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  return (
    <AlertContext.Provider valaue={{ isAlertVisible, setIsAlertVisible }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = (): Context<AlertContextValues> => {
  const context: Context<AlertContextValues> = useContext(AlertContext);
  if (!context) throw new Error('useAlert must be used within AlertProvider');
  return context;
};
