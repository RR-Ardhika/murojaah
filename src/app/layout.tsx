'use client';

// import type { Metadata } from 'next'; // TD-13 Handle metadata with use client
import { NextFont } from 'next/dist/compiled/@next/font/dist/types';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';

import './globals.css';
import { Alert } from '@/shared/component/Alert';
import { Header } from '@/shared/component/Header';
import { Navbar } from '@/shared/component/Navbar';

const inter: NextFont = Inter({ subsets: ['latin'] });

// TD-13 Handle metadata with use client
// export const metadata: Metadata = {
//   title: 'Murojaah',
//   description: 'Murojaah application',
// };

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>): React.JSX.Element => {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col h-screen select-none`}>
        <Suspense>
          <Alert />
          <Header />
          {children}
          <Navbar />
        </Suspense>
      </body>
    </html>
  );
};

export default RootLayout;
