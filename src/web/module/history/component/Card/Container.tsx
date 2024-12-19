import { clsx } from 'clsx';
import { Dispatch, SetStateAction, useState } from 'react';

import { History } from '@/api/module/history/entity';
import { destroy } from '@/api/module/history/service';
import { useData } from '@/web/module/history/context/DataContext';
import { AlertColor, AlertText } from '@/web/shared/component/Alert';
import { Base } from '@/web/shared/component/Base';
import { useAlert } from '@/web/shared/context/AlertContext';

interface InternalProps {
  // @ts-expect-error useAlert
  fetchData: Context<DataContextValues>;
  // @ts-expect-error useAlert
  showAlert: Context<AlertContextValues>;
  isButtonsVisible: boolean;
  setIsButtonsVisible: Dispatch<SetStateAction<boolean>>;
  setIsDeleteConfirmationVisible: Dispatch<SetStateAction<boolean>>;
}

const CLASS_NAMES: Record<string, string> = {
  container: 'p-4 mb-5 bg-custom-teal text-white rounded-lg',
  btnBase: 'p-2 rounded',
  btnEdit: 'bg-yellow-500 hover:bg-yellow-700',
  btnDelete: 'bg-red-500 hover:bg-red-700',
};

const toggleButtons = (i: InternalProps): void => {
  i.setIsButtonsVisible(!i.isButtonsVisible);
};

const showDeleteConfirmation = (i: InternalProps): void => {
  i.setIsDeleteConfirmationVisible(true);
  setTimeout(() => {
    i.setIsDeleteConfirmationVisible(false);
  }, 2000);
};

const deleteRecord = async (i: InternalProps, item: History): Promise<void> => {
  try {
    await destroy(item);
    i.fetchData();
    i.showAlert(AlertColor.Red, AlertText.SuccessDeletedHistory);
  } catch {
    i.showAlert(AlertColor.Red, AlertText.FailedDeletedHistory);
  }
};

export const Container = (item: History, children: JSX.Element): JSX.Element => {
  const { fetchData } = useData();
  const { showAlert } = useAlert();
  const [isButtonsVisible, setIsButtonsVisible] = useState(false);
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] = useState(false);

  const i: InternalProps = {
    fetchData,
    showAlert,
    isButtonsVisible,
    setIsDeleteConfirmationVisible,
    setIsButtonsVisible,
  };

  return (
    <Base module="history" name="Card">
      <div className={CLASS_NAMES.container}>
        <div onClick={() => toggleButtons(i)}>{children}</div>
        {isButtonsVisible && (
          <div className="flex flex-col gap-2 w-full mt-2">
            {!isDeleteConfirmationVisible ? (
              <button
                className={clsx(CLASS_NAMES.btnBase, CLASS_NAMES.btnDelete)}
                onClick={() => showDeleteConfirmation(i)}
              >
                Delete
              </button>
            ) : (
              <button
                className={clsx(CLASS_NAMES.btnBase, CLASS_NAMES.btnDelete)}
                onClick={() => deleteRecord(i, item)}
              >
                Confirm?
              </button>
            )}
          </div>
        )}
      </div>
    </Base>
  );
};
