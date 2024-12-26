import { clsx } from 'clsx';
import { Dispatch, SetStateAction, useState } from 'react';

import { Base } from '@/shared/component/Base';
import { AlertColor, AlertText } from '@/shared/entity';
import { useAlertStore } from '@/shared/store';

import { Activity } from '../../entity';
import { destroy } from '../../service';
import { useCardStore, useDataStore, useFormStore } from '../../store';

interface InternalProps {
  item: Activity;
  fetchData: () => Promise<void>;
  expandedCardId: string | null;
  setExpandedCardId: (id: string | null) => void;
  hideAlert: () => void;
  showAlert: (color: number, text: string) => void;
  setActivity: (value: Activity) => void;
  setFormType: (value: number) => void;
  setIsFormVisible: (value: boolean) => void;
  setIsDeleteConfirmationVisible: Dispatch<SetStateAction<boolean>>;
}

const CLASS_NAMES: Record<string, string> = {
  container: 'p-4 mb-5 bg-custom-teal text-white rounded-lg',
  btnBase: 'p-2 rounded',
  btnEdit: 'bg-yellow-500 hover:bg-yellow-700',
  btnDelete: 'bg-red-500 hover:bg-red-700',
};

const toggleButtons = (i: InternalProps): void => {
  i.setExpandedCardId(i.expandedCardId === i.item.id ? null : i.item.id);
};

const showForm = (i: InternalProps): void => {
  i.hideAlert();
  i.setFormType(i.item.activityType);
  i.setActivity(i.item);
  i.setIsFormVisible(true);
  i.setExpandedCardId(null);
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
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] = useState(false);

  const { hideAlert, showAlert } = useAlertStore();
  const { expandedCardId, setExpandedCardId } = useCardStore();
  const { fetchData } = useDataStore();
  const { setActivity, setFormType, setIsFormVisible } = useFormStore();

  const i: InternalProps = {
    item,
    fetchData,
    expandedCardId,
    setExpandedCardId,
    hideAlert,
    showAlert,
    setActivity,
    setFormType,
    setIsFormVisible,
    setIsDeleteConfirmationVisible,
  };

  return (
    <Base module="Activity" name="Card">
      <div className={CLASS_NAMES.container}>
        <div onClick={() => toggleButtons(i)}>{children}</div>
        {expandedCardId === item.id && (
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
