import { ReadonlyURLSearchParams } from 'next/navigation';

export const getViewKey = (pathname: string, searchParams: ReadonlyURLSearchParams): string => {
  const view: string | null = searchParams.get('view');
  if (view) {
    return `${pathname}?view=${view}`;
  }
  return pathname;
};
