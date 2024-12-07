import Link from 'next/link';

import { LINKS } from '@/web/shared/util/const';

const CLASS_NAMES: Record<string, string> = {
  container: 'flex mt-auto sticky bottom-0 border-t border-t-white',
  div: 'w-full p-3 bg-custom-teal text-xl text-white text-center',
};

export const Navbar = (): JSX.Element => {
  return (
    <nav className={CLASS_NAMES.container}>
      <Link href={LINKS.HOME} className={CLASS_NAMES.div}>
        H
      </Link>
      <Link href={LINKS.ACTIVITY} className={CLASS_NAMES.div}>
        A
      </Link>
      <Link href={LINKS.COUNTER} className={CLASS_NAMES.div}>
        C
      </Link>
      <Link href={LINKS.STAT} className={CLASS_NAMES.div}>
        S
      </Link>
    </nav>
  );
};
