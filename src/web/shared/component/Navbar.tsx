import Link from 'next/link';
import Links from '@/web/shared/util/const';

const Navbar = (): JSX.Element => {
  const classNames: Record<string, string> = {
    container: 'flex mt-auto sticky bottom-0 border-t border-t-white',
    div: 'w-full p-3 bg-custom-teal text-xl text-white text-center',
  };

  return (
    <nav className={classNames.container}>
      <Link href={Links.Home} className={classNames.div}>
        H
      </Link>
      <Link href={Links.Activity} className={classNames.div}>
        A
      </Link>
      <Link href={Links.Counter} className={classNames.div}>
        C
      </Link>
      <Link href={Links.Stat} className={classNames.div}>
        S
      </Link>
    </nav>
  );
};

export default Navbar;
