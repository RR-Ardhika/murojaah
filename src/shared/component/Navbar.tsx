'use client';

import { Base } from '@/shared/component/Base';

import { NavItem } from './NavItem';

const CLASS_NAMES: Record<string, string> = {
  container: 'flex mt-auto sticky bottom-0 border-t border-t-white',
};

export const Navbar = (): React.JSX.Element => {
  return (
    <Base module="shared" name="Navbar">
      <nav className={CLASS_NAMES.container}>
        <NavItem itemKey="home" />
        <NavItem itemKey="compact-date" />
        <NavItem itemKey="list-surah" />
        <NavItem itemKey="stats" />
      </nav>
    </Base>
  );
};
