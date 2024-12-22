import { clsx } from 'clsx';
import { Dispatch, SetStateAction, useState } from 'react';

import { AlertColor, AlertText } from '@/shared/component/Alert';
import { Base } from '@/shared/component/Base';
import { useAlertStore } from '@/shared/store';

import { Activity } from '../../entity';
import { destroy } from '../../service';
import { useDataStore } from '../../store';

interface InternalProps {
  item: Activity;
  fetchData: () => Promise<void>;
  showAlert: (color: number, text: string) => void;
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

// const showForm = (item: Activity): void => {
//   console.log(item);
// };

const showDeleteConfirmation = (i: InternalProps): void => {
  i.setIsDeleteConfirmationVisible(true);
  setTimeout(() => {
    i.setIsDeleteConfirmationVisible(false);
  }, 2000);
};

const deleteRecord = async (i: InternalProps, item: Activity): Promise<void> => {
  try {
    await destroy(item);
    i.fetchData();
    i.showAlert(AlertColor.Red, AlertText.SuccessDeletedActivity);
  } catch {
    i.showAlert(AlertColor.Red, AlertText.FailedDeletedActivity);
  }
};

export const Container = (item: Activity, children: React.JSX.Element): React.JSX.Element => {
  const [isButtonsVisible, setIsButtonsVisible] = useState(false);
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] = useState(false);

  const { showAlert } = useAlertStore();
  const { fetchData } = useDataStore();
  // const { showForm } = useFormStore()

  const i: InternalProps = {
    item,
    fetchData,
    showAlert,
    isButtonsVisible,
    setIsDeleteConfirmationVisible,
    setIsButtonsVisible,
  };

  return (
    <Base module="Activity" name="Card">
      <div className={CLASS_NAMES.container}>
        <div onClick={() => toggleButtons(i)}>{children}</div>
        {isButtonsVisible && (
          <div className="flex flex-col gap-2 w-full mt-2">
            {/*
              <button className={clsx(CLASS_NAMES.btnBase, CLASS_NAMES.btnEdit)} onClick={showForm}>
              Edit
            </button>
            */}
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
