import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextFont } from 'next/dist/compiled/@next/font/dist/types';
import './globals.css';
import { Header } from '@/web/shared/component/Header';
import { Navbar } from '@/web/shared/component/Navbar';

const inter: NextFont = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Murojaah',
  description: 'Murojaah application',
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>): JSX.Element => {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col h-screen select-none`}>
        <Header />
        {children}
        <Navbar />
      </body>
    </html>
  );
};

export default RootLayout;
