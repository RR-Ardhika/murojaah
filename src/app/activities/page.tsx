'use client';

import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';

import {
  Page as DefaultPage,
  CompactDatePage,
  ListSurahPage,
} from '@/module/activity/component/Page';

const Page = (): React.JSX.Element => {
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
