const navClass: Record<string, string> = {
  container: 'flex mt-auto sticky bottom-0 border-t border-t-white',
  div: 'w-full p-3 bg-custom-teal text-xl text-white text-center',
};

export const Navbar = (): JSX.Element => {
  return (
    <nav className={navClass.container}>
      <div className={navClass.div}>H</div>
      <div className={navClass.div}>A</div>
      <div className={navClass.div}>C</div>
    </nav>
  );
};
