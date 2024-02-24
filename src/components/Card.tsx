import { History, MurojaahType } from '@/api/module/murojaah/entity/murojaah';
import { DateTime } from 'luxon';

export const Card = (item: History): JSX.Element => {
  function getOccuredAt(jsdate) {
    const parsedTime = DateTime.fromJSDate(jsdate);
    if (!parsedTime.isValid) return undefined;
    const front = parsedTime.toFormat('EEE, MMM dd ');
    const back = parsedTime.toFormat('yy hh:mm a');
    return front + "'" + back;
  }

  const cardClassnames: Record<string, string> = {
    container: 'p-4 mb-5 bg-custom-teal text-white rounded-lg',
    title: 'text-xl font-black',
    data: 'font-normal',
    date: 'font-extralight',
  };

  const JuzCard = (): JSX.Element => {
    return (
      <div className={cardClassnames.container}>
        <p className={cardClassnames.title}>Juz {item.juz}</p>
        <p className={cardClassnames.data}>Murojaah by using {item.murojaahMethod}</p>
        <p className={cardClassnames.data}>Total Murojaah is {item.totalMurojaah}</p>
        <p className={cardClassnames.date}>{getOccuredAt(item.occuredAt)}</p>
      </div>
    );
  };

  const SurahCard = (): JSX.Element => {
    return (
      <div className={cardClassnames.container}>
        <p className={cardClassnames.title}>
          Surah {item.surah} {item.surahName}
        </p>
        <p className={cardClassnames.data}>Murojaah by using {item.murojaahMethod}</p>
        <p className={cardClassnames.data}>Total Murojaah is {item.totalMurojaah}</p>
        <p className={cardClassnames.date}>{item.occuredAt}</p>
      </div>
    );
  };

  const AyahCard = (): JSX.Element => {
    return (
      <div className={cardClassnames.container}>
        <p className={cardClassnames.title}>
          Ayah {item.start} to {item.end}
        </p>
        <p className={cardClassnames.data}>
          Surah {item.surah} {item.surahName}
        </p>
        <p className={cardClassnames.data}>Murojaah by using {item.murojaahMethod}</p>
        <p className={cardClassnames.data}>Total Murojaah is {item.totalMurojaah}</p>
        <p className={cardClassnames.date}>{item.occuredAt}</p>
      </div>
    );
  };

  switch (item.murojaahType) {
    case MurojaahType.Juz:
      return JuzCard();
    case MurojaahType.Surah:
      return SurahCard();
    case MurojaahType.Ayah:
      return AyahCard();
    default:
      return <></>;
  }
};
