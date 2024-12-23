import { clsx } from 'clsx';
import { Dispatch, SetStateAction, useState } from 'react';

import { Base } from '@/shared/component/Base';
import { AlertColor, AlertText } from '@/shared/entity';
import { useAlertStore } from '@/shared/store';

import { Activity } from '../../entity';
import { destroy, getActivityTypeString } from '../../service';
import { useDataStore, useFormStore } from '../../store';

interface InternalProps {
  item: Activity;
  fetchData: () => Promise<void>;
  hideAlert: () => void;
  showAlert: (color: number, text: string) => void;
  setActivity: (value: Activity) => void;
  setFormType: (value: string) => void;
  setIsFormVisible: (value: boolean) => void;
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

const showForm = (i: InternalProps): void => {
  i.hideAlert();
  i.setFormType(getActivityTypeString(i.item.activityType));
  i.setActivity(i.item);
  i.setIsFormVisible(true);
  i.setIsButtonsVisible(false);
};

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

  const { hideAlert, showAlert } = useAlertStore();
  const { fetchData } = useDataStore();
  const { setActivity, setFormType, setIsFormVisible } = useFormStore();

  const i: InternalProps = {
    item,
    fetchData,
    hideAlert,
    showAlert,
    setActivity,
    setFormType,
    setIsFormVisible,
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
            <button
              className={clsx(CLASS_NAMES.btnBase, CLASS_NAMES.btnEdit)}
              onClick={() => showForm(i)}
            >
              Edit
            </button>
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
