import Link from 'next/link';

import { Base } from '@/shared/component/Base';
import { LINKS } from '@/shared/const';

const CLASS_NAMES: Record<string, string> = {
  container: 'flex mt-auto sticky bottom-0 border-t border-t-white',
  div: 'w-full p-3 bg-custom-teal text-xl text-white text-center',
};

export const Navbar = (): JSX.Element => {
  return (
    <Base module="shared" name="Navbar">
      <nav className={CLASS_NAMES.container}>
        <Link href={LINKS.HOME} className={CLASS_NAMES.div}>
          H
        </Link>
        <Link href={LINKS.COMPACT_DATE} className={CLASS_NAMES.div}>
          C
        </Link>
        <Link href={LINKS.COUNTER} className={CLASS_NAMES.div}>
          C
        </Link>
        <Link href={LINKS.STAT} className={CLASS_NAMES.div}>
          S
        </Link>
      </nav>
    </Base>
  );
};
