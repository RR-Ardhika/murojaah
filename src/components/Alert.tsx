'use client';

import { useContext } from 'react';
import { AlertContext } from '@/context/AlertContext';

export const Alert = (): JSX.Element => {
  const { showAlert } = useContext(AlertContext);

  return (
    <>
      {showAlert && (
        <div className="fixed w-full mt-[72px] p-2 bg-green-500 text-white text">
          <div className="flex justify-between">
            <p>Successfully created new murojaah</p>
          </div>
        </div>
      )}
    </>
  );
};
