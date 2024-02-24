import { useEffect, useState } from 'react';
import { MurojaahType } from '@/api/module/murojaah/entity/murojaah';
import { Index } from '@/api/module/murojaah/service';
import { useContext } from '@/context';
import { Card, Props } from '@/components/Card';
import { clsx } from 'clsx';

export const HistoricalView = (): JSX.Element => {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    Index().then((result) => {
      setData(result);
    });
  });

  // TODO Remove this mockup data
  const mockup: Props[] = [
    {
      murojaahType: MurojaahType.Juz,
      juz: 28,
      murojaahMethod: 'Memory',
      totalMurojaah: 100,
      occuredAt: "Sat, Feb 10 '24",
    },
    {
      murojaahType: MurojaahType.Surah,
      surah: 188,
      surahName: 'Al-Mumtahanah',
      murojaahMethod: 'Memory',
      totalMurojaah: 100,
      occuredAt: "Sat, Feb 10 '24",
    },
    {
      murojaahType: MurojaahType.Ayah,
      start: 200,
      end: 208,
      surah: 1,
      surahName: 'Al-Baqarah',
      murojaahMethod: 'Memory',
      totalMurojaah: 100,
      occuredAt: "Sat, Feb 10 '24",
    },
  ];

  const { isAlertVisible } = useContext();

  return (
    <div className={clsx('flex flex-col pt-4 px-4', isAlertVisible ? 'mt-[112px]' : 'mt-[72px]')}>
      {data ? data.map((item) => <Card key={item.id} {...item} />) : <></>}

      {/* TODO Remove this mockup data */}
      <Card {...mockup[0]} />
      <Card {...mockup[1]} />
      <Card {...mockup[2]} />
    </div>
  );
};
