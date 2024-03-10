import { useState } from 'react';
import { History, HistoryType } from '@/api/module/history/entity';
import { Destroy } from '@/api/module/history/service';
import { Show } from '@/api/module/approach/service';
import { useData } from '@/context/DataContext';
import { useAlert } from '@/context/AlertContext';
import { AlertColor, AlertText } from '@/components/Alert';
import { formatDatetime } from '@/util/datetime';
import { clsx } from 'clsx';

export const Card = (item: History): JSX.Element => {
  // @ts-expect-error useAlert
  const { showAlert } = useAlert();
  const { fetchData } = useData();

  const cardClassnames: Record<string, string> = {
    container: 'p-4 mb-5 bg-custom-teal text-white rounded-lg',
    title: 'text-xl font-black',
    data: 'font-normal',
    date: 'font-extralight',
  };

  const JuzCard = (): JSX.Element => {
    return (
      <>
        <p className={cardClassnames.title}>Juz {item.juz}</p>
        <p className={cardClassnames.data}>Murojaah {Show(item.approachId)}</p>
        <p className={cardClassnames.data}>Total Murojaah is {item.totalHistory}</p>
        <p className={cardClassnames.date}>{formatDatetime(item.occuredAt)}</p>
      </>
    );
  };

  const SurahCard = (): JSX.Element => {
    return (
      <>
        <p className={cardClassnames.title}>
          Surah {item.surah} {item.surahName}
        </p>
        <p className={cardClassnames.data}>Murojaah {Show(item.approachId)}</p>
        <p className={cardClassnames.data}>Total Murojaah is {item.totalHistory}</p>
        <p className={cardClassnames.date}>{formatDatetime(item.occuredAt)}</p>
      </>
    );
  };

  const AyahCard = (): JSX.Element => {
    return (
      <>
        <p className={cardClassnames.title}>
          Ayah {item.start} to {item.end}
        </p>
        <p className={cardClassnames.data}>
          Surah {item.surah} {item.surahName}
        </p>
        <p className={cardClassnames.data}>Murojaah {Show(item.approachId)}</p>
        <p className={cardClassnames.data}>Total Murojaah is {item.totalHistory}</p>
        <p className={cardClassnames.date}>{formatDatetime(item.occuredAt)}</p>
      </>
    );
  };

  const BaseCard = (children: JSX.Element): JSX.Element => {
    const btnClass: Record<string, string> = {
      base: 'p-2 rounded',
      edit: 'bg-yellow-500 hover:bg-yellow-700',
      delete: 'bg-red-500 hover:bg-red-700',
    };

    const [isButtonsVisible, setIsButtonsVisible] = useState(false);
    const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] = useState(false);

    function toggleButtons(): void {
      setIsButtonsVisible(!isButtonsVisible);
    }

    function showDeleteConfirmation(): void {
      setIsDeleteConfirmationVisible(true);
      setTimeout(() => {
        setIsDeleteConfirmationVisible(false);
      }, 2000);
    }

    async function deleteRecord(item: History): Promise<void> {
      try {
        await Destroy(item);
        fetchData();
        showAlert(AlertColor.Red, AlertText.SuccessDeletedHistory);
      } catch (error) {
        showAlert(AlertColor.Red, AlertText.FailedDeletedHistory);
      }
    }

    return (
      <div className={cardClassnames.container}>
        <div onClick={toggleButtons}>{children}</div>
        {isButtonsVisible && (
          <div className="flex flex-col gap-2 w-full mt-2">
            <button className={clsx(btnClass.base, btnClass.edit)}>Edit</button>
            {!isDeleteConfirmationVisible ? (
              <button
                className={clsx(btnClass.base, btnClass.delete)}
                onClick={showDeleteConfirmation}
              >
                Delete
              </button>
            ) : (
              <button
                className={clsx(btnClass.base, btnClass.delete)}
                onClick={() => deleteRecord(item)}
              >
                Confirm?
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  switch (item.historyType) {
    case HistoryType.Juz:
      return BaseCard(JuzCard());
    case HistoryType.Surah:
      return BaseCard(SurahCard());
    case HistoryType.Ayah:
      return BaseCard(AyahCard());
    default:
      return <></>;
  }
};
