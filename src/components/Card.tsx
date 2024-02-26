import { History, MurojaahType } from '@/api/module/murojaah/entity';
import { formatDatetime } from '@/util/datetime';

export const Card = (item: History): JSX.Element => {
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
        <p className={cardClassnames.date}>{formatDatetime(item.occuredAt)}</p>
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
