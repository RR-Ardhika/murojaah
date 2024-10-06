import { useState } from 'react';
import { History, HistoryType } from '@/api/module/history/entity';
import { HistoryStat } from '@/api/module/stat/entity';
import { GetSurahById, SurahType } from '@/api/shared/entity';
import { Destroy } from '@/api/module/history/service';
import { GetHistoryStat } from '@/api/module/stat/service';
import { Show } from '@/api/module/approach/service';
import { useData } from '@/web/module/history/context/DataContext';
import { useAlert } from '@/web/shared/context/AlertContext';
import { AlertColor, AlertText } from '@/web/shared/component/Alert';
import { formatDatetime } from '@/web/shared/util/datetime';
import { clsx } from 'clsx';

const Card = (item: History): JSX.Element => {
  // @ts-expect-error useAlert
  const { showAlert } = useAlert();
  const { fetchData } = useData();
  const historyStat: HistoryStat = GetHistoryStat(item);

  const cardClassnames: Record<string, string> = {
    container: 'p-4 mb-5 bg-custom-teal text-white rounded-lg',
    title: 'text-xl font-black',
    data: 'font-normal',
    date: 'font-extralight',
  };

  function getRepeatString(): string {
    if (item.repeat <= 1) return '';
    return `${item.repeat}x`;
  }

  function convertSurahIdToName(id: number | undefined): string {
    if (!id) return '';
    const surah: SurahType | undefined = GetSurahById(id);
    if (!surah) return '';
    return surah.name;
  }

  const JuzCard = (): JSX.Element => {
    return (
      <>
        <p className={cardClassnames.title}>Juz {item.juz}</p>
        <p className={cardClassnames.data}>Murojaah {Show(item.approachId)}</p>
        <p className={cardClassnames.data}>
          <span>{historyStat.juz} juz, </span>
          <span>{historyStat.ayah} ayah, </span>
          <span>{historyStat.lines} lines</span>
        </p>
        <p className={cardClassnames.date}>{formatDatetime(item.occuredAt)}</p>
      </>
    );
  };

  const SurahCard = (): JSX.Element => {
    return (
      <>
        <p className={cardClassnames.title}>
          {getRepeatString()} Surah {convertSurahIdToName(item.surah)}
        </p>
        <p className={cardClassnames.data}>Murojaah {Show(item.approachId)}</p>
        {item.markJuzDone && <p className={cardClassnames.data}>Juz was marked as done</p>}
        <p className={cardClassnames.data}>
          <span>{historyStat.juz} juz, </span>
          <span>{historyStat.ayah} ayah, </span>
          <span>{historyStat.lines} lines</span>
        </p>
        <p className={cardClassnames.date}>{formatDatetime(item.occuredAt)}</p>
      </>
    );
  };

  const AyahCard = (): JSX.Element => {
    return (
      <>
        <p className={cardClassnames.title}>
          {getRepeatString()} Ayah {item.startAyah} to {item.endAyah}
        </p>
        <p className={cardClassnames.data}>Surah {convertSurahIdToName(item.surah)}</p>
        <p className={cardClassnames.data}>Murojaah {Show(item.approachId)}</p>
        {item.markSurahDone && <p className={cardClassnames.data}>Surah was marked as done</p>}
        {item.markJuzDone && <p className={cardClassnames.data}>Juz was marked as done</p>}
        <p className={cardClassnames.data}>
          <span>{historyStat.juz} juz, </span>
          <span>{historyStat.ayah} ayah, </span>
          <span>{historyStat.lines} lines</span>
        </p>
        <p className={cardClassnames.date}>{formatDatetime(item.occuredAt)}</p>
      </>
    );
  };

  // TD-2 Move out component
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
      } catch {
        showAlert(AlertColor.Red, AlertText.FailedDeletedHistory);
      }
    }

    return (
      <div className={cardClassnames.container}>
        <div onClick={toggleButtons}>{children}</div>
        {isButtonsVisible && (
          <div className="flex flex-col gap-2 w-full mt-2">
            {/* <button className={clsx(btnClass.base, btnClass.edit)}>Edit</button> */}
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

  switch (
    item.historyType // TD-1 Utilize useMemo
  ) {
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

export default Card;
