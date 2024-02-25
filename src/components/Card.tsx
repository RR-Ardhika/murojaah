import { useState } from 'react';
import { History, MurojaahType } from '@/api/module/murojaah/entity';
import { formatDatetime } from '@/util/datetime';
import { clsx } from 'clsx';

export const Card = (item: History): JSX.Element => {
  if (!Object.values(MurojaahType).includes(item.murojaahType)) return <></>;

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
        <p className={cardClassnames.data}>Murojaah by using {item.murojaahMethod}</p>
        <p className={cardClassnames.data}>Total Murojaah is {item.totalMurojaah}</p>
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
        <p className={cardClassnames.data}>Murojaah by using {item.murojaahMethod}</p>
        <p className={cardClassnames.data}>Total Murojaah is {item.totalMurojaah}</p>
        <p className={cardClassnames.date}>{item.occuredAt}</p>
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
        <p className={cardClassnames.data}>Murojaah by using {item.murojaahMethod}</p>
        <p className={cardClassnames.data}>Total Murojaah is {item.totalMurojaah}</p>
        <p className={cardClassnames.date}>{item.occuredAt}</p>
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

    function toggleButtons(): void {
      isButtonsVisible ? setIsButtonsVisible(false) : setIsButtonsVisible(true);
    }

    return (
      <div className={cardClassnames.container}>
        <div onClick={toggleButtons}>{children}</div>
        {isButtonsVisible && (
          <div className="flex flex-col gap-2 w-full mt-2">
            <button className={clsx(btnClass.base, btnClass.edit)}>Edit</button>
            <button className={clsx(btnClass.base, btnClass.delete)}>Delete</button>
          </div>
        )}
      </div>
    );
  };

  switch (item.murojaahType) {
    case MurojaahType.Juz:
      return BaseCard(JuzCard());
    case MurojaahType.Surah:
      return BaseCard(SurahCard());
    case MurojaahType.Ayah:
      return BaseCard(AyahCard());
  }
};
