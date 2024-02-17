'use client';

import { useState } from 'react';
import { MurojaahType } from '@/api/murojaah';
import { Alert } from '@/components/Alert';
import { Card, Props } from '@/components/Card';
import { CreateButton } from '@/components/CreateButton';
import { AlertContext } from '@/context/AlertContext';
import { clsx } from 'clsx';

const Home = (): JSX.Element => {
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

  const [showAlert, setShowAlert] = useState(true);

  return (
    <AlertContext.Provider value={{ showAlert, setShowAlert }}>
      <Alert />

      <div
        className={clsx(
          'flex flex-col pt-4 px-4',
          showAlert && 'mt-[112px]',
          !showAlert && 'mt-[72px]'
        )}
      >
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
        <CreateButton />
      </div>
    </AlertContext.Provider>
  );
};

export default Home;
