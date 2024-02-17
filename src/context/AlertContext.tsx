import { createContext } from 'react';

export const AlertContext: Context<object> = createContext({
  showAlert: false,
  setShowAlert: () => {},
});
