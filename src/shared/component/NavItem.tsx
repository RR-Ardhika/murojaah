'use client';

import { ChartBarIcon, HomeIcon, ListBulletIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ReadonlyURLSearchParams } from 'next/navigation';

import { Base } from '@/shared/component/Base';

type NavItemKey = 'home' | 'compact-date' | 'list-surah' | 'stats';

interface NavItemConfig {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

const NAV_ITEMS: Record<NavItemKey, NavItemConfig> = {
  home: {
    href: '/',
    icon: HomeIcon,
    label: 'Home',
  },
  'compact-date': {
    href: '/activities?view=compact-date',
    icon: CalendarIcon,
    label: 'Compact Date',
  },
  'list-surah': {
    href: '/activities?view=list-surah',
    icon: ListBulletIcon,
    label: 'List Surah',
  },
  stats: {
    href: '/stats',
    icon: ChartBarIcon,
    label: 'Stats',
  },
};

interface Props {
  itemKey: NavItemKey;
}

const checkIsActive = (
  itemKey: NavItemKey,
  pathname: string,
  searchParams: ReadonlyURLSearchParams,
  config: NavItemConfig
): boolean => {
  if (itemKey === 'home') {
    return pathname === '/' && !searchParams.get('view');
  }

  const [path, query]: string[] = config.href.split('?');
  if (query) {
    const expectedView: string = query.replace('view=', '');
    return pathname === path && searchParams.get('view') === expectedView;
  }

  return pathname === path;
};

export const NavItem = ({ itemKey }: Props): React.JSX.Element => {
  const pathname: string = usePathname();
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const config: NavItemConfig = NAV_ITEMS[itemKey];
  const Icon: React.ComponentType<{ className?: string }> = config.icon;

  const active: boolean = checkIsActive(itemKey, pathname, searchParams, config);

  return (
    <Base module="shared" name="NavItem">
      <Link
        href={config.href}
        className={clsx(
          'w-full p-3 text-xl text-center transition-color',
          active ? 'bg-teal-700 text-white' : 'bg-custom-teal text-white'
        )}
        aria-label={config.label}
        aria-current={active ? 'page' : undefined}
      >
        <Icon className="size-6 mx-auto" />
      </Link>
    </Base>
  );
};
