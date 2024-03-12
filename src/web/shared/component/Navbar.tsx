import Link from 'next/link';

export const Navbar = (): JSX.Element => {
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
      <Link href="#" className={navClass.div}>
        C
      </Link>
      <Link href="/stat" className={navClass.div}>
        S
      </Link>
    </nav>
  );
};
