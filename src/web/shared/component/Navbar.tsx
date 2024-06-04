import Link from 'next/link';

const Navbar = (): JSX.Element => {
  const navClass: Record<string, string> = {
    container: 'flex mt-auto sticky bottom-0 border-t border-t-white',
    div: 'w-full p-3 bg-custom-teal text-xl text-white text-center',
  };

  return (
    <nav className={navClass.container}>
      <Link href="/" className={navClass.div}>
        H
      </Link>
      <Link href="#" className={navClass.div}>
        A
      </Link>
      <Link href="/counters" className={navClass.div}>
        C
      </Link>
      <Link href="/stats" className={navClass.div}>
        S
      </Link>
    </nav>
  );
};

export default Navbar;
