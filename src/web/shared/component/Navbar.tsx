import Link from 'next/link';

import { LINKS } from '@/web/shared/util/const';

export const Navbar = (): JSX.Element => {
  const classNames: Record<string, string> = {
    container: 'flex mt-auto sticky bottom-0 border-t border-t-white',
    div: 'w-full p-3 bg-custom-teal text-xl text-white text-center',
  };

  return (
    <nav className={classNames.container}>
      <Link href={LINKS.HOME} className={classNames.div}>
        H
      </Link>
      <Link href={LINKS.ACTIVITY} className={classNames.div}>
        A
      </Link>
      <Link href={LINKS.COUNTER} className={classNames.div}>
        C
      </Link>
      <Link href={LINKS.STAT} className={classNames.div}>
        S
      </Link>
    </nav>
  );
};
