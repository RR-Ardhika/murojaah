import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Navbar } from '@/components/Navbar';

const inter: NextFont = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Murojaah',
  description: 'Murojaah application',
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>): JSX.Element => {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col h-screen`}>
        <Header />
        {children}
        <Navbar />
      </body>
    </html>
  );
};

export default RootLayout;
