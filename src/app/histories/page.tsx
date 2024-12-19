'use client';

import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';

import {
  Page as DefaultPage,
  CompactDatePage,
  ListSurahPage,
} from '@/module/history/component/Page';

const Page = (): JSX.Element => {
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const view: string | null = searchParams.get('view');

  switch (view) {
    case 'compact-date':
      return <CompactDatePage />;
    case 'list-surah':
      return <ListSurahPage />;
    default:
      return <DefaultPage />;
  }
};

export default Page;
