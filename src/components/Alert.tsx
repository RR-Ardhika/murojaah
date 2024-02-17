'use client';

import { useContext } from 'react';
import { AlertContext } from '@/context/AlertContext';

export const Alert = (): JSX.Element => {
  const showAlert: Context<boolean> = useContext(AlertContext);

  return (
    <>
      {showAlert && (
        <div className="fixed w-full mt-[72px] p-2 bg-green-500 text-white text">
          Successfully created new murojaah
        </div>
      )}
    </>
  );
};
