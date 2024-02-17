import { createContext } from 'react';

type AlertContextValues = {
  showAlert: boolean;
  setShowAlert: Dispatch<SetStateAction<boolean>>;
};

export const AlertContext: Context<AlertContextValues> = createContext<AlertContextValues>({
  showAlert: false,
  setShowAlert: () => {},
});
