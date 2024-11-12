import { clsx } from 'clsx';
import { useState } from 'react';

import { show } from '@/api/module/approach/service';
import { History, HistoryType } from '@/api/module/history/entity';
import { destroy } from '@/api/module/history/service';
import { HistoryStat } from '@/api/module/stat/entity';
import { getHistoryStat } from '@/api/module/stat/service';
import { getSurahById, SurahType } from '@/api/shared/entity';
import { useData } from '@/web/module/history/context/DataContext';
import { AlertColor, AlertText } from '@/web/shared/component/Alert';
import { useAlert } from '@/web/shared/context/AlertContext';
import { formatDatetime } from '@/web/shared/util/datetime';

const Card = (item: History): JSX.Element => {
  // @ts-expect-error useAlert
  const { showAlert } = useAlert();
  const { fetchData } = useData();
  const historyStat: HistoryStat = getHistoryStat(item);

  const classNames: Record<string, string> = {
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
    const surah: SurahType | undefined = getSurahById(id);
    if (!surah) return '';
    return surah.name;
  }

  const JuzCard = (): JSX.Element => {
    return (
      <>
        <p className={classNames.title}>Juz {item.juz}</p>
        <p className={classNames.data}>Murojaah {show(item.approachId)}</p>
        <p className={classNames.data}>
          <span>{historyStat.juz} juz, </span>
          <span>{historyStat.ayah} ayah, </span>
          <span>{historyStat.lines} lines</span>
        </p>
        <p className={classNames.date}>{formatDatetime(item.occuredAt)}</p>
      </>
    );
  };

  const SurahCard = (): JSX.Element => {
    return (
      <>
        <p className={classNames.title}>
          {getRepeatString()} Surah {convertSurahIdToName(item.surah)}
        </p>
        <p className={classNames.data}>Murojaah {show(item.approachId)}</p>
        {item.markJuzDone && <p className={classNames.data}>Juz was marked as done</p>}
        <p className={classNames.data}>
          <span>{historyStat.juz} juz, </span>
          <span>{historyStat.ayah} ayah, </span>
          <span>{historyStat.lines} lines</span>
        </p>
        <p className={classNames.date}>{formatDatetime(item.occuredAt)}</p>
      </>
    );
  };

  const AyahCard = (): JSX.Element => {
    return (
      <>
        <p className={classNames.title}>
          {getRepeatString()} Ayah {item.startAyah} to {item.endAyah}
        </p>
        <p className={classNames.data}>Surah {convertSurahIdToName(item.surah)}</p>
        <p className={classNames.data}>Murojaah {show(item.approachId)}</p>
        {item.markSurahDone && <p className={classNames.data}>Surah was marked as done</p>}
        {item.markJuzDone && <p className={classNames.data}>Juz was marked as done</p>}
        <p className={classNames.data}>
          <span>{historyStat.juz} juz, </span>
          <span>{historyStat.ayah} ayah, </span>
          <span>{historyStat.lines} lines</span>
        </p>
        <p className={classNames.date}>{formatDatetime(item.occuredAt)}</p>
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
        await destroy(item);
        fetchData();
        showAlert(AlertColor.Red, AlertText.SuccessDeletedHistory);
      } catch {
        showAlert(AlertColor.Red, AlertText.FailedDeletedHistory);
      }
    }

    return (
      <div className={classNames.container}>
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
