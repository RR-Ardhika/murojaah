import { MurojaahType } from '@/api/module/murojaah/entity/murojaah';
import { useAlert } from '@/context/AlertContext';
import { Card, Props } from '@/components/Card';
import { clsx } from 'clsx';

export const HistoricalView = (): JSX.Element => {
  // TODO Remove this mockup data
  const data: Props[] = [
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

  const { isAlertVisible } = useAlert();

  return (
    <div className={clsx('flex flex-col pt-4 px-4', isAlertVisible ? 'mt-[112px]' : 'mt-[72px]')}>
      {/* TODO Remove this mockup data */}
      <Card {...data[0]} />
      <Card {...data[1]} />
      <Card {...data[2]} />
      <Card {...data[1]} />
      <Card {...data[2]} />
      <Card {...data[0]} />
      <Card {...data[1]} />
      <Card {...data[0]} />
      <Card {...data[2]} />
    </div>
  );
};
