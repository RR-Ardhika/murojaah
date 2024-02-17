import { createContext } from 'react';

type AlertContextValues = {
  isAlertVisible: boolean;
  setIsAlertVisible: Dispatch<SetStateAction<boolean>>;
};

export const AlertContext: Context<AlertContextValues> = createContext<AlertContextValues>({
  isAlertVisible: false,
  setIsAlertVisible: () => {},
});
